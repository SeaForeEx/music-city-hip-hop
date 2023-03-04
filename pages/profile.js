import React from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';

// I need user.image/name/bio to display but they are not showing up when I click on Profile
export default function UserProfile() {
  const { user, signOut } = useAuth();
  return (
    <>
      <div style={{ marginTop: '35px' }}>
        <img src={user.image} alt="userURL" width="100px" height="100px" />
        <h1>Name: {user.name}</h1>
        <h2>Bio: {user.bio}</h2>
        <Button variant="danger" onClick={signOut}> Sign Out</Button>
      </div>
    </>
  );
}
