/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createUser, updateUser, getUser } from '../../api/userData';

const initialState = {
  name: '',
  image: '',
  bio: '',
  isArtist: true,
  follow: false,
};

function UserForm({ obj }) {
  const [formInput, setFormInput] = useState({
    ...initialState,
    uid: obj.uid,
  });

  const router = useRouter();
  const { setUser, uid } = useAuth();

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

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(imageFile);
    reader.onload = () => {
      setFormInput((prevState) => ({
        ...prevState,
        image: reader.result,
      }));
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateUser(formInput)
        .then(() => router.push('/profile'));
    } else {
      const payload = { ...formInput, uid };
      createUser(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateUser(patchPayload).then(() => {
          getUser(uid)
            .then((userData) => {
              setUser(userData);
              router.push('/');
            });
        });
      });
    }
  };

  return (
    <>
      <Head>
        <title>{obj.firebaseKey ? 'Change is Good' : 'A New Era has Dawned'}</title>
      </Head>
      <Form onSubmit={handleSubmit}>
        <h2 className="text-white mt-5">{obj.firebaseKey ? 'Change is Good, Change Brings Growth' : 'A New Era has Dawned in Music City'}</h2>

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

        <Form.Group className="mb-3">
          <Form.Label>Image</Form.Label>
          <div className="d-flex align-items-center">
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="me-3"
            />
            {formInput.image && (
            <img
              src={formInput.image}
              alt="profile"
              style={{ height: '250px', width: '250px', borderRadius: '50%' }}
            />
            )}
          </div>
        </Form.Group>

        {!obj.firebaseKey && (
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
        )}

        <Button type="submit" className="m-2 btn-transparent">{obj.firebaseKey ? 'Make A Change' : 'Join MCHH'}</Button>
      </Form>
    </>
  );
}

UserForm.propTypes = {
  obj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    bio: PropTypes.string,
    firebaseKey: PropTypes.string,
    isArtist: PropTypes.bool,
    follow: PropTypes.bool,
    uid: PropTypes.string,
  }),
};

UserForm.defaultProps = {
  obj: initialState,
};

export default UserForm;
