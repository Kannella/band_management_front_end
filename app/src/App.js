import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import ContainerWrapper from './components/container-wrapper';
import Layout from './components/Layout';

// Manager's Pages
import HomeManagerPage from './pages/manager/home_manager_page';
import BandManagerPage from './pages/manager/band_manager_page';
import BookingTableManagerPage from './pages/manager/booking_table_manager_page';
import BookingManagerPage from './pages/manager/booking_manager_page';
import CalendarManagerPage from './pages/manager/calendar_manager_page';
import BandDetailsPage from "./components/Band/band_details_page";
import SignInPage from  './pages/sign_in_page';
import SignUpPage from  './pages/sign_up_page';


function App() {

  return (
    <ContainerWrapper>
    <Router>
      <Routes>
        <Route path="/registration" element={<SignUpPage />} />
        <Route path="/login" element={<SignInPage />} />
        <Route element={<Layout />}>
          <Route path="/" element={<HomeManagerPage />} />
          <Route path="/bands" element={<BandManagerPage />} />
          <Route path="/bookings" element={<BookingManagerPage />} />
          <Route path="/bookings-table" element={<BookingTableManagerPage />} />
          <Route path="/calendar" element={<CalendarManagerPage />} />
          <Route path="/band/:id" element={<BandDetailsPage />} />
        </Route>
      </Routes>
    </Router>
  </ContainerWrapper>
  );
}

  export default App;
