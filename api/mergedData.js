import { getUser, getUserLinks } from './userData';

const viewUserDetails = (uid) => new Promise((resolve, reject) => {
  Promise.all([getUser(uid), getUserLinks(uid)])
    .then(([userObject, userLinksArray]) => {
      resolve({ ...userObject, links: userLinksArray });
    }).catch((error) => reject(error));
});

export default viewUserDetails;
