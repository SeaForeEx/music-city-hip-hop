import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { getFans } from '../api/userData'; // Importing the getFans function from the 'userData' module
import UserCard from '../components/UserCard'; // Importing the 'UserCard' component

function Fans() {
  const [users, setUsers] = useState([]); // Using the 'useState' hook to set initial state for 'users' as an empty array
  const getAllTheFans = () => {
    getFans().then((data) => { // Calling the 'getFans' function and setting the returned data to 'data' parameter
      const sortedFans = data.sort((a, b) => a.name.localeCompare(b.name)); // Sorting the 'data' array using the 'sort' method based on the 'name' property of the objects in the array
      setUsers(sortedFans); // Updating the state of 'users' with the sorted array
      console.warn(sortedFans); // Logging the sorted array to the console
    });
  };

  useEffect(() => {
    getAllTheFans(); // Calling the 'getAllTheFans' function when the component mounts or updates
  }, []);

  return (
    <>
      <Head>
        <title>We Love Our Fans!</title>
      </Head>
      <h2 style={{
        marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
      >MEET YOUR FANS
      </h2>
      <div className="d-flex flex-wrap justify-content-center" style={{ alignItems: 'flex-start', marginTop: '10px' }}>
        {users.map((fan) => (
          <UserCard key={fan.firebaseKey} userObj={fan} onUpdate={getAllTheFans} /> // Rendering the 'UserCard' component for each 'fan' object in the 'users' array, passing the 'userObj' prop with the 'fan' object and the 'onUpdate' prop with the 'getAllTheFans' function
        ))}
      </div>
    </>
  );
}

export default Fans;
