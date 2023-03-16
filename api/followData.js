import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET ALL FOLLOWS
const getFollowsByFBKey = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/follows.json?orderBy="followerId"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getFollowsByReceiverId = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/follows.json?orderBy="receiverId"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    }).catch(reject);
});

const getFollowsByFollowerId = (followerId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/follows.json?orderBy="followerId"&equalTo="${followerId}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    }).catch(reject);
});

// CREATE FOLLOW
const createFollow = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/follows.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
// GET SINGLE FOLLOW
const getSingleFollow = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/follows/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// DELETE SINGLE FOLLOW
const deleteSingleFollow = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/follows/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});
// UPDATE FOLLOW
const updateFollow = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/follows/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  getFollowsByFBKey,
  getFollowsByReceiverId,
  getFollowsByFollowerId,
  getSingleFollow,
  deleteSingleFollow,
  updateFollow,
  createFollow,
};
