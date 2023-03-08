import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { getUser } from '../api/userData';
import { signOut } from '../utils/auth';
import { deleteUserLinksAndEvents } from '../api/mergedData';

export default function UserProfile({ onUpdate }) {
  const { user } = useAuth();
  const [profileDetails, setProfileDetails] = useState({});
  const router = useRouter();

  const deleteThisUser = () => {
    console.warn('onUpdate type:', typeof onUpdate);
    if (window.confirm(`Are You Sure, ${profileDetails.name}?`)) {
      deleteUserLinksAndEvents(profileDetails.uid, profileDetails.firebaseKey).then(() => {
        console.warn('calling onUpdate');
        onUpdate();
        router.push('/signin');
      })
        .catch((error) => {
          console.error('Error deleting user:', error);
        });
    }
  };

  useEffect(() => {
    getUser(user.uid).then((profileData) => {
      setProfileDetails(profileData);
    });
  }, [user]);

  return (
    <>
      <div style={{ marginTop: '35px' }}>
        <img src={profileDetails.image} alt="yourmom" width="100px" height="100px" />
        <h1>{profileDetails.name}</h1>
        <h2>{profileDetails.bio}</h2>

        {profileDetails.isArtist && (
        <>
          <Link href="/links/new" passHref>
            <Button variant="success" className="m-2">NEW LINK</Button>
          </Link>
          <Link href="/events/new" passHref>
            <Button variant="warning" className="m-2">NEW EVENT</Button>
          </Link>
        </>
        )}

        <Button variant="dark" onClick={deleteThisUser} className="m-2">
          LEAVE MCHH
        </Button>

        <Button variant="danger" onClick={signOut}> Sign Out</Button>
      </div>
    </>
  );
}

UserProfile.propTypes = {
  profileDetails: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    bio: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
