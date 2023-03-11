import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
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
    <>
      <Card style={{ width: '18rem', margin: '1px' }}>
        <Card.Body>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href={`/events/${eventObj.firebaseKey}`} passHref>
              <span style={{ cursor: 'pointer' }} className="hoverText">{eventObj.venue}</span>
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              <Link href={`/events/edit/${eventObj.firebaseKey}`} passHref>
                <span style={{ cursor: 'pointer' }} className="hoverText">{eventObj.artistId === user.uid ? 'edit' : ''}</span>
              </Link>
              {eventObj.artistId === user.uid ? (
                // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
                <span className="m-2 hoverText" style={{ cursor: 'pointer', marginLeft: '10px' }} onClick={deleteThisEvent}>
                  delete
                </span>
              ) : ''}
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
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
