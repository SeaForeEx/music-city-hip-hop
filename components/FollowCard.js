import React from 'react';
import PropTypes from 'prop-types';
import { Card, Col, Row } from 'react-bootstrap';
import Link from 'next/link';

export default function FollowCard({ followObj }) {
  return (
    <Card className="userBG textStyle" style={{ width: '18rem', height: '5rem', margin: '5px' }}>
      <Row>
        <Col xs={4}>
          <Card.Img
            variant="top"
            src={followObj.image}
            alt={followObj.name}
            style={{ height: '5rem' }}
          />
        </Col>
        <Col xs={8} className="d-flex align-items-center justify-content-center">
          <Link href={`/users/${followObj.firebaseKey}`} passHref>
            <Card.Link className="hoverText linkStyle">{followObj.name}</Card.Link>
          </Link>
        </Col>
      </Row>
    </Card>
  );
}

FollowCard.propTypes = {
  followObj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
};
