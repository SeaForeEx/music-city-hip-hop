/* eslint-disable @next/next/no-img-element */ // Disable next.js specific eslint rule for img element
import React, { useEffect, useState } from 'react'; // Importing React, useState and useEffect from react library
import { useRouter } from 'next/router'; // Importing useRouter from next.js router
import { getSingleEvent } from '../../api/eventData'; // Importing getSingleEvent function from api/eventData.js

export default function ViewEvent() {
  const [eventDetails, setEventDetails] = useState({}); // Declare state hook named eventDetails with initial state as an empty object
  const router = useRouter(); // Assign the useRouter hook to a variable named router

  const { eventFirebaseKey } = router.query; // Destructure the eventFirebaseKey from router query

  useEffect(() => { // Declare an effect hook
    getSingleEvent(eventFirebaseKey).then((eventData) => { // Call the getSingleEvent function with eventFirebaseKey and set the data in the state hook using setEventDetails
      setEventDetails(eventData);
    });
  }, [eventFirebaseKey]); // Call the effect only when eventFirebaseKey changes

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <h5>
          {eventDetails.venue} {/* Display the venue of the event */}
        </h5>
        <p>{eventDetails.date}</p> {/* Display the date of the event */}
        <p>{eventDetails.time}</p> {/* Display the time of the event */}
        <p>{eventDetails.price}</p> {/* Display the price of the event */}
      </div>
    </div>
  );
}
