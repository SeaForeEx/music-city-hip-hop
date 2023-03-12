import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createLink, updateLink } from '../../api/linkData';

const initialState = {
  name: '',
  link: '',
  artistId: '',
};

function LinkForm({ obj }) {
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
      updateLink(formInput)
        .then(() => router.push('/profile'));
    } else {
      const payload = { ...formInput, artistId: user.uid, uid: user.uid }; // spreading object data, appending uid
      createLink(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateLink(patchPayload).then(() => {
          router.push('/profile');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.artistId ? 'Update' : 'Create'} Link</h2>

      <FloatingLabel controlId="floatingInput1" label="Website Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Website Name"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="URL" className="mb-3">
        <Form.Control
          type="text"
          placeholder="URL"
          name="link"
          value={formInput.link}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <Button type="submit" className="m-2 btn-transparent">{obj.artistId ? 'Edit' : 'Create'} Link</Button>
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

// work on vocab, explain code

export default LinkForm;
