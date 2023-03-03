/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleLink } from '../../api/linkData';

export default function ViewLink() {
  const [linkDetails, setLinkDetails] = useState({}); // useState & Effect are react
  const router = useRouter(); // useRouter is next.js

  const { linkFirebaseKey } = router.query;

  useEffect(() => {
    getSingleLink(linkFirebaseKey).then((linkData) => {
      setLinkDetails(linkData);
    });
  }, [linkFirebaseKey]);

  return (
    <div className="mt-5 d-flex flex-wrap">
      <div className="d-flex flex-column">
        <h5>
          {linkDetails.name}
        </h5>
        <p>{linkDetails.link}</p>
      </div>
    </div>
  );
}
