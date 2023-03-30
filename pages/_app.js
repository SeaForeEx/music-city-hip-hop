/* eslint-disable react/prop-types */ // Disable prop-types rule for this file
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { useEffect } from 'react'; // Import useEffect hook from React
import '../styles/globals.css'; // Import custom global CSS
import { AuthProvider } from '../utils/context/authContext'; // Import AuthProvider context
import ViewDirectorBasedOnUserAuthStatus from '../utils/ViewDirector'; // Import ViewDirector component

// MyApp is the top-level component that wraps all other components
function MyApp({ Component, pageProps }) { // Destructure Component and pageProps from props
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap'); // Import Bootstrap JS after component mounts
  }, []);

  return (
    <AuthProvider> {/* Wrap components in AuthProvider context */}
      {/* gives children components access to user and auth methods */}
      <ViewDirectorBasedOnUserAuthStatus
        // if status is pending === loading
        // if status is logged in === view app
        // if status is logged out === sign in page
        // ViewDirector component controls which component to render based on user authentication status
        // Pass down Component and pageProps as props to ViewDirectorBasedOnUserAuthStatus
        // ViewDirectorBasedOnUserAuthStatus will determine which component to render based on the user's authentication status
        component={Component}
        pageProps={pageProps}
      />
    </AuthProvider>
  );
}

export default MyApp;

/* Overall, this code sets up the top-level component (MyApp) to handle authentication and rendering of components based on the user's authentication status. It imports Bootstrap CSS and JS and wraps components in an AuthProvider context for access to user authentication data. It also uses a ViewDirectorBasedOnUserAuthStatus component to determine which component to render based on the user's authentication status. */
