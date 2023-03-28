import React from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

// Helper function to format a date in a readable way
function formatDate(date) {
  // Options for how to format the date
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  // Create a new date object from the input date string
  const dateObj = new Date(date);
  // Use the built-in toLocaleDateString() function to format the date according to the options
  return dateObj.toLocaleDateString(undefined, options);
}

// Helper function to format a time in a readable way
function formatTime(time) {
  // Split the time string into hour and minute components
  const [hour, minute] = time.split(':');
  // Determine whether the time is AM or PM based on the hour
  const period = hour < 12 ? 'AM' : 'PM';
  // Convert the hour to a 12-hour format, taking into account that 0 (midnight) should be displayed as 12
  const hour12 = hour % 12 || 12;
  // Combine the formatted hour, minute, and period into a string
  return `${hour12}:${minute} ${period}`;
}

// Component to display an event in a modal dialog
function EventModal(props) {
  // Destructure the props object to get the show, onHide, and eventObj variables
  const { show, onHide, eventObj } = props;
  // Destructure the eventObj variable to get the venue, date, time, and price variables
  const {
    venue, date, time, price,
  } = eventObj;

  // Render the modal dialog using Bootstrap's Modal component
  return (
    <Modal show={show} onHide={onHide} className="event-modal textStyle">
      <Modal.Header closeButton>
        <Modal.Title>Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Display the event venue */}
        <div>{venue}</div>
        {/* Format and display the event date */}
        <div>{formatDate(date)}</div>
        {/* Format and display the event time */}
        <div>{formatTime(time)}</div>
        {/* Display the event price */}
        <div>{price}</div>
      </Modal.Body>
    </Modal>
  );
}

// Define the prop types for the EventModal component to ensure that the props are of the expected types
EventModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  eventObj: PropTypes.shape({
    firebaseKey: PropTypes.string.isRequired,
    artistId: PropTypes.string.isRequired,
    date: PropTypes.string,
    venue: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired,
};

export default EventModal;
