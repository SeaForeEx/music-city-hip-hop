import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSingleFollow } from '../api/followData';
import { useAuth } from '../utils/context/authContext';

export default function FollowCard({ followObj, onUpdate, appUser }) {
  const { user } = useAuth();

  const deleteThisFollow = () => {
    if (window.confirm(`Unfollow ${followObj.name}?`)) {
      deleteSingleFollow(followObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <div>
      <Card>
        <iframe src={followObj.image} title={followObj.name} />
        <Card.Body>
          <Card.Title>{followObj.name}</Card.Title>
          <Link href={`/user/${followObj.firebaseKey}`} passHref>
            {appUser.uid === user.uid ? (<Button variant="outline-dark" className="m-2">view profile</Button>) : '' }
          </Link>
          <>
            {appUser.uid === user.uid ? (
              <Button variant="outline-dark" className="m-2" onClick={deleteThisFollow}>
                DELETE
              </Button>
            )
              : ''}
          </>
        </Card.Body>
      </Card>
    </div>
  );
}

FollowCard.propTypes = {
  followObj: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  appUser: PropTypes.shape({
    uid: PropTypes.string,
  }).isRequired,
};
