import React from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString(undefined, options);
}

function formatTime(time) {
  const [hour, minute] = time.split(':');
  const period = hour < 12 ? 'AM' : 'PM';
  const hour12 = hour % 12 || 12;
  return `${hour12}:${minute} ${period}`;
}

function EventModal(props) {
  const { show, onHide, eventObj } = props;
  const {
    venue, date, time, price,
  } = eventObj;

  return (
    <Modal show={show} onHide={onHide} className="event-modal textStyle">
      <Modal.Header closeButton>
        <Modal.Title>Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>{venue}</div>
        <div>{formatDate(date)}</div>
        <div>{formatTime(time)}</div>
        <div>{price}</div>
      </Modal.Body>
    </Modal>
  );
}

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
