import React from 'react'; // Importing the react library
import Head from 'next/head'; // Importing the Head component from Next.js
import EventForm from '../../components/forms/EventForm'; // Importing the EventForm component from the components/forms folder

export default function AddEvent() { // Exporting a default function component called AddEvent
  return (
    <>
      <Head>
        <title>Add an Event</title> {/* Setting the title of the page to "Add an Event" */}
      </Head>
      <EventForm /> {/* Rendering the EventForm component */}
    </>
  );
}
