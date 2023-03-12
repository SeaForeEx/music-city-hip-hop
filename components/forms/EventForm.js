import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createEvent, updateEvent } from '../../api/eventData';

const initialState = {
  venue: '',
  date: '',
  time: '',
  price: '',
  artistId: '',
};

function EventForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter(); // router travels pages
  const { user } = useAuth();

  useEffect(() => { // what happens when the component mounts
    if (obj.artistId) setFormInput(obj); // if obj prop is true (has a key), form input is set to the object
  }, [obj]); // if anything in obj changes (user) run it again

  // useEffect(() => {function callback}, [dependency array])
  // dependency arrays trigger hook to run when they are changed

  const handleChange = (e) => { // handling change of input
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.artistId) {
      updateEvent(formInput)
        .then(() => router.push('/profile'));
    } else {
      const payload = { ...formInput, artistId: user.uid, uid: user.uid }; // spreading object data, appending uid
      createEvent(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateEvent(patchPayload).then(() => {
          router.push('/profile');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.artistId ? 'Update' : 'Create'} Event</h2>

      <FloatingLabel controlId="floatingInput1" label="Venue" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Event Venue"
          name="venue"
          value={formInput.venue}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Date" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Event Date"
          name="date"
          value={formInput.date}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Time" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Event Time"
          name="time"
          value={formInput.time}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput4" label="Price" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Event Price"
          name="price"
          value={formInput.price}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Button className="m-2 btn-transparent" type="submit">{obj.artistId ? 'Edit' : 'Create'} Event</Button>
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
