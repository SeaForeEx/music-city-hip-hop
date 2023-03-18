/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav,
} from 'react-bootstrap';
import SearchBar from './SearchBar';

export default function NavBar() {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="navbar-text">
      <Container id="mchh-navbar">
        <Link passHref href="/">
          <img
            src="https://i.imgur.com/HSl84mq.png"
            alt="mchh-logo"
            style={{
              maxWidth: '10%', marginRight: '10px', marginTop: '5px', marginBottom: '5px',
            }}
          />
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link passHref href="/">
              <Nav.Link>Artists</Nav.Link>
            </Link>
            <Link passHref href="/fans">
              <Nav.Link>Fans</Nav.Link>
            </Link>
            <SearchBar />
            <Link passHref href="/profile">
              <Nav.Link>Profile</Nav.Link>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
