import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getUser } from '../api/userData';
import { signOut } from '../utils/auth';

// I need profileDetails.image/name/bio to display but they are not showing up when I click on Profile
// These are the data that are input in UserForm
export default function UserProfile() {
  const { user } = useAuth();
  const [profileDetails, setProfileDetails] = useState({});

  useEffect(() => {
    getUser(user.uid).then((profileData) => {
      setProfileDetails(profileData);
    });
  }, [user]);
  return (
    <>
      <div style={{ marginTop: '35px' }}>
        <img src={profileDetails.image} alt="yourmom" width="100px" height="100px" />
        <h1>Name: {profileDetails.name}</h1>
        <h2>Bio: {profileDetails.bio}</h2>
        <Button variant="danger" onClick={signOut}> Sign Out</Button>
      </div>
    </>
  );
}
