import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import {
  getUser, getUserEvents, getUserLinks,
} from '../api/userData';
import { signOut } from '../utils/auth';
import { viewUserDetails, deleteUserLinksAndEvents } from '../api/mergedData';
import LinkCard from '../components/LinkCard';
import EventCard from '../components/EventCard';

export default function UserProfile() {
  const { user } = useAuth();
  const [profileDetails, setProfileDetails] = useState({});
  const [userLinks, setUserLinks] = useState([]);
  const [userEvents, setUserEvents] = useState([]);
  const router = useRouter();

  const { userFirebaseKey } = router.query;

  const deleteThisUser = () => {
    if (window.confirm(`Are You Sure, ${profileDetails.name}?`)) {
      deleteUserLinksAndEvents(profileDetails.uid, profileDetails.firebaseKey).then(() => {
        router.push('/signin');
      })
        .catch((error) => {
          console.error('Error deleting user:', error);
        });
    }
  };

  const onlyBuiltForUserLinks = (artistId) => {
    viewUserDetails(artistId).then((links) => {
      setUserLinks(links);
    });
  };

  const onlyBuiltForUserEvents = (artistId) => {
    viewUserDetails(artistId).then((events) => {
      setUserEvents(events);
    });
  };

  const fetchData = async () => {
    const profileData = await getUser(user.uid);
    setProfileDetails(profileData);
    const linksData = await getUserLinks(profileData.uid);
    setUserLinks(linksData);
    const eventsData = await getUserEvents(profileData.uid);
    setUserEvents(eventsData);
    onlyBuiltForUserLinks(profileData.uid);
    onlyBuiltForUserEvents(profileData.uid);
  };

  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, userFirebaseKey]);

  return (
    <>
      <div style={{ marginTop: '35px' }}>
        <img src={profileDetails.image} alt="yourmom" width="100px" height="100px" />
        <h1>{profileDetails.name}</h1>
        <h2>{profileDetails.bio}</h2>
        <Link href={`/users/edit/${profileDetails.firebaseKey}`} passHref>
          <Button variant="info">EDIT PROFILE</Button>
        </Link>

        {profileDetails.isArtist && (
        <>
          <div className="d-flex flex-wrap">
            {userLinks.links?.map((link) => (
              <LinkCard key={link.firebaseKey} linkObj={link} onUpdate={fetchData} />
            ))}
          </div>
          <Link href="/links/new" passHref>
            <Button variant="success" className="m-2">NEW LINK</Button>
          </Link>
          <div className="d-flex flex-wrap">
            {userEvents.events?.map((event) => (
              <EventCard key={event.firebaseKey} eventObj={event} onUpdate={fetchData} />
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
