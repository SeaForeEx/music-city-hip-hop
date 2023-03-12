/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import LinkCard from '../../components/LinkCard';
import EventCard from '../../components/EventCard';
import { getUserByFBKey } from '../../api/userData';
import { viewUserDetails } from '../../api/mergedData';

export default function ViewUser() {
  const [userLinks, setUserLinks] = useState([]);
  const [userEvents, setUserEvents] = useState([]);
  const router = useRouter(); // useRouter is next.js
  const { userFirebaseKey } = router.query;

  const onlyBuiltForUserLinks = () => {
    getUserByFBKey(userFirebaseKey).then((user) => {
      viewUserDetails(user.uid).then((links) => {
        setUserLinks(links);
      });
    });
  };

  const onlyBuiltForUserEvents = () => {
    getUserByFBKey(userFirebaseKey).then((user) => {
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

  return (
    <>
      <Head>
        <title>{userLinks.name}</title>
      </Head>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="userHeader" style={{ display: 'flex', alignItems: 'center', marginTop: '16px' }}>
          <div style={{ flex: 1 }}>
            <img src={userLinks.image} width="200px" height="200px" alt={userLinks.image} style={{ borderRadius: '50%' }} />
          </div>
          <div style={{ flex: 2 }}>
            <h2>{userLinks.name}</h2>
            <p>{userLinks.bio}</p>
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
    </>
  );
}
