import React from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

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
        <div>{date}</div>
        <div>{time}</div>
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
