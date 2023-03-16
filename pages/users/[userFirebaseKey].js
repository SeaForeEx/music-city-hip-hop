/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import LinkCard from '../../components/LinkCard';
import EventCard from '../../components/EventCard';
import FollowCard from '../../components/FollowCard';
import { getUserByFBKey, getAllUsers } from '../../api/userData';
import { viewUserDetails, getUserFollows } from '../../api/mergedData';
import {
  getFollowsByFBKey, createFollow, updateFollow, deleteSingleFollow,
} from '../../api/followData';
import { useAuth } from '../../utils/context/authContext';

export default function ViewUser() {
  const [userLinks, setUserLinks] = useState([]);
  const [userEvents, setUserEvents] = useState([]);
  const router = useRouter(); // useRouter is next.js
  const { userFirebaseKey } = router.query;

  const { user } = useAuth();

  // SET THE PROFILE OWNER - THE USER WHOSE PROFILE IS BEING VIEWED
  const [profileOwner, setProfileOwner] = useState({});
  const getProfileOwner = () => {
    getUserByFBKey(userFirebaseKey).then(setProfileOwner);
  };
  useEffect(() => {
    getProfileOwner();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userFirebaseKey]);

  // SET THE PROFILE VIEWER - THE USER VIEWING ANOTHER USER'S PROFILE
  const [profileViewer, setProfileViewer] = useState({});
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
  };
  useEffect(() => {
    getAllFollows();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userFirebaseKey]);

  // CHECK IF PROFILE VIEWER FOLLOWS PROFILE OWNER
  const [userRelationship, setUserRelationship] = useState(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getUserRelationship = () => {
    getFollowsByFBKey(profileViewer.firebaseKey).then((followRelationships) => {
      const userFollowRelationship = followRelationships.find((relationship) => relationship.receiverId === profileOwner.firebaseKey && relationship.followerId === profileViewer.firebaseKey);
      if (userFollowRelationship) setUserRelationship(true);
    });
  };
  useEffect(() => {
    getUserRelationship();
  }, [profileOwner, profileViewer, getUserRelationship]);

  // CLICK EVENT FOR FOLLOWING A USER
  const followUser = () => {
    const payload = {
      followerId: profileViewer.firebaseKey,
      receiverId: profileOwner.firebaseKey,
    };
    createFollow(payload).then(({ name }) => {
      const patchPayload = { firebaseKey: name };
      updateFollow(patchPayload);
      window.location.reload(); // reload the page
    });
  };

  // CLICK EVENT FOR UNFOLLOWING A USER
  const unfollowUser = () => {
    getFollowsByFBKey(profileViewer.firebaseKey).then((followRelationships) => {
      const userFollowRelationship = followRelationships.find((relationship) => relationship.receiverId === profileOwner.firebaseKey && relationship.followerId === profileViewer.firebaseKey);
      console.warn(userFollowRelationship.firebaseKey);
      deleteSingleFollow(userFollowRelationship.firebaseKey);
      console.warn(userFollowRelationship.firebaseKey);
      window.location.reload(); // reload the page
    });
  };

  const onlyBuiltForUserLinks = () => {
    getUserByFBKey(userFirebaseKey).then((uzer) => {
      viewUserDetails(uzer.uid).then((links) => {
        setUserLinks(links);
      });
    });
  };

  const onlyBuiltForUserEvents = () => {
    getUserByFBKey(userFirebaseKey).then((uzer) => {
      viewUserDetails(uzer.uid).then((events) => {
        setUserEvents(events);
      });
    });
  };

  useEffect(() => {
    onlyBuiltForUserLinks();
    onlyBuiltForUserEvents();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userFirebaseKey]);

  return (
    <>
      <Head>
        <title>{userLinks.name}</title>
      </Head>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="userHeader" style={{ display: 'flex', alignItems: 'center', marginTop: '16px' }}>
          <div style={{
            flex: 1, alignItems: 'center', justifyContent: 'center', display: 'flex',
          }}
          >
            <img src={userLinks.image} width="250px" height="250px" alt={userLinks.image} style={{ borderRadius: '50%' }} />
          </div>
          <div style={{ flex: 2 }}>
            <h2>{userLinks.name}</h2>
            <p>{userLinks.bio}</p>
            {userRelationship === true && profileOwner.firebaseKey !== profileViewer.firebaseKey ? (<Button variant="outline-dark" className="m-2 btn-transparent" onClick={unfollowUser}>Unfollow</Button>) : ''}
            {userRelationship === false && profileOwner.firebaseKey !== profileViewer.firebaseKey ? (<Button variant="outline-dark" className="m-2 btn-transparent" onClick={followUser}>Follow</Button>) : ''}
          </div>
        </div>
        {userLinks.isArtist && (
        <div className="linkeventBG">
          <div>
            <h5 style={{ marginTop: '1%', marginLeft: '1%' }}>LINKS</h5>
            {userLinks.links?.map((link) => (
              <LinkCard key={link.firebaseKey} linkObj={link} onUpdate={onlyBuiltForUserLinks} />
            ))}
          </div>
          <div style={{ marginTop: '1%' }}>
            <h5 style={{ marginTop: '1%', marginLeft: '1%' }}>EVENTS</h5>
            {userEvents.events?.map((event) => (
              <EventCard key={event.firebaseKey} eventObj={event} onUpdate={onlyBuiltForUserEvents} />
            ))}
          </div>
        </div>
        )}
      </div>
      <h3>follows</h3>
      <div>
        {follows.map((follow) => (
          <FollowCard key={follow.firebaseKey} followObj={follow} onUpdate={getAllFollows} appUser={profileOwner} />
        ))}
      </div>
    </>
  );
}
