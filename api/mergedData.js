// Import functions from other modules
import {
  getUserByFBKey, getUser, getUserLinks, getUserEvents, deleteUser,
} from './userData';
import { deleteLink } from './linkData';
import { deleteEvent } from './eventData';
import {
  deleteSingleFollow, getFollowsByFBKey, getFollowsByFollowerId, getFollowsByReceiverId,
} from './followData';

// Define a function that gets a list of users that the given user is following
const getUserFollows = (firebaseKey) => new Promise((resolve, reject) => {
  // Get the list of follows for the given user
  getFollowsByFBKey(firebaseKey).then((followArray) => {
    // For each follow in the list, get the user object for the user being followed
    const userFollowsArray = followArray.map((follow) => getUserByFBKey(follow.receiverId));
    // Wait for all the user object promises to resolve before returning the array
    return Promise.all(userFollowsArray);
  }).then((userObjects) => {
    // Resolve with the array of user objects
    resolve(userObjects);
  }).catch(reject);
});

// Define a function that gets details for a user, including their links, events, and follows
const viewUserDetails = (uid, followerId) => new Promise((resolve, reject) => {
  // Get the user object, links, events, and follows for the given user and follower
  Promise.all([getUser(uid), getUserLinks(uid), getUserEvents(uid), getFollowsByFollowerId(followerId)])
    .then(([userObject, userLinksArray, userEventsArray, userFollowsArray]) => {
      // Return an object with all the user's details
      resolve({
        ...userObject, links: userLinksArray, events: userEventsArray, follows: userFollowsArray,
      });
    }).catch((error) => reject(error));
});

const deleteUserLinksAndEvents = (userFirebaseKey, uid) => new Promise((resolve, reject) => {
  // Get the user's links based on their UID
  getUserLinks(uid)
    .then((linksArray) => {
      // Create an array of promises to delete each link, based on its Firebase key
      const deleteLinkPromises = linksArray.map((link) => deleteLink(link.firebaseKey));
      // Use Promise.all to wait for all of the link deletion promises to resolve
      return Promise.all(deleteLinkPromises);
    })
    // Once all links have been deleted, move on to deleting the user's events
    .then(() => getUserEvents(uid))
    .then((eventsArray) => {
      // Create an array of promises to delete each event, based on its Firebase key
      const deleteEventPromises = eventsArray.map((event) => deleteEvent(event.firebaseKey));
      // Use Promise.all to wait for all of the event deletion promises to resolve
      return Promise.all(deleteEventPromises);
    })
    // Once all events have been deleted, move on to deleting the user's follows (as either the follower or receiver)
    .then(() => getFollowsByFBKey(userFirebaseKey))
    .then((followsArray) => {
      // Create an array of promises to delete each follow, based on its Firebase key
      const deleteFollowPromises = followsArray.map((follow) => deleteSingleFollow(follow.firebaseKey));
      // Use Promise.all to wait for all of the follow deletion promises to resolve
      return Promise.all(deleteFollowPromises);
    })
    // Then, also delete all follows where the user was the receiver
    .then(() => getFollowsByReceiverId(userFirebaseKey))
    .then((followsArray) => {
      // Create an array of promises to delete each follow, based on its Firebase key
      const deleteFollowPromises = followsArray.map((follow) => deleteSingleFollow(follow.firebaseKey));
      // Use Promise.all to wait for all of the follow deletion promises to resolve
      return Promise.all(deleteFollowPromises);
    })
    // Finally, delete the user based on their Firebase key
    .then(() => deleteUser(userFirebaseKey))
    .then(resolve)
    .catch((error) => reject(error));
});

/*
The function takes in two arguments, userFirebaseKey and uid, which are used to identify the user to delete and their associated data. It returns a promise that resolves when all of the user's links, events, and follows have been deleted, and the user themselves have been deleted.

The function uses a series of then() methods to chain together promises that delete the user's data in the following order:

1. Get the user's links based on their UID
2. Create an array of promises to delete each link, based on its Firebase key
3. Use Promise.all to wait for all of the link deletion promises to resolve
4. Once all links have been deleted, move on to deleting the user's events
5. Create an array of promises to delete each event, based on its Firebase key
6. Use Promise.all to wait for all of the event deletion promises to resolve
7. Once all events have been deleted, move on to deleting the user's follows (as either the follower or receiver)
8. Create an array of promises to delete each follow, based on its Firebase key
9. Use Promise.all to wait for all of the follow deletion promises to resolve
10. Also delete all follows where the user was the receiver
11. Finally, delete
*/

export { viewUserDetails, deleteUserLinksAndEvents, getUserFollows };
