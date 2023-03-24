import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { getFans } from '../api/userData';
import UserCard from '../components/UserCard';

function Fans() {
  const [users, setUsers] = useState([]);
  const getAllTheFans = () => {
    getFans().then((data) => {
      const sortedFans = data.sort((a, b) => a.name.localeCompare(b.name));
      setUsers(sortedFans);
      console.warn(sortedFans);
    });
  };

  useEffect(() => {
    getAllTheFans();
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
          <UserCard key={fan.firebaseKey} userObj={fan} onUpdate={getAllTheFans} />
        ))}
      </div>
    </>
  );
}

export default Fans;
