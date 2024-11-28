import React, { useState } from "react";
import '../assets/styles/styles.css';
import 'bootstrap/dist/css/bootstrap.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { ReactComponent as Logo } from '../assets/images/logo_vector.svg';

function NavBarMobile() {
  // Estado para controlar o dropdown
  const [isOpen, setIsOpen] = useState(false);

  // Função para alternar o estado do dropdown
  const toggleDropdown = () => {setIsOpen(!isOpen)
    console.log('abrindo')
  };

  return (
    <div 
      className="nav-container d-flex align-items-center justify-content-between flex-wrap"
      style={{
        position: 'sticky',
        top: 0,
        width: '100%',
        height: '12vh',
      }}
    >
      <div className="d-flex align-items-center" style={{ gap: '1vw' }}>
        <Logo width="36" height="36" />
        <div className="logo-text">Band Manager</div>
      </div>

      {/* Ícone de menu (Hambúrguer) */}
      <div className="d-flex align-items-center" onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
        <FontAwesomeIcon icon={faBars} style={{ fontSize: '28px' }} />
      </div>

      {/* Menu Dropdown */}
      {isOpen && (
        <div className="dropdown-menu" style={{top: '12vh', right: 0, backgroundColor: 'white', borderRadius: '8px', padding: '10px' }}>
          <a href="#home" className="dropdown-item">Home</a>
          <a href="#create" className="dropdown-item">Create</a>
          <a href="#bookings" className="dropdown-item">Bookings</a>
          <a href="#calendar" className="dropdown-item">Calendar</a>
          <a href="#profile" className="dropdown-item">Profile</a>
        </div>
      )}
    </div>
  );
}

export default NavBarMobile;
