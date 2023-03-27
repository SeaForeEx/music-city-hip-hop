/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import Link from 'next/link';
import EventModal from './EventModal';
import { deleteEvent } from '../api/eventData';
import { useAuth } from '../utils/context/authContext';

function EventCard({ eventObj, onUpdate }) {
  const deleteThisEvent = () => {
    if (window.confirm(`Delete ${eventObj.venue}?`)) {
      deleteEvent(eventObj.firebaseKey).then(() => onUpdate());
    }
  };

  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Card className="textStyle transParent" style={{ width: '18rem', margin: '1px' }}>
        {/* // eslint-disable-next-line react/jsx-no-comment-textnodes */}
        <Card.Body>
          {/* // eslint-disable-next-line react/jsx-no-comment-textnodes */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span
              style={{ cursor: 'pointer' }}
              className="hoverText"
              onClick={() => setShowModal(true)}
            >
              {eventObj.venue}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              <Link href={`/events/edit/${eventObj.firebaseKey}`} passHref>
                <span style={{ cursor: 'pointer' }} className="hoverText">{eventObj.artistId === user.uid ? 'edit' : ''}</span>
              </Link>
              {eventObj.artistId === user.uid ? (
                <span className="m-2 hoverText" style={{ cursor: 'pointer', marginLeft: '10px' }} onClick={deleteThisEvent}>
                  delete
                </span>
              ) : ''}
            </div>
          </div>
        </Card.Body>
      </Card>

      <EventModal
        show={showModal}
        onHide={() => setShowModal(false)}
        eventObj={eventObj}
      />

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
