/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LinkCard from '../../components/LinkCard';
import { findUserByFBKey } from '../../api/userData';
import viewUserDetails from '../../api/mergedData';

export default function ViewUser() {
  // const [userDetails, setUserDetails] = useState({}); // useState & Effect are react
  const [userLinks, setUserLinks] = useState([]);
  const router = useRouter(); // useRouter is next.js
  const { userFirebaseKey } = router.query;

  const onlyBuiltForUserLinks = () => {
    findUserByFBKey(userFirebaseKey).then((user) => {
      viewUserDetails(user.uid).then((links) => {
        console.warn(links);
        setUserLinks(links);
      });
    });
  };

  useEffect(() => {
    onlyBuiltForUserLinks();
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
        <p>Bio: {userLinks.bio}</p>
      </div>
      <div className="d-flex flex-wrap">
        {userLinks.links?.map((link) => (
          <LinkCard key={link.firebaseKey} linkObj={link} onUpdate={onlyBuiltForUserLinks} />
        ))}
      </div>
    </div>
  );
}
