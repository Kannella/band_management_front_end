import React from "react"; 
import '../assets/styles/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.css';
import { faCalendarDays, faTicket, faSquarePlus, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as Logo } from '../assets/images/logo_vector.svg';
import { ReactComponent as HomeIcon } from '../assets/images/icon_home.svg';

function NavBarMobile() {
  return (
    <div 
      className="nav-container d-flex align-items-center justify-content-around flex-wrap"
      style={{
        position: 'sticky',
        top: 0,
        width: '100%',
        height: '12vh',
      }}
    >
      <div className="d-flex align-items-center" style={{ gap: '1vw' }}>
        <Logo width="36" height="36"/>
        <div className="logo-text">Band Manager</div>
      </div>
      <div className="d-flex align-items-center justify-content-center "style={{ gap: '4vw' }} >
      <div className="icon-row mb-1">
        <a href="#" className="icon-button icon-img">
          <HomeIcon width="22" height="22" />
        </a>
      </div>
      <div className="icon-row">
        <a href="#" className="icon-button">
          <FontAwesomeIcon icon={faSquarePlus} style={{ fontSize: '24px' }} />
        </a>
      </div>
      <div className="icon-row">
        <a href="#" className="icon-button">
          <FontAwesomeIcon icon={faTicket} style={{ fontSize: '24px' }} />
        </a>
      </div>
      <div className="icon-row">
        <a href="#" className="icon-button">
          <FontAwesomeIcon icon={faCalendarDays} style={{ fontSize: '24px' }} />
        </a>
      </div>
      </div>
      <div className="icon-row">
        <a href="#" className="icon-button">
          <FontAwesomeIcon icon={faCircleUser} style={{ fontSize: '28px' }} />
        </a>
      </div>
    </div>
  );
}

export default NavBarMobile;
