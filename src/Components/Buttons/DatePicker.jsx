import React from 'react';
import { PropTypes } from 'prop-types';
import { Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const styles = StyleSheet.create({
  picker: {
    marginVertical: 15,
    alignSelf: 'flex-start'
  }
});

function DatePicker({ eventDate, setEventDate }) {
  return (
    <>
      <Button
        style={styles.picker}
        icon="clock"
        onPress={() => {
          setEventDate({ ...eventDate, show: true });
        }}
      >
        {`Date prévue : ${eventDate.value.toLocaleDateString('en-US')}`}
      </Button>
      {eventDate.show && (
        <DateTimePicker
          value={eventDate.value}
          display="spinner"
          mode="date"
          onChange={(_, date) => (date ? setEventDate({ value: date, show: false }) : null)}
        />
      )}
    </>
  );
}

DatePicker.propTypes = {
  eventDate: PropTypes.shape({
    value: PropTypes.instanceOf(Date).isRequired,
    show: PropTypes.bool.isRequired
  }).isRequired,
  setEventDate: PropTypes.func.isRequired
};

export default DatePicker;
