// Context API Docs: https://beta.reactjs.org/learn/passing-data-deeply-with-context

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import { firebase } from '../client';

const AuthContext = createContext();

AuthContext.displayName = 'AuthContext'; // Context object accepts a displayName string property. React DevTools uses this string to determine what to display for the context. https://reactjs.org/docs/context.html#contextdisplayname

const AuthProvider = (props) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // there are 3 states for the user:
  // null = application initial state, not yet loaded
  // false = user is not logged in, but the app has loaded
  // an object/value = user is logged in

  const checkIfUserExists = async (uid) => {
    const user = await getUser(uid); // will either return a user object or null
    return user;
  };

  useEffect(() => {
    firebase.auth().onAuthStateChanged((fbUser) => {
      if (fbUser) {
        checkIfUserExists(fbUser.uid).then((user) => {
          if (user) {
            setUser(user);
          } else {
            createUser(fbUser).then((newUser) => {
              setUser(newUser);
              if (newUser.firstTimeLogin) {
                router.push('/UserForm.js');
              }
            });
          }
        });
        // check to see if user exists in database
        // if true: setUser() with the value that either you got in your response from the API or from Google. As the engineer, it is up to your usecase.
        // if false: create a new user in the DB and then setUser with the payload
      } else {
        setUser(false);
      }
    }); // creates a single global listener for auth state changed
  }, []);

  const value = useMemo( // https://reactjs.org/docs/hooks-reference.html#usememo
    () => ({
      user,
      userLoading: user === null,
      // as long as user === null, will be true
      // As soon as the user value !== null, value will be false
    }),
    [user],
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
