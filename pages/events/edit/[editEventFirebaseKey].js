import { useRouter } from 'next/router'; // importing the useRouter hook from the Next.js library
import { useEffect, useState } from 'react'; // importing the useEffect and useState hooks from the React library
import { getSingleEvent } from '../../../api/eventData'; // importing the getSingleEvent function from an external file
import EventForm from '../../../components/forms/EventForm'; // importing the EventForm component from an external file

export default function EditEvent() { // defining a default function called EditEvent
  const [editItem, setEditItem] = useState({}); // declaring a state variable called editItem and a function to update it called setEditItem. It's initialized as an empty object.
  const router = useRouter(); // declaring a constant called router which gets the useRouter hook from Next.js library
  const { editEventFirebaseKey } = router.query; // declaring a constant called editEventFirebaseKey which gets the value of the editEventFirebaseKey from the router object

  useEffect(() => { // using the useEffect hook to execute the following code when the component mounts or editEventFirebaseKey changes
    getSingleEvent(editEventFirebaseKey).then(setEditItem); // calling the getSingleEvent function with editEventFirebaseKey as an argument, and setting the returned data to the editItem state variable
  }, [editEventFirebaseKey]); // specifying that useEffect should only re-run when editEventFirebaseKey changes

  return (<EventForm obj={editItem} />); // rendering the EventForm component and passing the editItem object as a prop called obj
}
