/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LinkCard from '../../components/LinkCard';
import EventCard from '../../components/EventCard';
import { findUserByFBKey } from '../../api/userData';
import { viewUserDetails } from '../../api/mergedData';

export default function ViewUser() {
  const [userLinks, setUserLinks] = useState([]);
  const [userEvents, setUserEvents] = useState([]);
  const router = useRouter(); // useRouter is next.js
  const { userFirebaseKey } = router.query;

  const onlyBuiltForUserLinks = () => {
    findUserByFBKey(userFirebaseKey).then((user) => {
      viewUserDetails(user.uid).then((links) => {
        setUserLinks(links);
      });
    });
  };

  const onlyBuiltForUserEvents = () => {
    findUserByFBKey(userFirebaseKey).then((user) => {
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
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <div style={{ marginTop: '16px' }}>
            <img src={userLinks.image} width="200px" height="200px" alt={userLinks.image} style={{ borderRadius: '50%', marginBottom: '10%' }} />
          </div>
          <div style={{ marginTop: '1%', marginLeft: '1%' }}>
            <h2>{userLinks.name}</h2>
            <p>{userLinks.bio}</p>
          </div>
        </div>
        <div className="paperBG">
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
      </div>

    </>
  );
}
