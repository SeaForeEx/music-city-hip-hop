/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import Link from 'next/link';
import { deleteLink } from '../api/linkData';
import { useAuth } from '../utils/context/authContext';

// https://a.vsstatic.com/mobile/app/category/rap-hip-hop.jpg

function LinkCard({ linkObj, onUpdate }) {
  // Function to delete a link
  const deleteThisLink = () => {
    // Show a confirmation dialog to delete the link
    if (window.confirm(`Delete ${linkObj.name}?`)) {
      // If the user confirms, call the deleteLink function from the api and update the links
      deleteLink(linkObj.firebaseKey).then(() => onUpdate());
    }
  };

  // Get the current user from the authContext
  const { user } = useAuth();

  // Modify the url to add http:// if it doesn't exist
  let url = `${linkObj.link}`;

  if (url.startsWith('http://') || url.startsWith('https://')) {
    url = `${linkObj.link}`;
  } else {
    url = `http://${linkObj.link}`;
  }

  return (
    // Render a card for each linkObj
    <Card className="textStyle transParent" style={{ width: '18rem', margin: '1px' }}>
      <Card.Body>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Render a link with the name of the link */}
          <a href={url} target="_blank" rel="noopener noreferrer" className="hoverText textStyle linkStyle">{linkObj.name}</a>
          {/* Render the edit and delete links only if the artistId matches the user id */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <Link href={`/links/edit/${linkObj.firebaseKey}`} passHref>
              {/* Render a link to edit the link */}
              <span style={{ cursor: 'pointer' }} className="hoverText">{linkObj.artistId === user.uid ? 'edit' : ''}</span>
            </Link>
            {linkObj.artistId === user.uid ? (
              // Render a span to delete the link, only if the artistId matches the user id
              // When clicked, it calls the deleteThisLink function defined earlier
              // The className is added to style the text
              // The cursor is changed to a pointer to show that it's clickable
              // The text is displayed using the ternary operator, only if the artistId matches the user id
              // A margin is added to space out the delete link from the edit link
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

// Define the PropTypes for the LinkCard component
LinkCard.propTypes = {
  linkObj: PropTypes.shape({
    name: PropTypes.string,
    link: PropTypes.string,
    firebaseKey: PropTypes.string,
    artistId: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

// Export the LinkCard component as the default export
export default LinkCard;
