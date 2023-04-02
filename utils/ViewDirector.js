import PropTypes from 'prop-types';
import { useAuth } from './context/authContext';
import UserForm from '../components/forms/UserForm';
import Loading from '../components/Loading';
import Signin from '../components/Signin';
import NavBar from '../components/NavBar';

// This is a higher-order component that determines what view to display based on the user's authentication status
const ViewDirectorBasedOnUserAuthStatus = ({ component: Component, pageProps }) => {
  const { user, userLoading } = useAuth(); // Get the user and userLoading state from the authContext

  // If user state is null, then show loader
  if (userLoading) {
    return <Loading />;
  }

  // If user state is 'NO USER', then show UserForm component
  if (user === 'NO USER') {
    return <UserForm user={user} />;
  }

  // If user state is truthy (logged in), then show NavBar and Component
  if (user) {
    return (
      <>
        <NavBar /> {/* NavBar only visible if user is logged in and is in every view */}
        <div className="container">
          <Component {...pageProps} />
        </div>
      </>
    );
  }

  // If user state is falsy (logged out), then show Signin component
  return <Signin />;
};

export default ViewDirectorBasedOnUserAuthStatus;

// Define the propTypes for the component
ViewDirectorBasedOnUserAuthStatus.propTypes = {
  component: PropTypes.func.isRequired, // The component prop must be a function
  pageProps: PropTypes.oneOfType([PropTypes.object]).isRequired, // The pageProps prop must be an object
};

/*
In summary, the code is a higher-order component that determines what view to display based on the user's authentication status. If the user is logged in, it shows the NavBar and the Component passed in as props. If the user is not logged in, it shows the Signin component. If the user is in the process of logging in, it shows a Loading component.
*/

/*
The UserForm component is shown if the user is logged out but has previously filled out a form on the site. The component uses the useAuth hook from the authContext to get the user's authentication status. Finally, the propTypes are defined to ensure that the props passed to the component are of the correct type.
*/
