import React, { useEffect, useState } from 'react'; // import React library and necessary hooks for functional component
import { useRouter } from 'next/router'; // import hook for routing pages
import PropTypes from 'prop-types'; // import library for typechecking
import FloatingLabel from 'react-bootstrap/FloatingLabel'; // import React Bootstrap components
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext'; // import custom hook for authentication context
import { createLink, updateLink } from '../../api/linkData'; // import functions for creating and updating links from API

const initialState = { // define initial state for form input
  name: '',
  link: '',
  artistId: '',
};

// formInput is an object that contains the current values of the form inputs.
// The initial values are defined in the initialState object.
// handleChange is a function that will be called when the user changes the value of an input field.
function LinkForm({ obj }) { // define functional component and pass in props
  const [formInput, setFormInput] = useState(initialState); // declare state for form input and update function
  const router = useRouter(); // declare router variable using useRouter hook
  const { user } = useAuth(); // declare user variable using useAuth hook

  useEffect(() => { // define effect for when the component mounts
    if (obj.artistId) setFormInput(obj); // if the obj prop is true (has an artistId key), set form input state to the object
  }, [obj]); // run the effect whenever obj changes

  const handleChange = (e) => { // define function to handle changes to form input
    const { name, value } = e.target; // declare variables for name and value of input
    setFormInput((prevState) => ({ // update form input state using previous state
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => { // define function to handle form submission
    e.preventDefault(); // prevent default form submission behavior
    if (obj.artistId) { // if obj has an artistId key, update existing link in API
      updateLink(formInput)
        .then(() => router.push('/profile')); // push user to profile page after updating link
    } else { // otherwise, create new link in API
      const payload = { ...formInput, artistId: user.uid, uid: user.uid }; // create payload with form input data and user ID
      createLink(payload).then(({ name }) => { // create new link and obtain name from response
        const patchPayload = { firebaseKey: name }; // create patch payload with firebaseKey equal to name
        updateLink(patchPayload).then(() => { // update link with patch payload in API
          router.push('/profile'); // push user to profile page after updating link
        });
      });
    }
  };

  // This is the JSX code for the LinkForm component.
  // When the form is submitted, handleSubmit will be called.
  // The className "formTextStyle" is applied to the form element.
  return (
    <Form onSubmit={handleSubmit} className="formTextStyle">
      {/* This displays a heading depending on whether obj.artistId exists or not. */}
      <h2 className="text-white mt-5">{obj.artistId ? 'Change the Deets' : 'Gimme The Link'}</h2>

      {/* This is a Bootstrap component that creates a label and input field with floating labels. */}
      {/* The label text is "Website Name" and the input field value is taken from formInput.name. */}
      {/* handleChange will be called when the user changes the value of this input field. */}
      <FloatingLabel controlId="floatingInput1" label="Website Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Website Name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
          style={{ width: '40%' }}
        />
      </FloatingLabel>

      {/* This is another Bootstrap component that creates a label and input field with floating labels. */}
      {/* The label text is "URL" and the input field value is taken from formInput.link. */}
      {/* handleChange will be called when the user changes the value of this input field. */}
      <FloatingLabel controlId="floatingInput2" label="URL" className="mb-3">
        <Form.Control
          type="text"
          placeholder="URL"
          name="link"
          value={formInput.link}
          onChange={handleChange}
          required
          style={{ width: '40%' }}
        />
      </FloatingLabel>

      {/* This is a Bootstrap component that creates a button. */}
      {/* The text on the button depends on whether obj.artistId exists or not. */}
      {/* When the button is clicked, handleSubmit will be called. */}
      <Button type="submit" className="m-2 whiteButton">{obj.artistId ? 'Make A Change' : 'Show Us Your Link'}</Button>
    </Form>
  );
}

LinkForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string,
    link: PropTypes.string,
    artistId: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

LinkForm.defaultProps = {
  obj: initialState,
};

export default LinkForm;
