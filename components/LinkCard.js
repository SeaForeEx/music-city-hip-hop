import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';

function LinkCard({ linkObj }) {
  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{linkObj.name}</Card.Title>
        {/* DYNAMIC LINK TO VIEW THE MEMBER DETAILS  */}
        <Link href={`/links/${linkObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/links/edit/${linkObj.firebaseKey}`} passHref>
          <Button variant="info">EDIT</Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE MEMBER DETAILS  */}
      </Card.Body>
    </Card>
  );
}

LinkCard.propTypes = {
  linkObj: PropTypes.shape({
    name: PropTypes.string,
    link: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
};

export default LinkCard;
