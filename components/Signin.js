/* eslint-disable react/button-has-type */ // Disable warning about specifying button type
/* eslint-disable jsx-a11y/anchor-is-valid */ // Disable warning about invalid link anchor
/* eslint-disable @next/next/no-img-element */ // Disable warning about invalid image element
import React from 'react'; // Import React library
import Head from 'next/head'; // Import Head component from Next.js
import { signIn } from '../utils/auth'; // Import signIn function from auth.js

function Signin() { // Define Signin component
  return (
    <div className="signinBG"> {/* Create a div with class "signinBG" */}
      <Head>
        <title>A New Era Has Dawned</title> {/* Set the title of the page */}
      </Head>
      <div>
        <div style={{
          display: 'flex', // Use flexbox to horizontally center the button
          alignItems: 'center', // Vertically center the button
        }}
        >
          <button onClick={signIn} style={{ background: 'none', border: 'none', padding: 0 }}> {/* Create a button that calls the signIn function when clicked */}
            <img src="https://i.imgur.com/d4plG7c.png" alt="mchh-logo" style={{ maxWidth: '50%' }} /> {/* Display the MCHH logo */}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signin; // Export the Signin component as the default export
