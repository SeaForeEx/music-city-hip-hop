// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import PropTypes from 'prop-types';
// import FloatingLabel from 'react-bootstrap/FloatingLabel';
// import Form from 'react-bootstrap/Form';
// import { Button } from 'react-bootstrap';
// import { useAuth } from '../../utils/context/authContext';
// import { createLink, getLink, updateLink } from '../../api/linkData';

// const initialState = {
//   name: '',
//   link: '',
//   artistId: '',
// };

// function LinkForm({ obj }) {
//   const [formInput, setFormInput] = useState(initialState);
//   const [links, setLinks] = useState([]);
//   const router = useRouter(); // router travels pages
//   const { user } = useAuth();

//   useEffect(() => { // what happens when the component mounts
//     getLink().then(setLinks);
//     if (obj.artistId) setFormInput(obj); // if obj prop is true (has a key), form input is set to the object
//   }, [obj, user]); // if anything in obj changes (user) run it again

//   // useEffect(() => {function callback}, [dependency array])
//   // dependency arrays trigger hook to run when they are changed

//   const handleChange = (e) => { // handling change of input
//     const { name, value } = e.target;
//     setFormInput((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (obj.firebaseKey) {
//       updateLink(formInput)
//         .then(() => router.push('/'));
//     } else {
//       const payload = { ...formInput, uid: user.uid }; // spreading object data, appending uid
//       createLink(payload).then(({ name }) => {
//         const patchPayload = { firebaseKey: name };
//         updateLink(patchPayload).then(() => {
//           router.push('/');
//         });
//       });
//     }
//   };

//   return (
//     <Form onSubmit={handleSubmit}>
//       <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update Info In' : 'Join'} The Team!</h2>

//       <FloatingLabel controlId="floatingInput1" label="Code Name" className="mb-3">
//         <Form.Control
//           type="text"
//           placeholder="Website Name"
//           name="name"
//           value={formInput.name}
//           onChange={handleChange}
//           required
//         />
//       </FloatingLabel>

//       <FloatingLabel controlId="floatingInput2" label="Role" className="mb-3">
//         <Form.Control
//           type="text"
//           placeholder="Website Link"
//           name="link"
//           value={formInput.link}
//           onChange={handleChange}
//           required
//         />
//       </FloatingLabel>

//       <Button type="submit">{obj.firebaseKey ? 'Edit' : 'Create'} Link</Button>
//     </Form>
//   );
// }

// LinkForm.propTypes = {
//   obj: PropTypes.shape({
//     name: PropTypes.string,
//     link: PropTypes.string,
//     artistId: PropTypes.string,
//     firebaseKey: PropTypes.string,
//   }),
// };

// LinkForm.defaultProps = {
//   obj: initialState,
// };

// // work on vocab, explain code

// export default LinkForm;
