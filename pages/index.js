import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { getArtist } from '../api/userData';
import UserCard from '../components/UserCard';

function Home() {
  const [users, setUsers] = useState([]);
  const getAllTheArtists = () => {
    getArtist().then(setUsers);
  };

  useEffect(() => {
    getAllTheArtists();
  }, []);

  return (
    <>
      <Head>
        <title>Welcome To MUSIC CITY HIP-HOP</title>
      </Head>
      <div className="d-flex flex-wrap justify-content-center" style={{ alignItems: 'flex-start', marginTop: '10px' }}>
        {users.map((artist) => (
          <UserCard key={artist.firebaseKey} userObj={artist} onUpdate={getAllTheArtists} />
        ))}
      </div>
    </>
  );
}

export default Home;
