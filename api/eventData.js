// Import clientCredentials object from the '../utils/client' file
import { clientCredentials } from '../utils/client';

// Set endpoint to the databaseURL property of the clientCredentials object
const endpoint = clientCredentials.databaseURL;

// Define createEvent function which takes in a payload object
const createEvent = (payload) => new Promise((resolve, reject) => {
  // Make a POST request to the events endpoint of the database
  fetch(`${endpoint}/events.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json()) // Parse response data to JSON format
    .then((data) => resolve(data)) // Resolve promise with the JSON data
    .catch(reject); // Catch any errors and reject the promise with the error
});

// Define getEvent function which takes in an artistId string
const getEvent = (artistId) => new Promise((resolve, reject) => {
  // Make a GET request to the events endpoint of the database with a query parameter to filter by artistId
  fetch(`${endpoint}/events.json?orderBy="artistId"&equalTo="${artistId}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json()) // Parse response data to JSON format
    .then((data) => {
      if (data) {
        resolve(Object.values(data)); // If data is not null, resolve promise with an array of the data values
      } else {
        resolve([]); // If data is null, resolve promise with an empty array
      }
    }).catch(reject); // Catch any errors and reject the promise with the error
});

// Define getSingleEvent function which takes in a firebaseKey string
const getSingleEvent = (firebaseKey) => new Promise((resolve, reject) => {
  // Make a GET request to the events endpoint of the database with the specified firebaseKey
  fetch(`${endpoint}/events/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json()) // Parse response data to JSON format
    .then((data) => resolve(data)) // Resolve promise with the JSON data
    .catch(reject); // Catch any errors and reject the promise with the error
});

// Define updateEvent function which takes in a payload object
const updateEvent = (payload) => new Promise((resolve, reject) => {
  // Make a PATCH request to the events endpoint of the database with the specified firebaseKey and payload data
  fetch(`${endpoint}/events/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application.json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json()) // Parse response data to JSON format
    .then(resolve) // Resolve promise
    .catch(reject); // Catch any errors and reject the promise with the error
});

// Define a function called deleteEvent that takes a firebaseKey as an argument and returns a Promise.
const deleteEvent = (firebaseKey) => new Promise((resolve, reject) => {
  // Use the fetch API to send a DELETE request to the specified URL with the firebaseKey in the path.
  fetch(`${endpoint}/events/${firebaseKey}.json`, {
    // Set the HTTP method to DELETE.
    method: 'DELETE',
    // Set the Content-Type header to application/json.
    headers: {
      'Content-Type': 'application.json',
    },
  })
    // Parse the response body as JSON.
    .then((response) => response.json())
    // If successful, resolve the Promise with the parsed JSON data.
    .then((data) => resolve(data))
    // If there is an error, reject the Promise with the error.
    .catch(reject);
});

export {
  createEvent,
  getEvent,
  getSingleEvent,
  updateEvent,
  deleteEvent,
};
