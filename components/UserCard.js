import React from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Row } from 'react-bootstrap';
import Link from 'next/link';

function UserCard({ userObj }) {
  return (
    <Card className="userBackground textStyle" style={{ width: '18rem', height: '5rem', margin: '5px' }}>
      <Row>
        <Col xs={4}>
          <Card.Img
            variant="top"
            src={userObj.image}
            alt={userObj.name}
            style={{ height: '5rem' }}
          />
        </Col>
        <Col xs={8} className="d-flex align-items-center justify-content-center">
          <Link href={`/users/${userObj.firebaseKey}`} passHref>
            <Card.Link className="hoverText linkStyle">{userObj.name}</Card.Link>
          </Link>
        </Col>
      </Row>
    </Card>
  );
}

UserCard.propTypes = {
  userObj: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    bio: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
};

export default UserCard;
