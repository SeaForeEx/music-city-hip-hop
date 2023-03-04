import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useAuth } from '../utils/context/authContext';
import { getSingleUser } from '../api/userData';

// I need profileDetails.image/name/bio to display but they are not showing up when I click on Profile
// These are the data that are input in UserForm
export default function UserProfile() {
  const { user, signOut } = useAuth();
  const [profileDetails, setProfileDetails] = useState({});

  useEffect(() => {
    getSingleUser(user).then((profileData) => {
      setProfileDetails(profileData);
      console.warn(user.uid);
    });
  }, [user]);
  return (
    <>
      <div style={{ marginTop: '35px' }}>
        <img src={profileDetails.image} alt="yourmom" width="100px" height="100px" />
        {console.warn('profileDetails:', profileDetails)}
        <h1>Name: {profileDetails.name}</h1>
        <h2>Bio: {profileDetails.bio}</h2>
        <Button variant="danger" onClick={signOut}> Sign Out</Button>
      </div>
    </>
  );
}
