import React from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

function EventModal(props) {
  const { show, onHide, eventObj } = props;

  return (
    <Modal show={show} onHide={onHide} className="event-modal">
      <Modal.Header closeButton>
        <Modal.Title>Event</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>{eventObj.venue}</div>
        <div>{eventObj.date}</div>
        <div>{eventObj.time}</div>
        <div>{eventObj.price}</div>
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
    date: PropTypes.string.isRequired,
    venue: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired,
};

export default EventModal;
