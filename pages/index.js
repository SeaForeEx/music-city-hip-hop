/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Head from 'next/head';

function Home() {
  return (
    <>
      <Head>
        <title>Welcome To MUSIC CITY HIP-HOP</title>
      </Head>
      <div style={{ display: 'flex' }}>
        <div style={{
          flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: '20px', opacity: '0.9',
        }}
        >
          <p>It is a dark time in Nashville, Tennessee. Bachelorettes and hipsters with ironic cowboy hats are getting day and night drunk to honky tonk hits remixed with a pop country glaze.</p>

          <p>Kid Rock has a bar in Downtown Nashville.</p>

          <p>No really, why does he have a bar in Downtown Nashville?</p>

          <p>I mean, Bawitdaba was catchy, but why does Detroit's least talented export have a bar in Downtown Nashville?!</p>

          <p>Anyway...</p>

          <p>There is a music scene growing under the radar, away from the pedal taverns and boot shops on Broadway.</p>

          It's raw.<br />
          It's passionate.<br />
          And most important?<br />

          <p>It's real.</p>

          <h2>WELCOME TO MUSIC CITY HIP-HOP...</h2>
        </div>
        <div style={{
          flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: '20px', opacity: '0.9', display: 'flex', alignItems: 'center',
        }}
        >
          <img src="https://i.imgur.com/HSl84mq.png" alt="mchh logo" width="600px" style={{ float: 'right' }} />
        </div>
      </div>
    </>
  );
}

export default Home;
