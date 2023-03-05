import { getUser, getUserLinks, getUserEvents } from './userData';

const viewUserDetails = (uid) => new Promise((resolve, reject) => {
  Promise.all([getUser(uid), getUserLinks(uid), getUserEvents(uid)])
    .then(([userObject, userLinksArray, userEventsArray]) => {
      resolve({ ...userObject, links: userLinksArray, events: userEventsArray });
    }).catch((error) => reject(error));
});

export default viewUserDetails;
