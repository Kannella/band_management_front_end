import React from "react";
import { Link } from "react-router-dom";
import '../assets/styles/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays, faTicket, faSquarePlus, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as Logo } from '../assets/images/logo_vector.svg';
import { ReactComponent as HomeIcon } from '../assets/images/icon_home.svg';
import { Container, Row, Col } from 'react-bootstrap';

function NavBar({ logoSize, iconSize, iconSizeHome, navbarSize }) {
  return (
    <div className="nav-container d-flex flex-column align-items-center" style={{
      position: 'fixed',
      top: 0,
      width: navbarSize,
      height: '100vh',
      zIndex: '100'
    }}>
      <Container fluid className="d-flex flex-column justify-content-between h-100">
        <Row className="d-flex justify-content-center py-4 mb-5 mt-2">
          <Col className="d-flex justify-content-center">
            <Logo width={logoSize} height={logoSize} />
          </Col>
        </Row>

        <Row className="d-flex flex-column justify-content-center align-items-center flex-grow-1 py-3">
          <Col className="d-flex justify-content-center mb-3">
            <Link to="/" className="icon-button icon-img">
              <HomeIcon width={iconSizeHome} height={iconSizeHome} />
              <div className="label">Home</div>
            </Link>
          </Col>
          <Col className="d-flex justify-content-center mb-3">
            <Link to="/bands" className="icon-button">
              <FontAwesomeIcon icon={faSquarePlus} style={{ fontSize: iconSize }} />
              <div className="label">Bands</div>
            </Link>
          </Col>
          <Col className="d-flex justify-content-center mb-3">
            <Link to="/bookings-table" className="icon-button">
              <FontAwesomeIcon icon={faTicket} style={{ fontSize: iconSize }} />
              <div className="label">Bookings</div>
            </Link>
          </Col>
          <Col className="d-flex justify-content-center mb-3">
            <Link to="/calendar" className="icon-button">
              <FontAwesomeIcon icon={faCalendarDays} style={{ fontSize: iconSize }} />
              <div className="label">Calendar</div>
            </Link>
          </Col>
        </Row>

        <Row className="d-flex justify-content-center mt-5">
          <Col className="d-flex justify-content-center">
            <Link to="/profile" className="icon-button">
              <FontAwesomeIcon icon={faCircleUser} style={{ fontSize: iconSize }} />
              <div className="label">Profile</div>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default NavBar;
