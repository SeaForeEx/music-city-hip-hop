import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { deleteLink } from '../api/linkData';
import { useAuth } from '../utils/context/authContext';

function LinkCard({ linkObj, onUpdate }) {
  const deleteThisLink = () => {
    if (window.confirm(`Delete ${linkObj.name}?`)) {
      deleteLink(linkObj.firebaseKey).then(() => onUpdate());
    }
  };

  const { user } = useAuth();

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Body>
        <Card.Title>{linkObj.name}</Card.Title>
        {/* DYNAMIC LINK TO VIEW THE MEMBER DETAILS  */}
        <Link href={`/links/${linkObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/links/edit/${linkObj.firebaseKey}`} passHref>
          {linkObj.artistId === user.uid ? (<Button variant="info">EDIT</Button>) : ''}
        </Link>
        {linkObj.artistId === user.uid ? (
          <Button variant="danger" onClick={deleteThisLink} className="m-2">
            DELETE
          </Button>
        ) : ''}
      </Card.Body>
    </Card>
  );
}

LinkCard.propTypes = {
  linkObj: PropTypes.shape({
    name: PropTypes.string,
    link: PropTypes.string,
    firebaseKey: PropTypes.string,
    artistId: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default LinkCard;
