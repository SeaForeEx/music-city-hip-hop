import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { getArtist } from '../api/userData';
import UserCard from '../components/UserCard';

function Home() {
  const [users, setUsers] = useState([]);
  const getAllTheArtists = () => {
    getArtist().then((data) => {
      const sortedUsers = data.sort((a, b) => a.name.localeCompare(b.name));
      setUsers(sortedUsers);
    });
  };

  useEffect(() => {
    getAllTheArtists();
  }, []);

  return (
    <div className="regBG">
      <Head>
        <title>Welcome To MUSIC CITY HIP-HOP</title>
      </Head>
      <h2
        style={{
          marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >DISCOVER A NEW ARTIST
      </h2>
      <div className="d-flex flex-wrap justify-content-center" style={{ alignItems: 'flex-start', marginTop: '10px' }}>
        {users.map((artist) => (
          <UserCard key={artist.firebaseKey} userObj={artist} onUpdate={getAllTheArtists} />
        ))}
      </div>
    </div>
  );
}

export default Home;
