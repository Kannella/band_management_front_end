import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

    import Navbar from './components/nav_bar';        
import NavBarMobile from './components/nav_bar_mobile';

  // Manager's Pages
  import HomeManagerPage from './pages/manager/home_manager_page';
  import BandManagerPage from './pages/manager/band_manager_page';
  import BookingManagerPage from './pages/manager/booking_manager_page';
  import CalendarManagerPage from './pages/manager/calendar_manager_page';
  import BandDetailsPage from "./components/Band/band_details_page";

function App() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const updateSize = () => {
      setIsMobile(window.innerWidth < 600);
      setIsTablet(window.innerWidth >= 600 && window.innerWidth < 920);
    };

    window.addEventListener('resize', updateSize);
    updateSize(); 

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const logoSize = isTablet ? "30px" : "60px";
  const iconSize = isTablet ? "28px" : "36px";
  const iconSizeHome = isTablet ? "24px" : "36px";

  return (
    <Router>
      <div 
        style={{
          display: 'flex', 
          flexDirection: isMobile ? 'column' : 'row', 
          height: '100vh',
        }}
      >

        {isMobile ? (
          <NavBarMobile 
            style={{
              width: '100%', 
              height: '10vw', 
              position: 'sticky', 
              top: 0
            }}
          />
        ) : (
          <Navbar logoSize={logoSize} iconSize={iconSize} iconSizeHome={iconSizeHome} />
        )}

        <div
          style={{
            marginLeft: '3vw',
            marginTop: '2vw',
            width: '100%'  
          }}
        >
          <Routes>
            <Route path="/" element={<HomeManagerPage />} />
            <Route path="/bands" element={<BandManagerPage />} />
            <Route path="/bookings" element={<BookingManagerPage />} />
            <Route path="/calendar" element={<CalendarManagerPage />} />
            <Route path="/band/:id" element={<BandDetailsPage />} />

          </Routes>
        </div>
      </div>
    </Router>
  );
}

  export default App;
