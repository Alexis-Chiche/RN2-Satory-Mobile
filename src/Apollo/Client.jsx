import React, { Component } from 'react';
import { Text, AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { ApolloProvider } from '@apollo/react-hooks';
import { persistCache } from 'apollo-cache-persist';
import { ApolloClient, InMemoryCache } from 'apollo-boost';

class Client extends Component {
  constructor(parent) {
    super(parent);
    this.state = {
      client: null,
      loaded: false
    };
  }

  async componentDidMount() {
    const httpLink = new HttpLink({
      uri: 'https://api.greefine.fr/',
      credentials: 'include'
    });

    const wsLink = new WebSocketLink({
      uri: 'wss://api.greefine.fr/',
      options: {
        reconnect: true
      }
    });

    const link = split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
      },
      wsLink,
      httpLink
    );

    const cache = new InMemoryCache();

    try {
      await persistCache({
        cache,
        // eslint-disable-next-line no-undef
        storage: AsyncStorage
      });
    } catch (error) {
      console.error('Error restoring Apollo cache', error);
    }

    const client = new ApolloClient({
      cache,
      link
    });

    this.setState({
      client,
      loaded: true
    });

    const data = {
      id: ''
    };

    cache.writeData(data);
  }

  render() {
    const { client, loaded } = this.state;
    const { children } = this.props;

    if (!loaded) {
      return <Text>Loading...</Text>;
    }
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
  }
}

Client.propTypes = {
  children: PropTypes.element.isRequired
};

export default Client;
