import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { Button, withTheme } from 'react-native-paper';
import { useMutation } from 'react-apollo';

import { PARTICIPATE, ABSTAIN } from '../../Apollo/mutation/EventMutation';

function ParticipationButton({ myId, eventId, participants, setErrEvent }) {
  const [iAmParticipating, setIAmParticipating] = useState(
    participants.some(participant => {
      if (participant.id === myId) return true;
      return false;
    })
  );
  const [participate] = useMutation(PARTICIPATE, {
    onCompleted: () => {
      setIAmParticipating(true);
    },
    onError: () => {
      setErrEvent(true);
    }
  });

  const [abstain] = useMutation(ABSTAIN, {
    onCompleted: () => {
      setIAmParticipating(false);
    },
    onError: () => {
      setErrEvent(true);
    }
  });

  function toggleParticipation() {
    if (iAmParticipating)
      abstain({
        variables: { userId: myId, eventId }
      });
    else
      participate({
        variables: { userId: myId, eventId }
      });
  }

  return (
    <>
      <Button onPress={toggleParticipation} icon={iAmParticipating ? 'star' : 'star-outline'}>
        {iAmParticipating ? 'Je ne suis pas interessé' : 'Je participe'}
      </Button>
    </>
  );
}

ParticipationButton.propTypes = {
  eventId: PropTypes.string.isRequired,
  myId: PropTypes.string.isRequired,
  participants: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string
    })
  ).isRequired,
  setErrEvent: PropTypes.func.isRequired
};

export default withTheme(ParticipationButton);
