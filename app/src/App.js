import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import ContainerWrapper from './components/container-wrapper';
import Layout from './components/Layout';

// Manager's Pages
import HomeManagerPage from './pages/HomePage'
import BandManagerPage from './pages/BandPage';
import BookingTableManagerPage from './pages/BookingTablePage';
import BookingManagerPage from './pages/BookingPage';
import CalendarManagerPage from './pages/CalendarPage';
import BandDetailsPage from "./components/Band/BandDetailsPage";
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
