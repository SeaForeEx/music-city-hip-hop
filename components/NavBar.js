import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav,
} from 'react-bootstrap';
import SearchBar from './SearchBar';
import { useAuth } from '../utils/context/authContext';
import { getUser } from '../api/userData';

export default function NavBar() {
  // Get the authenticated user from the auth context
  const { user } = useAuth();
  // Set up a state variable for the profile picture
  const [profilePic, setProfilePic] = useState({});

  // Define a function to get the profile picture for the user
  const getProfilePic = () => {
    // Call the getUser function from the API to get the user's data
    getUser(user.uid)
      // When the data is returned, update the profile picture state variable
      .then(setProfilePic);
  };

  // Call the getProfilePic function when the component mounts or when the authenticated user changes
  useEffect(() => {
    getProfilePic();
  }, [user]);

  return (
    // Render a Bootstrap navbar with a dark background and expandable mobile menu
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="navbar-text textStyle">
      <Container id="mchh-navbar">
        {/* Render a link to the home page with the MCHH logo */}
        <Link passHref href="/">
          <img
            src="https://i.imgur.com/HSl84mq.png"
            alt="mchh-logo"
            style={{
              maxWidth: '125px', marginRight: '10px', marginTop: '5px', marginBottom: '5px',
            }}
          />
        </Link>
        {/* Add a toggle button to show/hide the mobile menu */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        {/* Render the mobile menu with links to the artists and fans pages, a search bar, and a link to the user's profile */}
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto navText" style={{ display: 'flex', alignItems: 'center' }}>
            {/* Render a link to the artists page */}
            <Link passHref href="/artists">
              <Nav.Link>Artists</Nav.Link>
            </Link>
            {/* Render a link to the fans page */}
            <Link passHref href="/fans">
              <Nav.Link>Fans</Nav.Link>
            </Link>
            {/* Render a search bar component */}
            <SearchBar />
            {/* Render a link to the user's profile with their profile picture */}
            <Link passHref href="/profile">
              <Nav.Link className="navbar-brand">
                <img src={profilePic.image} alt="img" width="125px" style={{ borderRadius: '50%', marginLeft: '5px', objectFit: 'cover' }} id="navbar-profile-image" />
              </Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
