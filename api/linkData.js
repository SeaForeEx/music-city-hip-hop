import { clientCredentials } from '../utils/client';

// Set the endpoint to the Firebase Realtime Database URL from client credentials
const endpoint = clientCredentials.databaseURL;

// Define a function to create a new link in the database using the provided payload
const createLink = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/links.json`, {
    method: 'POST', // Use the HTTP POST method
    headers: {
      'Content-Type': 'application/json', // Set the content type to JSON
    },
    body: JSON.stringify(payload), // Send the payload as a JSON string in the request body
  })
    .then((response) => response.json()) // Parse the response JSON
    .then((data) => resolve(data)) // Resolve the promise with the parsed data
    .catch(reject); // Reject the promise with the error
});

// Define a function to get all links for a given artist ID from the database
const getLink = (artistId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/links.json?orderBy="artistId"&equalTo="${artistId}"`, {
    method: 'GET', // Use the HTTP GET method
    headers: {
      'Content-Type': 'application/json', // Set the content type to JSON
    },
  })
    .then((response) => response.json()) // Parse the response JSON
    .then((data) => {
      if (data) {
        resolve(Object.values(data)); // If there is data, resolve the promise with the parsed data as an array
      } else {
        resolve([]); // If there is no data, resolve the promise with an empty array
      }
    }).catch(reject); // Reject the promise with the error
});

// Define a function to get a single link with the provided Firebase key from the database
const getSingleLink = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/links/${firebaseKey}.json`, {
    method: 'GET', // Use the HTTP GET method
    headers: {
      'Content-Type': 'application/json', // Set the content type to JSON
    },
  })
    .then((response) => response.json()) // Parse the response JSON
    .then((data) => resolve(data)) // Resolve the promise with the parsed data
    .catch(reject); // Reject the promise with the error
});

// Define a function to update a link in the database using the provided payload
const updateLink = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/links/${payload.firebaseKey}.json`, {
    method: 'PATCH', // Use the HTTP PATCH method
    headers: {
      'Content-Type': 'application.json', // Set the content type to JSON
    },
    body: JSON.stringify(payload), // Send the payload as a JSON string in the request body
  })
    .then((response) => response.json()) // Parse the response JSON
    .then(resolve) // Resolve the promise with no arguments
    .catch(reject); // Reject the promise with the error
});

// This function deletes a link with the specified firebaseKey
const deleteLink = (firebaseKey) => new Promise((resolve, reject) => {
  // Make a DELETE request to the Firebase Realtime Database using the fetch API and the specified firebaseKey
  fetch(`${endpoint}/links/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application.json',
    },
  })
    // Parse the response as JSON
    .then((response) => response.json())
    // If the request is successful, resolve the promise with the returned data
    .then((data) => resolve(data))
    // If the request fails, reject the promise with the error
    .catch(reject);
});

export {
  createLink,
  getLink,
  getSingleLink,
  updateLink,
  deleteLink,
};
