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
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={userLinks.image} alt={userLinks.image} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {userLinks.name}
        </h5>
        <p>{userLinks.bio}</p>
      </div>
      <div className="d-flex flex-wrap">
        {userLinks.links?.map((link) => (
          <LinkCard key={link.firebaseKey} linkObj={link} onUpdate={onlyBuiltForUserLinks} />
        ))}
      </div>
      <div className="d-flex flex-wrap">
        {userEvents.events?.map((event) => (
          <EventCard key={event.firebaseKey} eventObj={event} onUpdate={onlyBuiltForUserEvents} />
        ))}
      </div>

    </div>
  );
}
