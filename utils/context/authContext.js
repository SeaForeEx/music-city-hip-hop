// Context API Docs: https://beta.reactjs.org/learn/passing-data-deeply-with-context

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getUserLogin } from '../../api/userData';
import { firebase } from '../client';

const AuthContext = createContext();

AuthContext.displayName = 'AuthContext'; // Context object accepts a displayName string property. React DevTools uses this string to determine what to display for the context. https://reactjs.org/docs/context.html#contextdisplayname

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const [uid, setUid] = useState('');

  // there are 3 states for the user:
  // null = application initial state, not yet loaded
  // false = user is not logged in, but the app has loaded
  // an object/value = user is logged in

  useEffect(() => { // This is a React hook that is used to run side effects in functional components. It is invoked after the component has mounted.
    firebase.auth().onAuthStateChanged(async (fbUser) => { // This method is provided by the Firebase Auth API and is used to create a listener for changes to the authentication state of the user. It takes a callback function as an argument that is invoked whenever the authentication state changes. The async keyword is used to indicate that the function contains asynchronous code.
      if (fbUser) { // Checks if a Firebase user object exists.
        setUid(fbUser.uid); // Sets the UID of the Firebase user object as the component's state.
        await getUserLogin(fbUser.uid).then(async (response) => { // Invokes the getUserLogin function, which returns information about the user's login. The async keyword is used to indicate that the function contains asynchronous code. The then() method is used to handle the response returned by the getUserLogin function.
          if (Object.keys(response).length === 0) { // Checks if the response object is empty.
            setUser('NO USER'); // If the response object is empty, sets the component's state to 'NO USER'.
          } else {
            setUser(fbUser); // If the response object is not empty, sets the component's state to the Firebase user object.
          }
        });
      } else {
        setUser(false); // If a Firebase user object does not exist, sets the component's state to false.
      }
    }); // Creates a single global listener for auth state changed. The listener invokes the callback function provided to the onAuthStateChanged method whenever the authentication state changes.
  }, []);

  const value = useMemo( // https://reactjs.org/docs/hooks-reference.html#usememo
    () => ({
      user,
      userLoading: user === null,
      uid,
      setUser,
      // as long as user === null, will be true
      // As soon as the user value !== null, value will be false
    }),
    [user, uid],
  );

  return <AuthContext.Provider value={value} {...props} />;
};
const AuthConsumer = AuthContext.Consumer;

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth, AuthConsumer };

/*
The purpose of this code is to create a listener for changes to the authentication state of the user, and to update the component's state accordingly. When a Firebase user object exists, the component's state is set to the user's UID or the user object itself, depending on whether the user is logged in or not. If the user is not logged in, the component's state is set to false. If the response object returned by the getUserLogin function is empty, the component's state is set to 'NO USER'.
*/
