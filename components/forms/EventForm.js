import React, { useEffect, useState } from 'react'; // Importing React hooks and functions
import { useRouter } from 'next/router'; // Importing Next.js router functionality
import PropTypes from 'prop-types'; // Importing prop types for props validation
import FloatingLabel from 'react-bootstrap/FloatingLabel'; // Importing Bootstrap components
import Form from 'react-bootstrap/Form'; // Importing Bootstrap components
import { Button } from 'react-bootstrap'; // Importing Bootstrap components
import { useAuth } from '../../utils/context/authContext'; // Importing custom hook for authentication context
import { createEvent, updateEvent } from '../../api/eventData'; // Importing functions to interact with API for event data

const initialState = { // Setting initial state for form inputs
  venue: '',
  date: '',
  time: '',
  price: '',
  artistId: '',
};

function EventForm({ obj }) { // Declaring functional component and passing in props
  const [formInput, setFormInput] = useState(initialState); // Initializing state for form inputs and function to update state
  const router = useRouter(); // Initializing router to use for navigation
  const { user } = useAuth(); // Getting current user data from authentication context

  useEffect(() => { // Run effect when component mounts and whenever obj prop changes
    if (obj.artistId) setFormInput(obj); // If obj prop is truthy (has artistId key), set form input state to obj prop
  }, [obj]);

  const handleChange = (e) => { // Function to handle changes to form inputs
    const { name, value } = e.target; // Get name and value of form input that triggered change event

    // Handle changes to the date picker
    if (name === 'date') {
      setFormInput((prevState) => ({
        ...prevState,
        date: value,
      }));
    } else {
      setFormInput((prevState) => ({
        ...prevState,
        [name]: value, // Set state for form input that triggered change event
      }));
    }
  };

  const handleSubmit = (e) => { // Function to handle form submission
    e.preventDefault(); // Prevent default behavior of form submission

    if (obj.artistId) { // If obj prop is truthy (has artistId key), update existing event
      updateEvent(formInput)
        .then(() => router.push('/profile')); // Navigate to profile page after updating event
    } else { // Otherwise, create new event
      const payload = {
        ...formInput, artistId: user.uid, uid: user.uid,
      }; // Create payload with form input data and current user uid
      createEvent(payload).then(({ name }) => { // Create event with payload and get event name from response
        const patchPayload = { firebaseKey: name }; // Create patch payload with event name as firebaseKey
        updateEvent(patchPayload).then(() => { // Update event with patch payload
          router.push('/profile'); // Navigate to profile page after creating event
        });
      });
    }
  };

  return (
  // A form element that will call the handleSubmit function when submitted
    <Form onSubmit={handleSubmit} className="formTextStyle">
      {/* A header that displays different text depending on whether an artistId exists in the 'obj' prop */}
      <h2 className="text-white mt-5">{obj.artistId ? 'Need To Change the Deets?  Great!' : 'Tell Us About Your New Gig'}</h2>

      {/* A form input element with a label for the venue */}
      <FloatingLabel controlId="floatingInput1" label="Venue" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Event Venue"
          name="venue"
          value={formInput.venue} // Value of the 'venue' field in the 'formInput' state
          onChange={handleChange} // Function called when the value in the input field changes
          required
        />
      </FloatingLabel>

      {/* A form input element with a label for the date */}
      <FloatingLabel controlId="floatingInput2" label="Date" className="mb-3">
        <Form.Control
          placeholderText="Event Date"
          name="date"
          type="date"
          value={formInput.date} // Value of the 'date' field in the 'formInput' state
          onChange={handleChange} // Function called when the value in the input field changes
          required // This field is required for form submission
        />
      </FloatingLabel>

      {/* A form input element with a label for the time */}
      <FloatingLabel controlId="floatingInput3" label="Time" className="mb-3">
        <Form.Control
          type="time"
          placeholder="Event Time"
          name="time"
          value={formInput.time} // Value of the 'time' field in the 'formInput' state
          onChange={handleChange} // Function called when the value in the input field changes
          required // This field is required for form submission
          format="hh:mm A" // Format of the time input
        />
      </FloatingLabel>

      {/* A form input element with a label for the price */}
      <FloatingLabel controlId="floatingInput4" label="Price" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Event Price"
          name="price"
          value={formInput.price} // Value of the 'price' field in the 'formInput' state
          onChange={handleChange} // Function called when the value in the input field changes
          required
        />
      </FloatingLabel>

      {/* A button element that will display different text depending on whether an artistId exists in the 'obj' prop */}
      <Button className="m-2 whiteButton" type="submit">{obj.artistId ? 'Make A Change' : 'Get The Party Started'}</Button>
    </Form>
  );
}

EventForm.propTypes = {
  obj: PropTypes.shape({
    venue: PropTypes.string,
    date: PropTypes.string,
    time: PropTypes.string,
    price: PropTypes.string,
    artistId: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

EventForm.defaultProps = {
  obj: initialState,
};

// work on vocab, explain code

export default EventForm;
