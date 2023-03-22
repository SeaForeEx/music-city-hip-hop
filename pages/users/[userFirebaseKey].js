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
  }, [userFirebaseKey]);

  // SET THE PROFILE VIEWER - THE USER VIEWING ANOTHER USER'S PROFILE

  // getUser by UID
  const [profileViewer, setProfileViewer] = useState({});
  const getProfileViewer = () => {
    getAllUsers().then((userArray) => {
      const appUser = userArray.find((userObj) => userObj.uid === user.uid);
      setProfileViewer(appUser);
    });
  };
  useEffect(() => {
    getProfileViewer();
  }, [user]);

  // GET ALL THE OTHER USERS THE USER FOLLOWS
  const [follows, setFollows] = useState([]);
  const getAllFollows = () => {
    getUserFollows(userFirebaseKey).then(setFollows);
  };
  useEffect(() => {
    getAllFollows();
  }, [userFirebaseKey]);

  // CHECK IF PROFILE VIEWER FOLLOWS PROFILE OWNER
  const [userRelationship, setUserRelationship] = useState(false);
  const getUserRelationship = () => {
    getFollowsByFBKey(profileViewer.firebaseKey).then((followRelationships) => {
      const userFollowRelationship = followRelationships.find((relationship) => relationship.receiverId === profileOwner.firebaseKey && relationship.followerId === profileViewer.firebaseKey);
      if (userFollowRelationship) setUserRelationship(true);
      else setUserRelationship(false);
    });
  };
  useEffect(() => {
    getUserRelationship();
  }, [profileOwner, profileViewer]);

  // CLICK EVENT FOR FOLLOWING A USER
  const followUser = () => {
    const payload = {
      followerId: profileViewer.firebaseKey,
      receiverId: profileOwner.firebaseKey,
    };
    createFollow(payload).then(({ name }) => {
      const patchPayload = { firebaseKey: name };
      updateFollow(patchPayload).then(getUserRelationship);
    });
  };
  // CLICK EVENT FOR UNFOLLOWING A USER
  const unfollowUser = () => {
    getFollowsByFBKey(profileViewer.firebaseKey).then((followRelationships) => {
      const userFollowRelationship = followRelationships.find((relationship) => relationship.receiverId === profileOwner.firebaseKey && relationship.followerId === profileViewer.firebaseKey);
      deleteSingleFollow(userFollowRelationship.firebaseKey);
    }).then(getUserRelationship);
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
  }, [userFirebaseKey]);

  return (
    <>
      <Head>
        <title>{userLinks.name}</title>
      </Head>
      <section className="userHeader" style={{ display: 'flex', alignItems: 'center', marginTop: '16px' }}>
        <div style={{
          alignItems: 'center', justifyContent: 'center', display: 'flex', marginRight: '32px',
        }}
        >
          <img src={userLinks.image} width="250px" height="250px" alt={userLinks.image} style={{ borderRadius: '50%' }} />
        </div>
        <div>
          <h2>{userLinks.name}</h2>
          <p>{userLinks.bio}</p>
          {userRelationship === true && profileOwner.firebaseKey !== profileViewer.firebaseKey ? (<Button variant="outline-dark" className="m-2 whiteButton" onClick={unfollowUser}>Unfollow</Button>) : ''}
          {userRelationship === false && profileOwner.firebaseKey !== profileViewer.firebaseKey ? (<Button variant="outline-dark" className="m-2 whiteButton" onClick={followUser}>Follow</Button>) : ''}
        </div>
      </section>

      <div style={{ display: 'flex' }}>
        <section style={{ flex: '1' }}>
          {userLinks.isArtist && (
          <div className="linkeventBG">
            <div>
              <h2 style={{ marginTop: '1%', marginLeft: '1%' }}>LINKS</h2>
              {userLinks.links?.map((link) => (
                <LinkCard key={link.firebaseKey} linkObj={link} onUpdate={onlyBuiltForUserLinks} />
              ))}
            </div>
            <div style={{ marginTop: '1%' }}>
              <h2 style={{ marginTop: '1%', marginLeft: '1%' }}>EVENTS</h2>
              {userEvents.events?.map((event) => (
                <EventCard key={event.firebaseKey} eventObj={event} onUpdate={onlyBuiltForUserEvents} />
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
