import React from "react"; 
import '../assets/styles/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'bootstrap/dist/css/bootstrap.css';
import { faCalendarDays, faTicket, faSquarePlus, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as Logo } from '../assets/images/logo_vector.svg';
import { ReactComponent as HomeIcon } from '../assets/images/icon_home.svg';

function NavBar({ logoSize, iconSize, iconSizeHome }) { 
  return (
    <div className="nav-container d-flex flex-column align-items-center" style={{
      position: 'sticky',
      top: 0,             
      width: '6vw',        
      height: '100vh',     
      zIndex: 1000
    }}>
      <div className="row w-100">
        <div className="col-12 d-flex flex-column justify-content-center align-items-center py-4 mb-5 mt-2">
          <Logo width={logoSize} height={logoSize} />
        </div>

        <div className="col-12 d-flex flex-column align-items-center justify-content-center flex-grow-1 py-5 mb-5 mt-2">
          <div className="icon-row py-3">
            <a href="#" className="icon-button icon-img">
              <HomeIcon width={iconSizeHome} height={iconSizeHome} /> 
            </a>
          </div>
          <div className="icon-row py-3">
            <a href="#" className="icon-button">
              <FontAwesomeIcon icon={faSquarePlus} style={{fontSize: iconSize}} /> 
            </a>
          </div>
          <div className="icon-row py-3">
            <a href="#" className="icon-button">
              <FontAwesomeIcon icon={faTicket} style={{fontSize: iconSize}} />
            </a>
          </div>
          <div className="icon-row py-3">
            <a href="#" className="icon-button">
              <FontAwesomeIcon icon={faCalendarDays} style={{fontSize: iconSize}} />
            </a>
          </div>
        </div>

        <div className="col-12 d-flex flex-column align-items-center mt-5">
          <div className="icon-row mt-5 py-3">
            <a href="#" className="icon-button">
              <FontAwesomeIcon icon={faCircleUser} style={{fontSize: iconSize}} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
