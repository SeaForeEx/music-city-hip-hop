/* eslint-disable @next/next/no-img-element */ // Disable eslint rule for img tags
import React, { useEffect, useState } from 'react'; // Import React, useEffect, and useState hooks
import Head from 'next/head'; // Import Head component from Next.js
import { useRouter } from 'next/router'; // Import useRouter hook from Next.js
import { Button } from 'react-bootstrap'; // Import Button component from React Bootstrap library
import LinkCard from '../../components/LinkCard'; // Import custom LinkCard component
import EventCard from '../../components/EventCard'; // Import custom EventCard component
import FollowCard from '../../components/FollowCard'; // Import custom FollowCard component
import { getUserByFBKey, getAllUsers } from '../../api/userData'; // Import API functions for retrieving user data
import { viewUserDetails, getUserFollows } from '../../api/mergedData'; // Import API functions for retrieving merged data
import { // Import API functions for managing user follow relationships
  getFollowsByFBKey,
  createFollow,
  updateFollow,
  deleteSingleFollow,
} from '../../api/followData';
import { useAuth } from '../../utils/context/authContext'; // Import useAuth hook for accessing user authentication data

// Define a component called ViewUser
export default function ViewUser() {
  // Define state variables for userLinks and setUserLinks, and initialize it to an empty array
  const [userLinks, setUserLinks] = useState([]);

  // Define state variables for userEvents and setUserEvents, and initialize it to an empty array
  const [userEvents, setUserEvents] = useState([]);

  // Define a variable called router and initialize it with the useRouter hook
  const router = useRouter(); // useRouter is next.js

  // Define a variable called userFirebaseKey and initialize it with the value of router.query.userFirebaseKey
  const { userFirebaseKey } = router.query;

  // Define a variable called user and initialize it with the value of the useAuth hook
  const { user } = useAuth();

  // SET THE PROFILE OWNER - THE USER WHOSE PROFILE IS BEING VIEWED
  // Define a state variable for profileOwner and initialize it to an empty object
  const [profileOwner, setProfileOwner] = useState({});
  // Define a function called getProfileOwner
  const getProfileOwner = () => {
  // Call the getUserByFBKey function with the userFirebaseKey variable as an argument and set the profileOwner state variable to the result of the function call
    getUserByFBKey(userFirebaseKey).then(setProfileOwner);
  };

  // Call the getProfileOwner function whenever the userFirebaseKey value changes
  useEffect(() => {
    getProfileOwner();
  }, [userFirebaseKey]);

  // SET THE PROFILE VIEWER - THE USER VIEWING ANOTHER USER'S PROFILE
  // Define a state variable for profileViewer and initialize it to an empty object
  const [profileViewer, setProfileViewer] = useState({});

  // Define a function called getProfileViewer
  const getProfileViewer = () => {
    // Call the getAllUsers function and get an array of all users
    getAllUsers().then((userArray) => {
      // Find the appUser object in the userArray with a uid value equal to the uid value of the currently authenticated user and set the profileViewer state variable to the appUser object
      const appUser = userArray.find((userObj) => userObj.uid === user.uid);
      setProfileViewer(appUser);
    });
  };

  // Call the getProfileViewer function whenever the user value changes
  useEffect(() => {
    getProfileViewer();
  }, [user]);

  // GET ALL THE OTHER USERS THE USER FOLLOWS
  // Define a state variable for follows and initialize it to an empty array
  const [follows, setFollows] = useState([]);

  // Define a function called getAllFollows
  const getAllFollows = () => {
    // Call the getUserFollows function with the userFirebaseKey variable as an argument and set the follows state variable to the result of the function call
    getUserFollows(userFirebaseKey).then(setFollows);
  };

  // Call the getAllFollows function whenever the userFirebaseKey value changes
  useEffect(() => {
    getAllFollows();
  }, [userFirebaseKey]);

  // CHECK IF PROFILE VIEWER FOLLOWS PROFILE OWNER
  // This line declares a state variable called 'userRelationship' and a function called 'setUserRelationship'
  // that is used to update the 'userRelationship' state.
  const [userRelationship, setUserRelationship] = useState(false);

  // This function fetches the follow relationships between two users from the backend and updates the 'userRelationship'
  // state based on whether the current user follows the profile owner or not.
  const getUserRelationship = () => {
  // This function 'getFollowsByFBKey' fetches all follow relationships for a given user from the backend and returns a Promise.
  // The 'then' function is used to handle the returned value from the Promise.
    getFollowsByFBKey(profileViewer.firebaseKey).then((followRelationships) => {
    // This line filters the returned follow relationships array and finds the follow relationship where the 'receiverId' property
    // matches the profile owner's Firebase key and the 'followerId' property matches the profile viewer's Firebase key.
      const userFollowRelationship = followRelationships.find((relationship) => relationship.receiverId === profileOwner.firebaseKey && relationship.followerId === profileViewer.firebaseKey);
      // This line checks if a follow relationship was found, and if so, updates the 'userRelationship' state to true.
      // Otherwise, it sets the 'userRelationship' state to false.
      if (userFollowRelationship) setUserRelationship(true);
      else setUserRelationship(false);
    });
  };

  // This useEffect hook calls the 'getUserRelationship' function whenever the 'profileOwner' or 'profileViewer' state variables change.
  useEffect(() => {
    getUserRelationship();
  }, [profileOwner, profileViewer]);

  /*
In summary, this code declares a state variable for storing the relationship between two users, and a function that fetches this relationship from the backend and updates the state variable accordingly. The function is called using an useEffect hook, which is triggered whenever the state variables representing the users change.
  */

  // CLICK EVENT FOR FOLLOWING A USER
  const followUser = () => {
    // create a payload object that contains the follower ID and the receiver ID
    const payload = {
      followerId: profileViewer.firebaseKey,
      receiverId: profileOwner.firebaseKey,
    };

    // call createFollow function and pass the payload as an argument
    createFollow(payload).then(({ name }) => {
      // if the creation of the follow is successful, get the firebase key of the follow relationship
      const patchPayload = { firebaseKey: name };

      // call updateFollow function and pass the patchPayload as an argument
      updateFollow(patchPayload).then(getUserRelationship);
      // then call getUserRelationship function to update the user relationship state with the latest status
    });
  };

  /*
In summary, this function is responsible for creating a follow relationship between the current user and the viewed user by calling the createFollow function and passing a payload object that contains the IDs of the current user and the viewed user. If the creation of the follow relationship is successful, the function then gets the firebase key of the follow relationship and calls the updateFollow function with a patchPayload object that contains the firebase key. Finally, the function calls getUserRelationship to update the user relationship state with the latest status.
  */

  // CLICK EVENT FOR UNFOLLOWING A USER
  const unfollowUser = () => {
    // Retrieve the follows from the database based on the profileViewer's firebase key
    getFollowsByFBKey(profileViewer.firebaseKey).then((followRelationships) => {
      // Find the specific follow relationship where the receiver is the profile owner and the follower is the profile viewer
      const userFollowRelationship = followRelationships.find((relationship) => relationship.receiverId === profileOwner.firebaseKey && relationship.followerId === profileViewer.firebaseKey);
      // Delete the follow from the database by passing the specific follow relationship's firebase key
      deleteSingleFollow(userFollowRelationship.firebaseKey);
    }).then(getUserRelationship); // Once the follow is deleted, update the user relationship by calling getUserRelationship
  };

  /*
This function retrieves the follows from the database based on the profileViewer's firebase key. It then finds the specific follow relationship where the receiver is the profile owner and the follower is the profile viewer. It then deletes the follow from the database by passing the specific follow relationship's firebase key to deleteSingleFollow(). Finally, it updates the user relationship by calling getUserRelationship() after the follow is deleted.
  */

  // Define function onlyBuiltForUserLinks
  const onlyBuiltForUserLinks = () => {
  // Call getUserByFBKey function with the userFirebaseKey as parameter
    getUserByFBKey(userFirebaseKey).then((uzer) => {
    // Once the user is retrieved, call viewUserDetails function with user's uid as parameter to retrieve user's links
      viewUserDetails(uzer.uid).then((links) => {
      // Set the retrieved links as the state of the component
        setUserLinks(links);
      });
    });
  };

  // Define function onlyBuiltForUserEvents
  const onlyBuiltForUserEvents = () => {
  // Call getUserByFBKey function with the userFirebaseKey as parameter
    getUserByFBKey(userFirebaseKey).then((uzer) => {
    // Once the user is retrieved, call viewUserDetails function with user's uid as parameter to retrieve user's events
      viewUserDetails(uzer.uid).then((events) => {
      // Set the retrieved events as the state of the component
        setUserEvents(events);
      });
    });
  };

  // Use the useEffect hook to call the onlyBuiltForUserLinks and onlyBuiltForUserEvents functions whenever userFirebaseKey changes
  useEffect(() => {
    onlyBuiltForUserLinks();
    onlyBuiltForUserEvents();
  }, [userFirebaseKey]);

  /*
This code defines two functions, onlyBuiltForUserLinks and onlyBuiltForUserEvents, and uses the useEffect hook to call them whenever the userFirebaseKey variable changes.

Both functions use the getUserByFBKey function to retrieve user data based on the userFirebaseKey, and then call the viewUserDetails function with the retrieved user's uid to retrieve either the user's links or events.

Finally, the retrieved data is set as the state of the component using the setUserLinks and setUserEvents functions.
  */

  return (
    <>
      {/* The Head component is a built-in Next.js component for setting the page's title */}
      <Head>
        <title>{userLinks.name}</title>
      </Head>
      {/* The section element is used for grouping related content in a document */}
      <section
        className="userHeader textStyle"
        style={{
          display: 'flex',
          alignItems: 'center',
          marginTop: '16px',
        }}
      >
        {/* The div element contains the user's profile picture */}
        <div
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            marginRight: '32px',
          }}
        >
          <img
            src={userLinks.image}
            width="250px"
            height="250px"
            alt={userLinks.image}
            style={{ borderRadius: '50%' }}
          />
        </div>
        {/* The div element contains the user's name, bio, and follow/unfollow button */}
        <div>
          <h2>{userLinks.name}</h2>
          <p>{userLinks.bio}</p>
          {/* If the user already follows the profile owner, show an unfollow button */}
          {userRelationship === true && profileOwner.firebaseKey !== profileViewer.firebaseKey ? (
            <Button variant="outline-light" className="m-2 whiteButton" onClick={unfollowUser}>
              Unfollow
            </Button>
          ) : ''}
          {/* If the user does not follow the profile owner, show a follow button */}
          {userRelationship === false && profileOwner.firebaseKey !== profileViewer.firebaseKey ? (
            <Button variant="outline-dark" className="m-2 whiteButton" onClick={followUser}>
              Follow
            </Button>
          ) : ''}
        </div>
      </section>
      {/* The div element contains the user's links and events */}
      <div style={{ display: 'flex' }}>
        {/* The section element is used for grouping related content in a document */}
        <section style={{ flex: '1' }}>
          {/* If the user is an artist, show their links and events */}
          {userLinks.isArtist && (
          <div className="linkeventBackground">
            <div>
              <h2 style={{ marginTop: '1%', marginLeft: '1%' }}>LINKS</h2>
              {/* Map through the user's links and display them */}
              {userLinks.links?.map((link) => (
                <LinkCard key={link.firebaseKey} linkObj={link} onUpdate={onlyBuiltForUserLinks} />
              ))}
            </div>
            <div style={{ marginTop: '1%' }}>
              <h2 style={{ marginTop: '1%', marginLeft: '1%' }}>EVENTS</h2>
              {/* Map through the user's events and display them */}
              {userEvents.events?.map((event) => (
                <EventCard key={event.firebaseKey} eventObj={event} onUpdate={onlyBuiltForUserEvents} />
              ))}
            </div>
          </div>
          )}
        </section>
        {/* The aside element is used for content that is only indirectly related to the main content */}
        <aside className="followBackground" style={{ flex: '1', display: 'flex', flexDirection: 'column' }}>
          <h2>FOLLOWS</h2>
          <div>
            {/* Map through all follows and display them */}
            {follows.map((follow) => (
              <FollowCard key={follow.firebaseKey} followObj={follow} onUpdate={getAllFollows} appUser={profileOwner} />
            ))}
          </div>
        </aside>
      </div>
    </>
  );
}
