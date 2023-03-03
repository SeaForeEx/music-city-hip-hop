import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const createEvent = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/events.json`, {
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

const getEvent = (artistId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/events.json?orderBy="artistId"&equalTo="${artistId}"`, {
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

const getSingleEvent = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/events/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateEvent = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/events/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application.json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deleteEvent = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/events/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application.json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  createEvent,
  getEvent,
  getSingleEvent,
  updateEvent,
  deleteEvent,
};
