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

const deleteUserLinksAndEvents = (artistId, userFirebaseKey) => new Promise((resolve, reject) => {
  getUserLinks(artistId).then((linksArray) => {
    const deleteLinkPromises = linksArray.map((link) => deleteLink(link.firebaseKey));

    Promise.all(deleteLinkPromises)
      .then(() => {
        getUserEvents(artistId).then((eventsArray) => {
          const deleteEventPromises = eventsArray.map((event) => deleteEvent(event.firebaseKey));

          Promise.all(deleteEventPromises);
        });
      })

      .then(() => {
        deleteUser(userFirebaseKey).then(resolve);
      });
  }).catch((error) => reject(error));
});

export { viewUserDetails, deleteUserLinksAndEvents };
