import { useRouter } from 'next/router'; // import useRouter hook from Next.js
import { useEffect, useState } from 'react'; // import useEffect and useState hooks from React
import { getSingleLink } from '../../../api/linkData'; // import getSingleLink function from linkData API file
import LinkForm from '../../../components/forms/LinkForm'; // import LinkForm component

export default function EditLink() {
  const [editItem, setEditItem] = useState({}); // set up a state variable for the link item being edited
  const router = useRouter(); // initialize the useRouter hook
  const { editLinkFirebaseKey } = router.query; // retrieve the firebase key of the link to edit from the query string in the router object

  useEffect(() => { // set up a side effect to fetch the data for the link to edit
    getSingleLink(editLinkFirebaseKey) // call the getSingleLink function with the firebase key
      .then((item) => {
        const newItem = { ...item, date: new Date(item.date) }; // create a new object with the link data and convert the date string to a Date object
        setEditItem(newItem); // set the state variable with the new object
      });
  }, [editLinkFirebaseKey]); // run the effect only when the editLinkFirebaseKey changes

  return (<LinkForm obj={editItem} />); // render the LinkForm component with the link item being edited passed in as props
}
