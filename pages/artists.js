// Import necessary dependencies
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { getArtist } from '../api/userData'; // Import function to retrieve artist data from the database
import UserCard from '../components/UserCard'; // Import component to display individual user data

// Define functional component called "Artists"
function Artists() {
  // Initialize state variable "users" as an empty array and the "setUsers" function used to update it
  const [users, setUsers] = useState([]);

  // Function to retrieve all artists and sort them by name, then update "users" state variable
  const getAllTheArtists = () => {
    // Call the "getArtist" function from the "userData" module
    getArtist().then((data) => {
      // Sort the artist data alphabetically by name using the "localeCompare" method
      const sortedUsers = data.sort((a, b) => a.name.localeCompare(b.name));
      // Update "users" state variable with the sorted data
      setUsers(sortedUsers);
      // Print the sorted data to the console for debugging purposes
      console.warn(sortedUsers);
    });
  };

  // Use the useEffect hook to call "getAllTheArtists" function only when the component mounts
  useEffect(() => {
    getAllTheArtists();
  }, []);

  // Return JSX elements for the component
  return (
    <div className="regBG">
      <Head>
        <title>We Love Our Artists!</title>
      </Head>
      <h2
        // Inline styles to center the heading text horizontally and vertically
        style={{
          marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >DISCOVER A NEW ARTIST
      </h2>
      {/* Map over "users" array and return a "UserCard" component for each */}
      <div className="d-flex flex-wrap justify-content-center" style={{ alignItems: 'flex-start', marginTop: '10px' }}>
        {users.map((artist) => (
          // Pass "key", "userObj", and "onUpdate" props to "UserCard" component
          // "key" prop is required by React for list items and is set to the artist's unique Firebase key
          // "userObj" prop contains all the artist's data and is passed as a single object
          // "onUpdate" prop is a callback function passed to each "UserCard" component, which will refresh the list of artists when called
          <UserCard key={artist.firebaseKey} userObj={artist} onUpdate={getAllTheArtists} />
        ))}
      </div>
    </div>
  );
}

// Export "Artists" component as default export
export default Artists;
