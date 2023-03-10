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
    // This line extracts the first file from the array of files that the user selected in the file input element. This file is stored in a variable named imageFile.
    const reader = new FileReader();
    // This creates a new instance of the FileReader object. The FileReader object is used to read the contents of a file asynchronously.
    reader.readAsDataURL(imageFile);
    // This line starts the process of reading the contents of the imageFile file. The readAsDataURL method of the FileReader object is called with imageFile as its argument. This method reads the contents of the file as a data URL string.

    reader.onload = () => {
      // This sets a callback function that is called when the contents of the file have been read successfully.
      setFormInput((prevState) => ({
        ...prevState,
        image: reader.result,
      }));
      // This sets the image property of the new state object to the data URL string that was generated by the FileReader.
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
            {/* type="file" - This sets the input type to "file", which allows the user to select a file from their local file system */}
            {/* accept="image/*": This attribute limits the types of files that the user can select to image files only. The * is a wildcard that allows any file type that starts with "image/" to be accepted. For example, "image/jpeg" or "image/png". */}
            {/* onChange={handleImageChange}: This sets the onChange event handler for the input element to the handleImageChange function. This function is called when the user selects a file using the input element. */}
            {formInput.image && (
            <img
              src={formInput.image}
              alt="profile"
              style={{ height: '250px', width: '250px', borderRadius: '50%' }}
            />
            )}
            {/* {formInput.image &&: This is a conditional rendering statement that checks if formInput.image is truthy. If formInput.image is truthy, the code inside the parentheses is executed. */}
            {/* <img: This is the HTML img element that is being rendered conditionally. */}
            {/* src={formInput.image}: This sets the src attribute of the img element to the value of formInput.image. This assumes that formInput.image is a valid URL or data URL string representing an image. */}
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
