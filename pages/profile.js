import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import {
  findUserByFBKey, getUser, getUserEvents, getUserLinks,
} from '../api/userData';
import { signOut } from '../utils/auth';
import { viewUserDetails, deleteUserLinksAndEvents } from '../api/mergedData';
import LinkCard from '../components/LinkCard';
import EventCard from '../components/EventCard';

export default function UserProfile({ onUpdate }) {
  const { user } = useAuth();
  const [profileDetails, setProfileDetails] = useState({});
  const [userLinks, setUserLinks] = useState([]);
  const [userEvents, setUserEvents] = useState([]);
  const router = useRouter();

  const { userFirebaseKey } = router.query;

  const onlyBuiltForUserLinks = () => {
    findUserByFBKey(userFirebaseKey).then(() => {
      viewUserDetails(user.uid).then((links) => {
        setUserLinks(links);
      });
    });
  };

  const onlyBuiltForUserEvents = () => {
    findUserByFBKey(userFirebaseKey).then(() => {
      viewUserDetails(user.uid).then((events) => {
        setUserEvents(events);
      });
    });
  };

  useEffect(() => {
    onlyBuiltForUserLinks();
    onlyBuiltForUserEvents();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userFirebaseKey]);

  const deleteThisUser = () => {
    if (window.confirm(`Are You Sure, ${profileDetails.name}?`)) {
      deleteUserLinksAndEvents(profileDetails.uid, profileDetails.firebaseKey).then(() => {
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
      getUserLinks(profileData.uid).then((linksData) => {
        setUserLinks(linksData);
      });
      getUserEvents(profileData.uid).then((eventsData) => {
        setUserEvents(eventsData);
      });
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
          <div className="d-flex flex-wrap">
            {userLinks.links?.map((link) => (
              <LinkCard key={link.firebaseKey} linkObj={link} onUpdate={onlyBuiltForUserLinks} />
            ))}
          </div>
          <Link href="/links/new" passHref>
            <Button variant="success" className="m-2">NEW LINK</Button>
          </Link>
          <div className="d-flex flex-wrap">
            {userEvents.events?.map((event) => (
              <EventCard key={event.firebaseKey} eventObj={event} onUpdate={onlyBuiltForUserEvents} />
            ))}
          </div>
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
    onUpdate: PropTypes.func.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
