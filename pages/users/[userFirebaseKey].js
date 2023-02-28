/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleUser } from '../../api/userData';

export default function ViewUser() {
  const [userDetails, setUserDetails] = useState({}); // useState & Effect are react
  const router = useRouter(); // useRouter is next.js

  const { userFirebaseKey } = router.query;

  useEffect(() => {
    getSingleUser(userFirebaseKey).then((userData) => {
      setUserDetails(userData);
    });
  }, [userFirebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <img src={userDetails.image} alt={userDetails.image} style={{ width: '300px' }} />
      </div>
      <div className="text-white ms-5 details">
        <h5>
          {userDetails.name}
        </h5>
        <p>Bio: {userDetails.bio}</p>
      </div>
    </div>
  );
}
