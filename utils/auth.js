import firebase from 'firebase/app'; // Imports the firebase/app module, which provides access to the Firebase SDK and core Firebase services.
import 'firebase/auth'; // Imports the firebase/auth module, which provides authentication services for Firebase.

const signIn = () => { // Defines a function named signIn that signs in the user with Google authentication.
  const provider = new firebase.auth.GoogleAuthProvider(); // Creates a new instance of the GoogleAuthProvider class from the firebase/auth module.
  firebase.auth().signInWithPopup(provider); // Calls the signInWithPopup method from the firebase/auth module, passing the Google authentication provider as an argument. This method opens a popup window to authenticate the user with Google and returns a Promise that resolves with the user's credentials.
};

const signOut = () => { // Defines a function named signOut that signs out the current user.
  firebase.auth().signOut(); // Calls the signOut method from the firebase/auth module to sign out the current user.
};

export { signIn, signOut }; // Exports the signIn and signOut functions so that they can be used in other modules.
