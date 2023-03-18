/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import {
  getAllUsers, getUser, getUserEvents, getUserLinks, getUserByFBKey,
} from '../api/userData';
import { signOut } from '../utils/auth';
import { viewUserDetails, deleteUserLinksAndEvents, getUserFollows } from '../api/mergedData';
import LinkCard from '../components/LinkCard';
import EventCard from '../components/EventCard';
import FollowCard from '../components/FollowCard';
// import { getFollowsByFBKey } from '../api/followData';

export default function UserProfile() {
  const { user } = useAuth();
  const [profileDetails, setProfileDetails] = useState({});
  const [userLinks, setUserLinks] = useState([]);
  const [userEvents, setUserEvents] = useState([]);
  const router = useRouter();

  const { userFirebaseKey } = router.query;
  const [profileOwner, setProfileOwner] = useState({});
  const getProfileOwner = () => {
    getUserByFBKey(userFirebaseKey).then(setProfileOwner);
  };
  useEffect(() => {
    getProfileOwner();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userFirebaseKey]);

  // SET THE PROFILE VIEWER - THE USER VIEWING ANOTHER USER'S PROFILE
  const [, setProfileViewer] = useState({});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getProfileViewer = () => {
    getAllUsers().then((userArray) => {
      const appUser = userArray.find((userObj) => userObj.uid === user.uid);
      setProfileViewer(appUser);
    });
  };
  useEffect(() => {
    getProfileViewer();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // GET ALL THE OTHER USERS THE USER FOLLOWS
  const [follows, setFollows] = useState([]);
  const getAllFollows = () => {
    getUserFollows(userFirebaseKey).then(setFollows);
    console.warn(follows);
  };
  useEffect(() => {
    getAllFollows();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userFirebaseKey]);

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
      <section className="userHeader" style={{ display: 'flex', alignItems: 'center', marginTop: '16px' }}>
        <div style={{
          alignItems: 'center', justifyContent: 'center', display: 'flex', marginRight: '32px',
        }}
        >
          <img src={profileDetails.image} alt={profileDetails.image} width="250px" style={{ borderRadius: '50%' }} />
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
      </section>

      <div style={{ display: 'flex' }}>
        <section style={{ flex: '1' }}>
          {profileDetails.isArtist && (
          <div className="linkeventBG">
            <div>
              <h2 style={{ marginTop: '1%', marginLeft: '1%' }}>LINKS</h2>
              <Link href="/links/new" passHref>
                <Button variant="success" className="m-2 btn-transparent">new link</Button>
              </Link>
              {userLinks.links?.map((link) => (
                <LinkCard key={link.firebaseKey} linkObj={link} onUpdate={fetchData} />
              ))}
            </div>
            <div style={{ marginTop: '1%' }}>
              <h2 style={{ marginTop: '1%', marginLeft: '1%' }}>EVENTS</h2>
              <Link href="/events/new" passHref>
                <Button variant="success" className="m-2 btn-transparent">new event</Button>
              </Link>
              {userEvents.events?.map((event) => (
                <EventCard key={event.firebaseKey} eventObj={event} onUpdate={fetchData} />
              ))}
            </div>
          </div>
          )}
        </section>

        <aside className="followBG" style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
          <h2>FOLLOWS</h2>
          <div>
            {follows.map((follow) => (
              <FollowCard key={follow.firebaseKey} followObj={follow} onUpdate={getAllFollows} appUser={profileOwner} />
            ))}
          </div>
        </aside>
      </div>
    </>
  );
}
