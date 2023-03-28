import React from 'react';

// Define a functional component named Loading that takes no props.
export default function Loading() {
  // Return the following JSX to render the component:
  return (
    <div className="text-center mt-5">
      {/* Define a spinning loader icon */}
      <div
        className="spinner-border"
        style={{
          color: '#00BF67', // Set the color of the spinner to green
          width: '100px', // Set the width of the spinner to 100 pixels
          height: '100px', // Set the height of the spinner to 100 pixels
        }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
