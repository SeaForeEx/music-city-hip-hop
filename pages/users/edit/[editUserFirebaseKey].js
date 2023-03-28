import { useRouter } from 'next/router'; // Importing the useRouter hook from the next/router module
import { useEffect, useState } from 'react'; // Importing the useState and useEffect hooks from the react module
import { getUserByFBKey } from '../../../api/userData'; // Importing the getUserByFBKey function from the api/userData.js file
import UserForm from '../../../components/forms/UserForm'; // Importing the UserForm component from the components/forms/UserForm.js file

export default function EditUser() { // Exporting a default function called EditUser
  const [editItem, setEditItem] = useState({}); // Creating a state variable called editItem and initializing it to an empty object
  const router = useRouter(); // Initializing a variable called router with the value of the useRouter hook
  const { editUserFirebaseKey } = router.query; // Destructuring the editUserFirebaseKey from the query object of the router variable

  useEffect(() => { // Initializing a useEffect hook
    getUserByFBKey(editUserFirebaseKey).then(setEditItem); // Calling the getUserByFBKey function with the editUserFirebaseKey value and updating the editItem state variable with the returned value
  }, [editUserFirebaseKey]); // Adding the editUserFirebaseKey value to the array of dependencies for the useEffect hook

  return (<UserForm obj={editItem} />); // Rendering the UserForm component and passing in the editItem state variable as a prop called obj
}
