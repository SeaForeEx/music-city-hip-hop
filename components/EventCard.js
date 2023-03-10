import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { deleteEvent } from '../api/eventData';
import { useAuth } from '../utils/context/authContext';

function EventCard({ eventObj, onUpdate }) {
  const deleteThisEvent = () => {
    if (window.confirm(`Delete ${eventObj.venue}?`)) {
      deleteEvent(eventObj.firebaseKey).then(() => onUpdate());
    }
  };

  const { user } = useAuth();

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{eventObj.venue}</Card.Title>
        <Link href={`/events/${eventObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/events/edit/${eventObj.firebaseKey}`} passHref>
          {eventObj.artistId === user.uid ? (<Button variant="info">EDIT</Button>) : ''}
        </Link>
        {eventObj.artistId === user.uid ? (
          <Button variant="danger" onClick={deleteThisEvent} className="m-2">
            DELETE
          </Button>
        ) : ''}
      </Card.Body>
    </Card>
  );
}

EventCard.propTypes = {
  eventObj: PropTypes.shape({
    venue: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    price: PropTypes.string,
    firebaseKey: PropTypes.string,
    artistId: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default EventCard;
