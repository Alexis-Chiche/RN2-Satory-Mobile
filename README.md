# RN2-Satory-Mobile

Mobile application for an paint-ball organisation using React Native, Expo and Apollo

## Getting Started

We use Apollo to link the front with the server and use Graphql as our API.

### Prerequisites

To start the project localy be sure to link the Apollo client in "/src/apollo/Client" with the URL of your server.

Usefull link:
- Apollo: https://www.apollographql.com/docs/react/

### Starting the application

You can use yarn to start the project using the script in [package.json](./package.json)

When first log in, your account is set to guest.
To see and register to some events, you must be at least a USER.
To create events, you must be an ADMIN.

Roles can be set with the back-end.

#### Some Command that can be used

```bash
Usage: yarn COMMAND

           start    Start the project on localhost
           lint     Run the linter (eslint) on every file of the project
```

## Project Architecture

- Inside [Apollo](./src/Apollo) we have all the mutations, query and subscription that can be used to fetch and write some data on the data-base. We also have the Client in which we have all the configuration to link the front with the back.
- Inside [assets](./assets) we have all the media used in the application 
- Inside [Components](./src/Components) we have all the components that could be reused anywhere on the app'. Could be display component or more logic component.
- The [Utils](./src/Utils) is where all the utilies components are store (Routing, splash screen,...)
- All the views for the application are stored in [Views](./src/Views)

### Major Frameworks used

- [Apollo](https://www.apollographql.com/)
- [Expo](https://docs.expo.io/versions/latest/)
- [react-navigation](https://github.com/react-navigation/react-navigation#readme)
- [react-native-datetimepicker](https://github.com/react-native-community/react-native-datetimepicker#readme)
- [eslint](https://eslint.org/)

## Authors

- **Alexis Chiche** - [Anae](https://github.com/Alexis-Chiche)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
