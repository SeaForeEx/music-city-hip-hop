import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import Head from 'next/head';
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
        router.push('/');
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
      <Head>
        <title>{profileDetails.name}&apos;s Profile</title>
      </Head>
      <div className="userHeader" style={{ display: 'flex', alignItems: 'center', marginTop: '16px' }}>
        <div style={{ flex: 1 }}>
          <img src={profileDetails.image} alt={profileDetails.image} width="200px" style={{ borderRadius: '50%' }} />
        </div>
        <div style={{ flex: 2 }}>
          <h2>{profileDetails.name}</h2>
          <p>{profileDetails.bio}</p>
          <Link href={`/users/edit/${profileDetails.firebaseKey}`} passHref>
            <Button className="m-2 btn-transparent">edit profile</Button>
          </Link>

          <Button className="m-2 btn-signout" onClick={() => { deleteThisUser(); signOut(); }}>
            leave MCHH
          </Button>

          <Button className="m-2 btn-signout" onClick={signOut} style={{ marginLeft: '10px' }}> sign out</Button>
        </div>
      </div>

      {profileDetails.isArtist && (
      <div className="linkeventBG" style={{ display: 'flex', flexDirection: 'column' }}>
        <div>
          <h5 style={{ marginTop: '1%', marginLeft: '1%' }}>LINKS
            <Link href="/links/new" passHref>
              <Button variant="success" className="m-2 btn-transparent">new link</Button>
            </Link>
          </h5>
          <div className="d-flex flex-wrap flex-column">
            {userLinks.links?.map((link) => (
              <LinkCard key={link.firebaseKey} linkObj={link} onUpdate={fetchData} />
            ))}
          </div>
        </div>
        <div>
          <h5 style={{ marginTop: '1%', marginLeft: '1%' }}>EVENTS
            <Link href="/links/new" passHref>
              <Button variant="success" className="m-2 btn-transparent">new event</Button>
            </Link>
          </h5>
          <div className="d-flex flex-wrap flex-column">
            {userEvents.events?.map((event) => (
              <EventCard key={event.firebaseKey} eventObj={event} onUpdate={fetchData} />
            ))}
          </div>
        </div>
      </div>
      )}
    </>
  );
}
