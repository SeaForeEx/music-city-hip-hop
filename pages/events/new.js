import React from 'react';
import Head from 'next/head';
import EventForm from '../../components/forms/EventForm';

export default function AddEvent() {
  return (
    <>
      <Head>
        <title>Add an Event</title>
      </Head>
      <EventForm />
    </>
  );
}
