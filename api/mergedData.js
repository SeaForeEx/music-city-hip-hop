import {
  getUserByFBKey, getUser, getUserLinks, getUserEvents, deleteUser,
} from './userData';
import { deleteLink } from './linkData';
import { deleteEvent } from './eventData';
import { deleteSingleFollow, getFollowsByFBKey, getFollowsByFollowerId } from './followData';

const getUserFollows = (firebaseKey) => new Promise((resolve, reject) => {
  getFollowsByFBKey(firebaseKey).then((followArray) => {
    const userFollowsArray = followArray.map((follow) => getUserByFBKey(follow.receiverId));
    return Promise.all(userFollowsArray); // return the Promise.all() call
  }).then((userObjects) => {
    resolve(userObjects); // resolve with the array of user objects
  }).catch(reject);
});

const viewUserDetails = (uid, followerId) => new Promise((resolve, reject) => {
  Promise.all([getUser(uid), getUserLinks(uid), getUserEvents(uid), getFollowsByFollowerId(followerId)])
    .then(([userObject, userLinksArray, userEventsArray, userFollowsArray]) => {
      resolve({
        ...userObject, links: userLinksArray, events: userEventsArray, follows: userFollowsArray,
      });
    }).catch((error) => reject(error));
});

const deleteUserLinksAndEvents = (artistId, userFirebaseKey, firebaseKey) => new Promise((resolve, reject) => {
  getUserLinks(artistId)
    .then((linksArray) => {
      const deleteLinkPromises = linksArray.map((link) => deleteLink(link.firebaseKey));
      return Promise.all(deleteLinkPromises);
    })
    .then(() => getUserEvents(artistId))
    .then((eventsArray) => {
      const deleteEventPromises = eventsArray.map((event) => deleteEvent(event.firebaseKey));
      return Promise.all(deleteEventPromises);
    })
    .then(() => getUserFollows(firebaseKey))
    .then((followsArray) => {
      const deleteFollowPromises = followsArray.map((follow) => deleteSingleFollow(follow.firebaseKey));
      return Promise.all(deleteFollowPromises);
    })
    .then(() => deleteUser(userFirebaseKey))
    .then(resolve)
    .catch((error) => reject(error));
});

// const deleteUserLinksAndEvents = (artistId, userFirebaseKey, firebaseKey) => new Promise((resolve, reject) => {
//   getUserLinks(artistId)
//     .then((linksArray) => {
//       const deleteLinkPromises = linksArray.map((link) => deleteLink(link.firebaseKey));

//       return Promise.all(deleteLinkPromises);
//     })
//     .then(() => getUserEvents(artistId))
//     .then((eventsArray) => {
//       const deleteEventPromises = eventsArray.map((event) => deleteEvent(event.firebaseKey));

//       return Promise.all(deleteEventPromises);
//     })
//     .then(() => getUserFollows(firebaseKey))
//     .then((followsArray) => {
//       const deleteFollowPromises = followsArray.map((follow) => deleteSingleFollow(follow.firebaseKey));

//       return Promise.all(deleteFollowPromises);
//     })
//     .then(() => deleteUser(userFirebaseKey))
//     .then(resolve)
//     .catch((error) => reject(error));
// });

export { viewUserDetails, deleteUserLinksAndEvents, getUserFollows };
