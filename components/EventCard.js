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

// Define EventCard component that accepts eventObj and onUpdate props
function EventCard({ eventObj, onUpdate }) {
  // Define deleteThisEvent function that prompts user for confirmation before deleting event from the database and updating the component
  const deleteThisEvent = () => {
    if (window.confirm(`Delete ${eventObj.venue}?`)) {
      deleteEvent(eventObj.firebaseKey).then(() => onUpdate());
    }
  };

  // Call useAuth hook to get the authenticated user
  const { user } = useAuth();

  // Define showModal state variable and setShowModal function to control visibility of EventModal component
  const [showModal, setShowModal] = useState(false);

  // Render the component
  return (
    <>
      {/* Render Card component with custom styles and a body */}
      <Card className="textStyle transParent" style={{ width: '18rem', margin: '1px' }}>
        {/* Render body of Card component */}
        <Card.Body>
          {/* Render a div that contains the venue name and a button to open the EventModal */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Render a span with a cursor that changes on hover and a click event that sets showModal state variable to true */}
            <span
              style={{ cursor: 'pointer' }}
              className="hoverText"
              onClick={() => setShowModal(true)}
            >
              {eventObj.venue}
            </span>
            {/* Render a div that contains a Link to the event edit page and a delete button that appears only if the authenticated user created the event */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
              <Link href={`/events/edit/${eventObj.firebaseKey}`} passHref>
                {/* Render a span with a cursor that changes on hover and text that reads 'edit' if the authenticated user created the event */}
                <span style={{ cursor: 'pointer' }} className="hoverText">{eventObj.artistId === user.uid ? 'edit' : ''}</span>
              </Link>
              {/* Render a span with a cursor that changes on hover and text that reads 'delete' if the authenticated user created the event; the deleteThisEvent function is called on click */}
              {eventObj.artistId === user.uid ? (
                <span className="m-2 hoverText" style={{ cursor: 'pointer', marginLeft: '10px' }} onClick={deleteThisEvent}>
                  delete
                </span>
              ) : ''}
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* Render EventModal component with props to control visibility and pass eventObj prop */}
      <EventModal
        show={showModal}
        onHide={() => setShowModal(false)}
        eventObj={eventObj}
      />

    </>
  );
}

// Define propTypes for EventCard component to ensure eventObj and onUpdate props are passed
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
