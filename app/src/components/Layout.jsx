import React from 'react';
import { Outlet } from 'react-router-dom';
import useScreenSizeController from '../hooks/useScreenSizeController';
import Navbar from './nav_bar';
import NavBarMobile from './nav_bar_mobile';

function Layout () {
    const { isMobile, logoSize, iconSize, iconSizeHome, navbarSize, marginLeft, marginRight, marginTop } = useScreenSizeController()

    return(
        <div
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          height: '100vh',
          width: '100%',
          overflow: 'hidden',
        }}
      >
        {isMobile ? (
          <NavBarMobile logoSize={logoSize} navbarSize={navbarSize} />
        ) : (
          <Navbar logoSize={logoSize} iconSize={iconSize} iconSizeHome={iconSizeHome} navbarSize={navbarSize} />
        )}
        <div
          style={{
            marginLeft: marginLeft,
            marginRight: marginRight,
            marginTop: marginTop,
            width: '100%',
            overflowY: 'auto',
            paddingTop: isMobile ? "64px" : "0px",
          }}
        >
          <Outlet />
        </div>
      </div>
    );
};

export default Layout;