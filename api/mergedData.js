import {
  getUser, getUserLinks, getUserEvents, deleteUser,
} from './userData';
import { deleteLink } from './linkData';
import { deleteEvent } from './eventData';

const viewUserDetails = (uid) => new Promise((resolve, reject) => {
  Promise.all([getUser(uid), getUserLinks(uid), getUserEvents(uid)])
    .then(([userObject, userLinksArray, userEventsArray]) => {
      resolve({ ...userObject, links: userLinksArray, events: userEventsArray });
    }).catch((error) => reject(error));
});

const deleteUserDetails = (uid) => {
  const userLinksPromise = getUserLinks(uid).then((links) => {
    // Delete all user links
    const deletePromises = links.map((link) => deleteLink(link.id));
    return Promise.all(deletePromises);
  });

  const userEventsPromise = getUserEvents(uid).then((events) => {
    // Delete all user events
    const deletePromises = events.map((event) => deleteEvent(event.firebaseKey));
    return Promise.all(deletePromises);
  });

  // Delete both user links and user events
  return Promise.all([userLinksPromise, userEventsPromise]);
};

// const deleteUserLinks = (artistId) => new Promise((resolve, reject) => {
//   getUserLinks(artistId).then((linksArray) => {
//     const deleteLinkPromises = linksArray.map((link) => deleteLink(link.firebaseKey));

//     Promise.all(deleteLinkPromises).then(() => {
//       deleteUser(artistId).then(resolve);
//     });
//   }).catch((error) => reject(error));
// });

// const deleteUserEvents = (artistId) => new Promise((resolve, reject) => {
//   getUserEvents(artistId).then((eventsArray) => {
//     const deleteEventPromises = eventsArray.map((event) => deleteEvent(event.firebaseKey));

//     Promise.all(deleteEventPromises).then(() => {
//       deleteUser(artistId).then(resolve);
//     });
//   }).catch((error) => reject(error));
// });

// export { viewUserDetails, deleteUserLinks, deleteUserEvents };

export { viewUserDetails, deleteUserDetails };
