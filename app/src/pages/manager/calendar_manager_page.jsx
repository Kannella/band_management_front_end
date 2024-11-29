import React from 'react';
import Calendar from '../../pages/manager/calendar';
import './calendar.css';


const CalendarManagerPage = () => {
  return (
    <div className='screen container-fluid'>
      <div className='col-11'>
        <h1 className='calendarTitle'>My Calendar</h1>
        <Calendar/> 
      </div>
    </div>    
  );
};

export default CalendarManagerPage;
