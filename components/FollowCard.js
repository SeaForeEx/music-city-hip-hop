import React from 'react'; // import React library
import PropTypes from 'prop-types'; // import PropTypes library
import { Card, Col, Row } from 'react-bootstrap'; // import Card, Col, and Row components from react-bootstrap library
import Link from 'next/link'; // import Link component from next/link library

// define FollowCard functional component which takes in followObj prop
export default function FollowCard({ followObj }) {
  return (
    // render a Card component with custom styles
    <Card className="userBackground textStyle" style={{ width: '18rem', height: '5rem', margin: '5px' }}>
      {/* render a Row component to contain two columns */}
      <Row>
        {/* render a column with width of 4 */}
        <Col xs={4}>
          {/* render an image with src from followObj's image property and alt from followObj's name property, with custom height */}
          <Card.Img
            variant="top"
            src={followObj.image}
            alt={followObj.name}
            style={{ height: '5rem' }}
          />
        </Col>
        {/* render a column with width of 8, aligned in center and vertically centered */}
        <Col xs={8} className="d-flex align-items-center justify-content-center">
          {/* render a Link component with href to followObj's firebaseKey property */}
          <Link href={`/users/${followObj.firebaseKey}`} passHref>
            {/* render a Card.Link component with followObj's name property as text, with hoverText and linkStyle classes */}
            <Card.Link className="hoverText linkStyle">{followObj.name}</Card.Link>
          </Link>
        </Col>
      </Row>
    </Card>
  );
}

// define propTypes for FollowCard component to ensure correct prop types are passed in
FollowCard.propTypes = {
  followObj: PropTypes.shape({
    firebaseKey: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};
