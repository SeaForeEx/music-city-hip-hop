// Importing React and Head and UserForm components from their respective modules
import React from 'react';
import Head from 'next/head';
import UserForm from '../../components/forms/UserForm';

// Defining a functional component named AddMember
export default function AddMember() {
  // Rendering the following content
  return (
    <>
      {/* Adding a title to the head of the HTML document */}
      <Head>
        <title>Join MCHH!</title>
      </Head>
      {/* Rendering the UserForm component */}
      <UserForm />
    </>
  );
}

/*
This code defines a functional component named AddMember which renders a Head component with a title and a UserForm component. The Head component sets the title of the HTML document to "Join MCHH!". The UserForm component is a form used to create a new user, and it is imported from the ../../components/forms/UserForm module.
*/
