import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import Link from 'next/link';
import { deleteLink } from '../api/linkData';
import { useAuth } from '../utils/context/authContext';

// https://a.vsstatic.com/mobile/app/category/rap-hip-hop.jpg

function LinkCard({ linkObj, onUpdate }) {
  const deleteThisLink = () => {
    if (window.confirm(`Delete ${linkObj.name}?`)) {
      deleteLink(linkObj.firebaseKey).then(() => onUpdate());
    }
  };

  const { user } = useAuth();
  let url = `${linkObj.link}`;

  if (url.startsWith('http://') || url.startsWith('https://')) {
    url = `${linkObj.link}`;
  } else {
    url = `http://${linkObj.link}`;
  }

  return (
    <Card style={{ width: '18rem', margin: '1px' }}>
      <Card.Body>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <a href={url} target="_blank" rel="noopener noreferrer" className="hoverText">{linkObj.name}</a>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <Link href={`/links/edit/${linkObj.firebaseKey}`} passHref>
              <span style={{ cursor: 'pointer' }} className="hoverText">{linkObj.artistId === user.uid ? 'edit' : ''}</span>
            </Link>
            {linkObj.artistId === user.uid ? (
              // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
              <span style={{ cursor: 'pointer', marginLeft: '10px' }} onClick={deleteThisLink} className="m-2 hoverText">
                delete
              </span>
            ) : null}
          </div>
        </div>
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
