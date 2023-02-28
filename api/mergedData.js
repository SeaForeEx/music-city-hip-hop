import { getSingleUser } from './userData';

const viewUserDetails = (userFirebaseKey) => new Promise((resolve, reject) => {
  getSingleUser(userFirebaseKey)
    .then((userObject) => {
      resolve({ ...userObject });
    }).catch((error) => reject(error));
});

export default viewUserDetails;
