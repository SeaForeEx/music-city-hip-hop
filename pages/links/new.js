import React from 'react'; // Import the React library
import Head from 'next/head'; // Import the Head component from the Next.js library
import LinkForm from '../../components/forms/LinkForm'; // Import the LinkForm component

export default function AddLink() { // Declare a default export function called AddLink
  return ( // Return the following JSX code
    <>
      <Head>
        <title>Add a Link</title> {/* Set the page title in the browser tab */}
      </Head>
      <LinkForm /> {/* Render the LinkForm component */}
    </>
  );
}

/* This code exports a React component called AddLink that renders a Head component from the Next.js library, which sets the page title in the browser tab to "Add a Link", and a LinkForm component from a local file. */
