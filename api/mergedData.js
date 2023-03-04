import { getUser, getUserLinks } from './userData';

// const viewUserDetails = (userFirebaseKey) => new Promise((resolve, reject) => {
//   getSingleUser(userFirebaseKey)
//     .then((userObject) => {
//       resolve({ ...userObject });
//     }).catch((error) => reject(error));
// });

const viewUserLinks = (uid) => new Promise((resolve, reject) => {
  Promise.all([getUser(uid), getUserLinks(uid)])
    .then(([userObject, userLinksArray]) => {
      resolve({ ...userObject, links: userLinksArray });
    }).catch((error) => reject(error));
});

export default viewUserLinks;
