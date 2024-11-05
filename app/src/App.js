// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/nav_bar';

// Manager's Page
import HomeManagerPage from './pages/manager/home_manager_page';
import BandManagerPage from './pages/manager/band_manager_page';
import BookingManagerPage from './pages/manager/booking_manager_page';
import CalendarManagerPage from './pages/manager/calendar_manager_page';

import SignInPage from  './pages/sign_in_page';
import SignUpPage from  './pages/sign_up_page';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomeManagerPage />} />
          <Route path="/registration" element={<SignUpPage />} />
          <Route path="/login" element={<SignInPage />} />
          <Route path="/bands" element={<BandManagerPage />} />
          <Route path="/bookings" element={<BookingManagerPage />} />
          <Route path="/calendar" element={<CalendarManagerPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
