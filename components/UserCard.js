import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { deleteUserLinksAndEvents } from '../api/mergedData';
import { useAuth } from '../utils/context/authContext';

function UserCard({ userObj, onUpdate }) {
  const deleteThisUser = () => {
    if (window.confirm(`Delete ${userObj.name}?`)) {
      deleteUserLinksAndEvents(userObj.uid, userObj.firebaseKey).then(() => onUpdate());
    }
  };

  const { user } = useAuth();

  return (
    <Card style={{ width: '18rem', margin: '10px' }}>
      <Card.Img variant="top" src={userObj.image} alt={userObj.name} style={{ height: '400px' }} />
      <Card.Body>
        <Card.Title>{userObj.name}</Card.Title>
        {/* DYNAMIC LINK TO VIEW THE MEMBER DETAILS  */}
        <Link href={`/users/${userObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">VIEW</Button>
        </Link>
        <Link href={`/users/edit/${userObj.firebaseKey}`} passHref>
          {userObj.uid === user.uid ? (<Button variant="info">EDIT</Button>) : ''}
        </Link>
        {userObj.uid === user.uid ? (
          <Button variant="danger" onClick={deleteThisUser} className="m-2">
            DELETE
          </Button>
        ) : ''}
      </Card.Body>
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
  onUpdate: PropTypes.func.isRequired,
};

export default UserCard;
