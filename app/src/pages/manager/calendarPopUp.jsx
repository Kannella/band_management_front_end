import React, { useState } from 'react';
import './calendar.css';

const CalendarPopup = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  //  method to open and close a pop up
    const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
    };
    const handleRefresh = () => {
        window.location.reload();
    };

  // method to create the calendar
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const days = [];

    // add blank spaces in the begining of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // add days of the month
    for (let i = 1; i <= lastDate; i++) {
      days.push(i);
    }

    return days;
  };

  // method that runs how the days will be selected
  const handleDayClick = (day) => {
    if (!day) return; // ignores when a blank space is selected

    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);

    if (selectedDays.some((d) => d.getTime() === date.getTime())) {
      setSelectedDays(selectedDays.filter((d) => d.getTime() !== date.getTime())); // remove the day that was already selected
    } else {
      setSelectedDays([...selectedDays, date]); //add a day to de selected days list
    }
  };

  // method to send the selected days
  const handleSubmit = async () => {
    // convert the days selected to day/month/year
    const selectedDates = selectedDays.map((date) => ({
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
    }));

    // send the data to the DB
    console.log('Selected Days:', selectedDates);
    alert(`Sent Days: ${selectedDates.map(date => `${date.day}/${date.month}/${date.year}`).join(', ')}`);
    window.location.reload();
  };

  // method to change the month 
  const changeMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction); // direction can be +1 to next month or -1 to the previous one
    setCurrentDate(newDate);
  };

  return (
        <div className="popup-overlay">
            <div className="popup-content">
                <h2>Select days you are available</h2>
                <div className="mini-calendar-header">
                    <button onClick={() => changeMonth(-1)}>&lt;</button>
                    <span>{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</span>
                    <button onClick={() => changeMonth(1)}>&gt;</button>
                </div>
                <div className="calendar-grid">
                    {generateCalendarDays().map((day, index) => (
                        <button
                        key={index}
                        className={`calendar-day ${selectedDays.some(d => d.getDate() === day && d.getMonth() === currentDate.getMonth()) ? 'selected' : ''}`}
                        onClick={() => handleDayClick(day)}
                        >
                        {day}
                        </button>
                    ))}
                </div>
                <br />
                <div className='mini-calendar-buttons row'>
                    <button onClick={handleSubmit}>Submit</button>
                    <button onClick={handleRefresh}>Close</button>
                </div>
            </div>
        </div>
  );
};

export default CalendarPopup;
