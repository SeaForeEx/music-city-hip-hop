import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createUser, updateUser } from '../../api/userData';

const initialState = {
  name: '',
  image: '',
  bio: '',
  isArtist: true,
};

function UserForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (obj.firebaseKey) setFormInput(obj);
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === 'isArtist' ? e.target.checked : value;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateUser(formInput)
        .then(() => router.push('/'));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createUser(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateUser(patchPayload).then(() => {
          router.push('/');
          console.warn(user.uid);
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'}</h2>

      <FloatingLabel controlId="floatingInput1" label="Name" className="mb-3">
        <Form.Control
          type="text"
          placeholder="What is your Name?"
          name="name"
          value={formInput.name}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput2" label="Bio" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Tell us about yourself"
          name="bio"
          value={formInput.bio}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingInput3" label="Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Give us your Headshot"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      <FloatingLabel controlId="floatingSelect" label="AorF">
        <Form.Select
          aria-label="Artist-Or-Fan"
          name="isArtist"
          onChange={handleChange}
          className="mb-3"
          value={formInput.isArtist}
          required
        >
          <option value="">Which Are You?</option>
          <option value>Artist</option>
          <option value={false}>Fan</option>
        </Form.Select>
      </FloatingLabel>

      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'}</Button>
    </Form>
  );
}

UserForm.propTypes = {
  obj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    bio: PropTypes.string,
    firebaseKey: PropTypes.string,
    isArtist: PropTypes.bool,
  }),
};

UserForm.defaultProps = {
  obj: initialState,
};

export default UserForm;
