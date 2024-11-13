import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

//hooks screen size
import useScreenSizeController from './hooks/useScreenSizeController';

import Navbar from './components/nav_bar';
import NavBarMobile from './components/nav_bar_mobile';
import ContainerWrapper from './components/container-wrapper';

// Manager's Pages
import HomeManagerPage from './pages/manager/home_manager_page';
import BandManagerPage from './pages/manager/band_manager_page';
import BookingTableManagerPage from './pages/manager/booking_table_manager_page';
import BookingManagerPage from './pages/manager/booking_manager_page';
import CalendarManagerPage from './pages/manager/calendar_manager_page';

function App() {
  const { isMobile, logoSize, iconSize, iconSizeHome, navbarSize, marginLeft, marginTop } = useScreenSizeController();

  return (
    <ContainerWrapper>
      <Router>
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
            <NavBarMobile />
          ) : (
            <Navbar logoSize={logoSize} iconSize={iconSize} iconSizeHome={iconSizeHome} navbarSize={navbarSize} />
          )}

          <div
            style={{
              marginLeft: marginLeft,
              marginTop: marginTop,
              width: '100%',
              overflowY: 'auto',
            }}
          >
            <Routes>
              <Route path="/" element={<HomeManagerPage />} />
              <Route path="/bands" element={<BandManagerPage />} />
              <Route path="/bookings" element={<BookingManagerPage />} />
              <Route path="/bookings-table" element={<BookingTableManagerPage />} />
              <Route path="/calendar" element={<CalendarManagerPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ContainerWrapper>
  );
}

export default App;
