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
  import BandDetailsPage from "./components/Band/band_details_page";

  function App() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomeManagerPage />} />
            <Route path="/bands" element={<BandManagerPage />} />
            <Route path="/bookings" element={<BookingManagerPage />} />
            <Route path="/calendar" element={<CalendarManagerPage />} />
            <Route path="/band/:id" element={<BandDetailsPage />} />
          </Routes>
        </div>
      </Router>
    );
  }

  export default App;
