import React from 'react';
import Head from 'next/head';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <>
      <Head>
        <title>A New Era Has Dawned</title>
      </Head>
      <div
        className="text-center d-flex flex-column justify-content-center align-content-center"
        style={{
          height: '90vh',
          padding: '30px',
          maxWidth: '400px',
          margin: '0 auto',
        }}
      >
        <h1>Hi there!</h1>
        <p>Click the button below to login!</p>
        <button type="button" className="btn btn-primary btn-lg copy-btn" onClick={signIn}>
          Sign In
        </button>
      </div>
    </>
  );
}

export default Signin;
