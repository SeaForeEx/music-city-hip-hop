/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleEvent } from '../../api/eventData';

export default function ViewEvent() {
  const [eventDetails, setEventDetails] = useState({}); // useState & Effect are react
  const router = useRouter(); // useRouter is next.js

  const { eventFirebaseKey } = router.query;

  useEffect(() => {
    getSingleEvent(eventFirebaseKey).then((eventData) => {
      setEventDetails(eventData);
    });
  }, [eventFirebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <h5>
          {eventDetails.venue}
        </h5>
        <p>{eventDetails.date}</p>
        <p>{eventDetails.time}</p>
        <p>{eventDetails.price}</p>
      </div>
    </div>
  );
}
