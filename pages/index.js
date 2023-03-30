/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Head from 'next/head';

function Home() {
  return (
    <>
      <Head>
        <title>Welcome To MUSIC CITY HIP-HOP</title> {/* Sets the title of the page */}
      </Head>
      <div className="textStyle" style={{ display: 'flex' }}> {/* Creates a container with the class "textStyle" and a flex display */}
        <div style={{
          flex: 1, // Sets the flex value of the div to 1
          backgroundColor: 'rgba(0, 0, 0, 0.7)', // Sets the background color of the div to a translucent black
          padding: '20px', // Adds 20 pixels of padding to the div
          opacity: '0.9', // Sets the opacity of the div to 0.9
        }}
        >
          {/* Text content */}
          <p>It is a dark time in Nashville, Tennessee. Bachelorettes and hipsters with ironic cowboy hats are getting day and night drunk to honky tonk hits remixed with a pop country glaze.</p>

          <p>Kid Rock has a bar in Downtown Nashville.</p>

          <p>No really, why does he have a bar in Downtown Nashville?</p>

          <p>I mean, Bawitdaba was catchy, but why does Detroit's least talented export have a bar in Downtown Nashville?!</p>

          <p>Anyway...</p>

          <p>There is a music scene growing under the radar, away from the pedal taverns and boot shops on Broadway.</p>

          It's raw.<br />
          It's passionate.<br />
          And most important?<br /><br />

          <p>It's real.</p>

          <h2>WELCOME TO MUSIC CITY HIP-HOP...</h2> {/* Heading text */}
        </div>
        <div style={{
          flex: 1, // Sets the flex value of the div to 1
          backgroundColor: 'rgba(0, 0, 0, 0.7)', // Sets the background color of the div to a translucent black
          padding: '20px', // Adds 20 pixels of padding to the div
          opacity: '0.9', // Sets the opacity of the div to 0.9
          display: 'flex', // Sets the display value of the div to flex
          alignItems: 'center', // Aligns items to the center of the div
        }}
        >
          <img src="https://i.imgur.com/HSl84mq.png" alt="mchh logo" width="600px" style={{ float: 'right' }} /> {/* Inserts an image with a source, alternative text, and width, and floats it to the right */}
        </div>
      </div>
    </>
  );
}

export default Home;
