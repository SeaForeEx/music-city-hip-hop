/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav,
} from 'react-bootstrap';
import SearchBar from './SearchBar';
import { useAuth } from '../utils/context/authContext';
import { getUser } from '../api/userData';

export default function NavBar() {
  const { user } = useAuth();
  const [profilePic, setProfilePic] = useState({});
  const getProfilePic = () => {
    getUser(user.uid).then(setProfilePic);
  };

  useEffect(() => {
    getProfilePic();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="navbar-text">
      <Container id="mchh-navbar">
        <Link passHref href="/">
          <img
            src="https://i.imgur.com/HSl84mq.png"
            alt="mchh-logo"
            style={{
              maxWidth: '125px', marginRight: '10px', marginTop: '5px', marginBottom: '5px',
            }}
          />
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto navText" style={{ display: 'flex', alignItems: 'center' }}>
            <Link passHref href="/artists">
              <Nav.Link>Artists</Nav.Link>
            </Link>
            <Link passHref href="/fans">
              <Nav.Link>Fans</Nav.Link>
            </Link>
            <SearchBar />
            <Link passHref href="/profile">
              <Nav.Link className="navbar-brand">
                <img src={profilePic.image} alt="img" width="125px" style={{ borderRadius: '50%', marginLeft: '5px' }} id="navbar-profile-image" />
              </Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
