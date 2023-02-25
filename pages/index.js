import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { getArtist } from '../api/userData';
import UserCard from '../components/UserCard';
import { useAuth } from '../utils/context/authContext';

function Home() {
  const [users, setUsers] = useState([]);
  const { user } = useAuth();
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
      <h1>Hello {user.displayName}! </h1>
      <div className="text-center my-4">
        <div className="d-flex flex-wrap">
          {users.map((artist) => (
            <UserCard key={artist.firebaseKey} userObj={artist} onUpdate={getAllTheArtists} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;
