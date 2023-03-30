/* eslint-disable react-hooks/exhaustive-deps */ // disables a specific linting rule for this file
/* eslint-disable @next/next/no-img-element */ // disables a specific linting rule for this file
import React, { useEffect, useState } from 'react'; // import React, useEffect and useState from the react library
import { Button } from 'react-bootstrap'; // import Button from the react-bootstrap library
import Link from 'next/link'; // import Link from the next/link library
import Head from 'next/head'; // import Head from the next/head library
import { useRouter } from 'next/router'; // import useRouter from the next/router library
import { useAuth } from '../utils/context/authContext'; // import useAuth from the authContext file in the utils/context folder
import { // import several functions from the userData file in the api folder
  getUser,
  getUserEvents,
  getUserLinks,
} from '../api/userData';
import { signOut } from '../utils/auth'; // import signOut function from the auth file in the utils folder
import { // import several functions from the mergedData file in the api folder
  viewUserDetails,
  deleteUserLinksAndEvents,
  getUserFollows,
} from '../api/mergedData';
import LinkCard from '../components/LinkCard'; // import LinkCard component from the components folder
import EventCard from '../components/EventCard'; // import EventCard component from the components folder
import FollowCard from '../components/FollowCard'; // import FollowCard component from the components folder

export default function UserProfile() { // defines a functional component called UserProfile
  const { user } = useAuth(); // retrieves user object from the useAuth hook
  const [profileDetails, setProfileDetails] = useState({}); // initializes profileDetails state with an empty object
  const [userLinks, setUserLinks] = useState([]); // initializes userLinks state with an empty array
  const [userEvents, setUserEvents] = useState([]); // initializes userEvents state with an empty array
  const router = useRouter(); // initializes the router object using the useRouter hook
  const [follows, setFollows] = useState([]); // initializes follows state with an empty array

  const getAllFollows = () => { // defines a function called getAllFollows
    getUser(user.uid).then((fbUser) => { // retrieves the user's information from the database using getUser function
      getUserFollows(fbUser.firebaseKey).then(setFollows); // retrieves the user's follows from the database using getUserFollows function and sets the follows state to the result
    });
  };

  useEffect(() => { // runs a side-effect when the component mounts or when the user.firebaseKey changes
    getAllFollows(); // calls the getAllFollows function to retrieve the user's follows
  }, [user.firebaseKey]);

  const deleteThisUser = () => { // defines a function called deleteThisUser
    if (window.confirm(`Are You Sure, ${profileDetails.name}?`)) { // shows a confirmation dialog before proceeding with deleting the user
      deleteUserLinksAndEvents(profileDetails.firebaseKey, profileDetails.uid).then(() => { // deletes the user's links and events from the database using deleteUserLinksAndEvents function
        router.push('/'); // navigates to the homepage
      })
        .catch((error) => {
          console.error('Error deleting user:', error); // logs an error message to the console if there's an error deleting the user
        });
    }
  };

  // Define a function to fetch user details (links and events) for an artist ID
  const onlyBuiltForUserLinks = (artistId) => {
  // Call the viewUserDetails function to retrieve links for the artist ID
    viewUserDetails(artistId).then((links) => {
    // Update the state with the retrieved links
      setUserLinks(links);
    });
  };

  // Define a function to fetch user events for an artist ID
  const onlyBuiltForUserEvents = (artistId) => {
  // Call the viewUserDetails function to retrieve events for the artist ID
    viewUserDetails(artistId).then((events) => {
    // Update the state with the retrieved events
      setUserEvents(events);
    });
  };

  // Define an async function to fetch user details, links, and events
  const fetchData = async () => {
  // Retrieve user details for the current user
    const profileData = await getUser(user.uid);
    // Update the state with the retrieved user details
    setProfileDetails(profileData);
    // Retrieve user links for the current user's UID
    const linksData = await getUserLinks(profileData.uid);
    // Update the state with the retrieved user links
    setUserLinks(linksData);
    // Retrieve user events for the current user's UID
    const eventsData = await getUserEvents(profileData.uid);
    // Update the state with the retrieved user events
    setUserEvents(eventsData);
    // Call onlyBuiltForUserLinks function to fetch user links for the current user's UID
    onlyBuiltForUserLinks(profileData.uid);
    // Call onlyBuiltForUserEvents function to fetch user events for the current user's UID
    onlyBuiltForUserEvents(profileData.uid);
  };

  // Use the useEffect hook to fetch user data when the component mounts or when user or user.firebaseKey updates
  useEffect(() => {
    fetchData();
  }, [user, user.firebaseKey]);

  return (
    <>
      <Head>
        <title>{profileDetails.name}&apos;s Profile</title>
      </Head>
      <section className="userHeader textStyle" style={{ display: 'flex', alignItems: 'center', marginTop: '16px' }}>
        {/* The user header section contains the user's image, name, bio, edit profile button, and sign out button */}
        <div style={{
          alignItems: 'center', justifyContent: 'center', display: 'flex', marginRight: '32px',
        }}
        >
          {/* The user's image is displayed with a border radius of 50% */}
          <img src={profileDetails.image} alt={profileDetails.image} width="250px" style={{ borderRadius: '50%' }} />
        </div>
        <div style={{ flex: 2 }}>
          {/* The user's name and bio are displayed */}
          <h2>{profileDetails.name}</h2>
          <p>{profileDetails.bio}</p>
          {/* The edit profile button is a link to the user's profile edit page */}
          <Link href={`/users/edit/${profileDetails.firebaseKey}`} passHref>
            <Button className="whiteButton">edit profile</Button>
          </Link>

          {/* The delete user and sign out buttons are displayed for the user to leave the website */}
          <Button className="redButton" onClick={() => { deleteThisUser(); signOut(); }}>
            leave MCHH
          </Button>

          <Button className="redButton" onClick={signOut} style={{ marginLeft: '10px' }}> sign out</Button>
        </div>
      </section>

      <div style={{ display: 'flex' }}>
        <section style={{ flex: '1' }}>
          {/* If the user is an artist, their links and events are displayed */}
          {profileDetails.isArtist && (
          <div className="linkeventBackground">
            <div>
              <h2 style={{ marginTop: '1%', marginLeft: '1%' }}>LINKS</h2>
              {/* The new link button is a link to the link creation page */}
              <Link href="/links/new" passHref>
                <Button variant="success" className="m-2 whiteButton">new link</Button>
              </Link>
              {/* All of the user's links are displayed in link cards */}
              {userLinks.links?.map((link) => (
                <LinkCard key={link.firebaseKey} linkObj={link} className="linkeventBackground" onUpdate={fetchData} />
              ))}
            </div>
            <div style={{ marginTop: '1%' }}>
              <h2 style={{ marginTop: '1%', marginLeft: '1%' }}>EVENTS</h2>
              {/* The new event button is a link to the event creation page */}
              <Link href="/events/new" passHref>
                <Button className="m-2 whiteButton">new event</Button>
              </Link>
              {/* All of the user's events are displayed in event cards */}
              {userEvents.events?.map((event) => (
                <EventCard key={event.firebaseKey} eventObj={event} className="linkeventBackground" onUpdate={fetchData} />
              ))}
            </div>
          </div>
          )}
        </section>

        <aside
          className="followBackground"
          style={{
            flex: '1', // This sets the flex property to 1, allowing the element to grow or shrink as needed
            display: 'flex', // This sets the display property to flex, allowing child elements to be flex items
            flexDirection: 'column', // This sets the flex direction to column, making the child elements stack vertically
          }}
        >
          <h2>FOLLOWS</h2>
          <div>
            {follows.map((follow) => (
              <FollowCard key={follow.firebaseKey} followObj={follow} onUpdate={getAllFollows} />
            ))}
          </div>
        </aside>
      </div>
    </>
  );
}
