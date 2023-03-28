import React from 'react'; // import the React library
import PropTypes from 'prop-types'; // import the PropTypes library
import { Card, Col, Row } from 'react-bootstrap'; // import the Card, Col, and Row components from the react-bootstrap library
import Link from 'next/link'; // import the Link component from the next/link library

function UserCard({ userObj }) { // define a functional component called UserCard that takes a userObj prop
  return ( // return the following JSX code:
    <Card className="userBackground textStyle" style={{ width: '18rem', height: '5rem', margin: '5px' }}>
      {/* create a Row component */}
      <Row>
        {/* create a Col component with a width of 4 */}
        <Col xs={4}>
          {/* create a Card.Img component with the following props:
              - variant: 'top'
              - src: the image URL from the userObj prop
              - alt: the name from the userObj prop
              - style: a height of 5rem
          */}
          <Card.Img
            variant="top"
            src={userObj.image}
            alt={userObj.name}
            style={{ height: '5rem' }}
          />
        </Col>
        {/* create a Col component with a width of 8 and center its content */}
        <Col xs={8} className="d-flex align-items-center justify-content-center">
          {/* create a Link component with the following props:
              - href: a dynamic URL that includes the user's firebaseKey from the userObj prop
              - passHref: true
          */}
          <Link href={`/users/${userObj.firebaseKey}`} passHref>
            {/* create a Card.Link component with the following props:
                - className: 'hoverText linkStyle'
                - children: the user's name from the userObj prop
            */}
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
