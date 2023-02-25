// Context API Docs: https://beta.reactjs.org/learn/passing-data-deeply-with-context

import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import { createUser, getUser } from '../../api/userData';
import { firebase } from '../client';

const AuthContext = createContext();

AuthContext.displayName = 'AuthContext'; // Context object accepts a displayName string property. React DevTools uses this string to determine what to display for the context. https://reactjs.org/docs/context.html#contextdisplayname

const AuthProvider = (props) => {
  const router = useRouter();
  const [user, setUser] = useState(null);

  // there are 3 states for the user:
  // null = application initial state, not yet loaded
  // false = user is not logged in, but the app has loaded
  // an object/value = user is logged in

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (fbUser) => {
      if (fbUser) {
        await getUser(fbUser.uid).then(async (response) => {
          if (!response) {
            const userCreate = {
              uid: fbUser.uid,
            };
            await createUser(userCreate);
            setUser(fbUser);
            router.push('/users/new');
          } else {
            setUser(fbUser);
          }
        });
      } else {
        setUser(false);
      }
    }); // creates a single global listener for auth state changed
  }, [router]);

  // useEffect(() => {
  //   firebase.auth().onAuthStateChanged((fbUser) => {
  //     if (fbUser) {
  //       // check to see if user exists in database
  //       // if true: setUser() with the value that either you got in your response from the API or from Google. As the engineer, it is up to your usecase.
  //       setUser(fbUser);
  //     } else {
  //       setUser(false);
  //     }
  //   }); // creates a single global listener for auth state changed
  // }, []);

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
