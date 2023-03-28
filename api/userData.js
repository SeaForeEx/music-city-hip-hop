// import clientCredentials from utils/client.js file
import { clientCredentials } from '../utils/client';

// set endpoint variable to the database URL from clientCredentials
const endpoint = clientCredentials.databaseURL;

// create a function called createUser that takes in a payload and returns a promise
const createUser = (payload) => new Promise((resolve, reject) => {
  // use fetch to send a POST request to the /users endpoint of the database with the payload as the body
  fetch(`${endpoint}/users.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    // convert the response to JSON and resolve the data
    .then((response) => response.json())
    .then((data) => resolve(data))
    // catch any errors and reject the promise
    .catch(reject);
});

// create a function called getArtist that takes no arguments and returns a promise
const getArtist = () => new Promise((resolve, reject) => {
  // use fetch to send a GET request to the /users endpoint of the database with the orderBy and equalTo parameters set to only return users where the isArtist property is true
  fetch(`${endpoint}/users.json?orderBy="isArtist"&equalTo=true`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    // convert the response to JSON and resolve the data as an array
    .then((response) => response.json())
    .then((data) => {
      // check if data exists
      if (data) {
        // if it does, resolve the values of the data as an array and log the data to the console
        resolve(Object.values(data)).then(console.warn(data));
      } else {
        // if it doesn't, resolve an empty array
        resolve([]);
      }
    }).catch(reject);
});

// create a function called getFans that takes no arguments and returns a promise
const getFans = () => new Promise((resolve, reject) => {
  // use fetch to send a GET request to the /users endpoint of the database with the orderBy and equalTo parameters set to only return users where the isArtist property is false
  fetch(`${endpoint}/users.json?orderBy="isArtist"&equalTo=false`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    // convert the response to JSON and resolve the data as an array
    .then((response) => response.json())
    .then((data) => {
      // check if data exists
      if (data) {
        // if it does, resolve the values of the data as an array and log the data to the console
        resolve(Object.values(data)).then(console.warn(data));
      } else {
        // if it doesn't, resolve an empty array
        resolve([]);
      }
    }).catch(reject);
});

// Define a function that takes in a `uid` parameter and returns a Promise object that resolves to the user object that matches the `uid` value
const getUser = (uid) => new Promise((resolve, reject) => {
  // Make a GET request to the Firebase Realtime Database to retrieve user data that matches the `uid` value
  fetch(`${endpoint}/users.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    // Parse the response body as JSON
    .then((response) => response.json())
    // If data is found for the given `uid`, resolve the Promise with the first user object found in the data, otherwise resolve with an empty array
    .then((data) => {
      if (data) {
        resolve(Object.values(data)[0]);
      } else {
        resolve([]);
      }
    }).catch(reject);
});

// Define a function that takes in a `uid` parameter and returns a Promise object that resolves to an array of user objects that match the `uid` value
const getUserLogin = (uid) => new Promise((resolve, reject) => {
  // Make a GET request to the Firebase Realtime Database to retrieve user data that matches the `uid` value
  fetch(`${endpoint}/users.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    // Parse the response body as JSON
    .then((response) => response.json())
    // If data is found for the given `uid`, resolve the Promise with an array of user objects found in the data, otherwise resolve with an empty array
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    }).catch(reject);
});

// Define a function that takes in a `firebaseKey` parameter and returns a Promise object that resolves to the user object that matches the `firebaseKey` value
const getUserByFBKey = (firebaseKey) => new Promise((resolve, reject) => {
  // Make a GET request to the Firebase Realtime Database to retrieve user data that matches the `firebaseKey` value
  fetch(`${endpoint}/users/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    // Parse the response body as JSON
    .then((response) => response.json())
    // Resolve the Promise with the user object found in the data
    .then((data) => resolve(data))
    .catch(reject);
});

// Define a function that returns a Promise object that resolves to an array of all user objects in the Firebase Realtime Database
const getAllUsers = () => new Promise((resolve, reject) => {
  // Make a GET request to the Firebase Realtime Database to retrieve all user data
  fetch(`${endpoint}/users.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    // Parse the response body as JSON
    .then((response) => response.json())
    // If data is found in the Firebase Realtime Database, resolve the Promise with an array of user objects found in the data, otherwise resolve with an empty array
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

// Define a function called updateUser that takes in a payload object
// and returns a Promise that resolves with the updated data or rejects
// with an error message.
const updateUser = (payload) => new Promise((resolve, reject) => {
  // Send a PATCH request to the Firebase Realtime Database to update
  // the user data with the given firebaseKey.
  fetch(`${endpoint}/users/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application.json',
    },
    // Set the request body to the payload object, which has been
    // stringified as JSON.
    body: JSON.stringify(payload),
  })
    // If the response is successful, parse the response as JSON.
    .then((response) => response.json())
    // If parsing the JSON is successful, resolve the Promise with the
    // data.
    .then(resolve)
    // If there is an error, reject the Promise with the error message.
    .catch(reject);
});

// Define a function called deleteUser that takes in a firebaseKey string
// and returns a Promise that resolves with the deleted data or rejects
// with an error message.
const deleteUser = (firebaseKey) => new Promise((resolve, reject) => {
  // Send a DELETE request to the Firebase Realtime Database to delete
  // the user data with the given firebaseKey.
  fetch(`${endpoint}/users/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application.json',
    },
  })
    // If the response is successful, parse the response as JSON.
    .then((response) => response.json())
    // If parsing the JSON is successful, resolve the Promise with the
    // data.
    .then((data) => resolve(data))
    // If there is an error, reject the Promise with the error message.
    .catch(reject);
});

// Define a function called getUserLinks that takes in an artistId string
// and returns a Promise that resolves with an array of link data or rejects
// with an error message.
const getUserLinks = (artistId) => new Promise((resolve, reject) => {
  // Send a GET request to the Firebase Realtime Database to retrieve
  // link data that has an artistId that matches the given artistId.
  fetch(`${endpoint}/links.json?orderBy="artistId"&equalTo="${artistId}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    // If the response is successful, parse the response as JSON.
    .then((response) => response.json())
    // If parsing the JSON is successful, resolve the Promise with the
    // data as an array using Object.values.
    .then((data) => resolve(Object.values(data)))
    // If there is an error, reject the Promise with the error message.
    .catch(reject);
});

// This function takes an artistId as input and returns a Promise that will resolve with an array of events for that artist.
const getUserEvents = (artistId) => new Promise((resolve, reject) => {
  // The fetch() method is used to send a GET request to the Firebase Realtime Database. The URL is constructed using the endpoint and the artistId.
  fetch(`${endpoint}/events.json?orderBy="artistId"&equalTo="${artistId}"`, {
    method: 'GET', // This is a GET request, so the method is set to 'GET'.
    headers: {
      'Content-Type': 'application/json', // The Content-Type header is set to 'application/json'.
    },
  })
    .then((response) => response.json()) // The response is converted to JSON.
    .then((data) => resolve(Object.values(data))) // The data is extracted from the response and returned as an array.
    .catch(reject); // If there is an error, the Promise is rejected with the error.
});

export {
  createUser,
  getArtist,
  getFans,
  getUser,
  getUserLogin,
  getUserByFBKey,
  getAllUsers,
  updateUser,
  deleteUser,
  getUserLinks,
  getUserEvents,
};
