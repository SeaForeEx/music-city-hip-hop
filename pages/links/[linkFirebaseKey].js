/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getSingleLink } from '../../api/linkData';

export default function ViewLink() {
  // Declare a state variable called linkDetails and initialize it with an empty object
  const [linkDetails, setLinkDetails] = useState({});

  // Get the router instance
  const router = useRouter();

  // Destructure the linkFirebaseKey from the router's query property
  const { linkFirebaseKey } = router.query;

  // useEffect hook to fetch link details on mount
  useEffect(() => {
    getSingleLink(linkFirebaseKey).then((linkData) => {
      // Update the linkDetails state variable with the data fetched from the API
      setLinkDetails(linkData);
    });
  }, [linkFirebaseKey]);

  // Render the link details
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

/* So, this code fetches the details of a single link using the getSingleLink function from the linkData API, and displays them using React. The useRouter hook from Next.js is used to get the query parameters from the URL. The useEffect hook is used to fetch the link details when the component mounts. */
