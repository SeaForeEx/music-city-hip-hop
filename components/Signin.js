/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Head from 'next/head';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div className="signinBG">
      <Head>
        <title>A New Era Has Dawned</title>
      </Head>
      <div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
        }}
        >
          <button onClick={signIn} style={{ background: 'none', border: 'none', padding: 0 }}>
            <img src="https://i.imgur.com/d4plG7c.png" alt="mchh-logo" style={{ maxWidth: '50%' }} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signin;
