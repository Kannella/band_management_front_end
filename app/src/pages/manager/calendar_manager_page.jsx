import React from 'react';
import Calendar from '../../components/Calendar/calendar';
import '../../components/Calendar/calendar_components.css';

const CalendarManagerPage = () => {
  return (
    <div className="container-fluid pt-3 ms-3 mb-3" style={{ overflowX: "hidden" }}>
      <div className="row mb-2">
        <div className="col-12 col-md-10">
          <h1 className="title-page">My Calendar</h1>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-12 col-md-auto">
          <div className="sub-text mt-1 mb-1 text-wrap">
            <p>Check your events and select availability for next bookings</p>
          </div>
        </div>
      </div>
      <hr />

      <div className="row justify-content-center">
        <div className="col-12 col-md-11 col-lg-10">
          <Calendar />
        </div>
      </div>
    </div>    
  );
};

export default CalendarManagerPage;
