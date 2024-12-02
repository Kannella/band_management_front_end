import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import ContainerWrapper from './components/container-wrapper';
import Layout from './components/Layout';

// Manager's Pages
import HomePage from './pages/HomePage'
import BandPage from './pages/BandPage';
import BookingTablePage from './pages/BookingTablePage';
import BookingPage from './pages/BookingPage';
import CalendarPage from './pages/CalendarPage';
import BandDetailsPage from './pages/BandDetailsPage';
import SignInPage from  './pages/SignInPage';
import SignUpPage from  './pages/SignUpPage';


function App() {

  return (
    <ContainerWrapper>
    <Router>
      <Routes>
        <Route path="/registration" element={<SignUpPage />} />
        <Route path="/login" element={<SignInPage />} />
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/bands" element={<BandPage />} />
          <Route path="/bookings/:id" element={<BookingPage />} />
          <Route path="/bookings-table" element={<BookingTablePage />} />
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/band/:id" element={<BandDetailsPage />} />
        </Route>
      </Routes>
    </Router>
  </ContainerWrapper>
  );
}

  export default App;
