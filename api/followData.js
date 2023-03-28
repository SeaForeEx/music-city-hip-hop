import { clientCredentials } from '../utils/client';

// Get the endpoint for the Firebase Realtime Database using the client credentials
const endpoint = clientCredentials.databaseURL;

// Retrieve all the follows for a given user (by their Firebase key)
const getFollowsByFBKey = (firebaseKey) => new Promise((resolve, reject) => {
  // Send a GET request to the Firebase Realtime Database
  fetch(`${endpoint}/follows.json?orderBy="followerId"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    // If the response is successful, parse the JSON data and resolve the promise with the data (as an array)
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    // If there is an error, reject the promise with the error
    .catch(reject);
});

// Retrieve all the users who follow a given user (by their Firebase key)
const getFollowsByReceiverId = (firebaseKey) => new Promise((resolve, reject) => {
  // Send a GET request to the Firebase Realtime Database
  fetch(`${endpoint}/follows.json?orderBy="receiverId"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    // If the response is successful, parse the JSON data and resolve the promise with the data (as an array)
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    // If there is an error, reject the promise with the error
    .catch(reject);
});

// Retrieve all the users that a given user follows (by their Firebase key)
const getFollowsByFollowerId = (firebaseKey) => new Promise((resolve, reject) => {
  // Send a GET request to the Firebase Realtime Database
  fetch(`${endpoint}/follows.json?orderBy="followerId"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    // If the response is successful, parse the JSON data and resolve the promise with the data (as an array)
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    // If there is an error, reject the promise with the error
    .catch(reject);
});

// Create a new follow
const createFollow = (payload) => new Promise((resolve, reject) => {
  // Send a POST request to the Firebase Realtime Database with the follow data in the request body
  fetch(`${endpoint}/follows.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    // If the response is successful, parse the JSON data and resolve the promise with the data
    .then((response) => response.json())
    .then((data) => resolve(data))
    // If there is an error, reject the promise with the error
    .catch(reject);
});

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

// Deletes a single follow from the database given a firebaseKey
const deleteSingleFollow = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/follows/${firebaseKey}.json`, { // send a DELETE request to the endpoint with the firebaseKey parameter included in the url
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json()) // parse the response from json
    .then((data) => resolve(data)) // resolve the promise with the parsed data
    .catch(reject); // catch any errors and reject the promise
});

// Updates a follow in the database given a payload
const updateFollow = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/follows/${payload.firebaseKey}.json`, { // send a PATCH request to the endpoint with the firebaseKey of the follow to update included in the url
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload), // the body of the request is the updated follow object in json format
  })
    .then((response) => response.json()) // parse the response from json
    .then(resolve) // resolve the promise with the parsed data
    .catch(reject); // catch any errors and reject the promise
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
