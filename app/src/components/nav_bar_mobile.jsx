import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../assets/styles/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as Logo } from '../assets/images/logo_vector.svg';

function NavBarMobile({navbarSize, logoSize} ) {

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
    console.log('abrindo')
  };

  const handleItemClick = (event) => {
    event.preventDefault();
    setIsOpen(false)
  }

  return (
    <div 
      className="nav-container-mobile d-flex"
      style={{
        height: navbarSize,
        width:'100%'
      }}
    >
      <div className="d-flex align-items-center " style={{ gap: '1vw' }}>
        <Logo Logo width={logoSize} height={logoSize}/>
        <div className="logo-text">Band Manager</div>
      </div>

      {/* Ícone de menu (Hambúrguer) */}
        <FontAwesomeIcon className="icon-hamburguer" icon={faBars}  onClick={toggleDropdown}/>

      {/* Menu Dropdown */}
      {isOpen && (
        <div className="dropdown-menu d-flex">
        <Link to="/" className="dropdown-item" onClick={() => setIsOpen(false)}>Home</Link>
        <Link to="/bands" className="dropdown-item" onClick={() => setIsOpen(false)}>Bands</Link>
        <Link to="/bookings-table" className="dropdown-item" onClick={() => setIsOpen(false)}>Bookings</Link>
        <Link to="/calendar" className="dropdown-item" onClick={() => setIsOpen(false)}>Calendar</Link>
        <Link to="/me" className="dropdown-item" onClick={() => setIsOpen(false)}>Profile</Link>
      </div>
      )}
    </div>
  );
}

export default NavBarMobile;
