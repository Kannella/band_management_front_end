import React, { useState, useEffect } from 'react';
import CalendarPopup from './calendarPopUp';
import './calendar_components.css';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [days, setDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen); // open or close the popup
  };


  const items = [
    { id: 1, date: '2024-11-27', name: 'Event 1' },
    { id: 2, date: '2024-11-28', name: 'Event 2' },
    { id: 3, date: '2024-12-01', name: 'Event 3' },
  ];

  useEffect(() => {
    generateCalendar(currentDate);
  }, [currentDate]);

  const generateCalendar = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const calendarDays = [];

    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(null);
    }

    for (let i = 1; i <= lastDate; i++) {
      calendarDays.push(i);
    }

    setDays(calendarDays);
  };

  const isToday = (day) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const isWeekend = (day) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6; // Sunday (0) and Saturday (6)
  };

  const handlePreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDayClick = (day) => {
    if (!day) return;
    const clickedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    //  if a day selected was already selected, the filter will end
    if (selectedDate && clickedDate.getTime() === selectedDate.getTime()) {
      setSelectedDate(null);
    } else {
      setSelectedDate(clickedDate);
    }
  };
  
  const filteredItems = items.filter((item) => {
    if (!selectedDate) return true; //no filter if a date is selected
    return item.date === selectedDate.toISOString().split('T')[0];
  });


  return (
     <div className='row col'>
        <div className='col-3 text-center'>
          <button className="addAvailabilityButton" onClick={togglePopup}>
            Add your Availability
          </button>
            {isPopupOpen && <CalendarPopup />}          
          <br />
          <br />
          <div className="square-box">
            <ul className="item-list">
              {filteredItems.length > 0 ? (
                <ul className="item-list">
                  {filteredItems.map((item) => (
                    <li className="list-item" key={item.id}>{item.name}</li>
                  ))}
                </ul>
              ) : (
                <li className="list-item">No events for this day</li>
              )}
            </ul>
          </div>
        </div>
        <div className='col-8'>
          <div className="calendar-container">
            <div className="calendar">
              <div className="calendar-header">
                <button onClick={handlePreviousMonth}>Previous</button>
                <h2>
                  {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
                </h2>
                <button onClick={handleNextMonth}>Next</button>
              </div>
              <div className="calendar-grid">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                  <div key={day} className="calendar-day-label">
                    {day}
                  </div>
                ))}
                {days.map((day, index) => {
                  const isSelected =
                    selectedDate &&
                    day === selectedDate.getDate() &&
                    currentDate.getMonth() === selectedDate.getMonth() &&
                    currentDate.getFullYear() === selectedDate.getFullYear();

                  return (
                    <button
                      key={index}
                      className={`calendar-day ${day ? '' : 'empty'} 
                        ${isToday(day) ? 'today' : ''} 
                        ${isWeekend(day) ? 'weekend' : ''} 
                        ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleDayClick(day)}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>  
  );
};

export default Calendar;