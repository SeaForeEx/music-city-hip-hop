import firebase from 'firebase/app'; // Imports the firebase/app module, which provides access to the Firebase SDK and core Firebase services.
import 'firebase/auth'; // Imports the firebase/auth module, which provides authentication services for Firebase.
import 'firebase/database'; // Imports the firebase/database module, which provides access to the Firebase Realtime Database service.
import 'firebase/storage'; // Imports the firebase/storage module, which provides access to the Firebase Cloud Storage service.

const clientCredentials = { // Defines an object containing the client's Firebase credentials. These credentials are used to authenticate with the Firebase services.
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY, // The API key for the Firebase project.
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN, // The authentication domain for the Firebase project.
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID, // The ID of the Firebase project.
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET, // The storage bucket for the Firebase project.
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID, // The messaging sender ID for the Firebase project.
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID, // The app ID for the Firebase project.
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL, // The URL for the Firebase Realtime Database service.
};

if (!firebase.apps.length) { // Checks if the Firebase app has already been initialized.
  firebase?.initializeApp(clientCredentials); // Initializes the Firebase app with the client's credentials. The optional chaining operator (?.) is used to prevent errors in case the firebase variable is undefined or null.
}

const storage = firebase.storage(); // Creates a reference to the Firebase Cloud Storage service.

export { firebase, clientCredentials, storage }; // Exports the firebase, clientCredentials, and storage variables so that they can be used in other modules.
