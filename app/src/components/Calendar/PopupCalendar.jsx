import React, { useState } from 'react';
import './calendar_components.css';
import { useAuthStore } from '../../store/authStore';

const CalendarPopup = () => {
  const {userId} = useAuthStore();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedDays, setSelectedDays] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

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
      setSelectedDays([...selectedDays, date]); //add a day to the selected days list
    }
  };

  const handleSubmit = async () => {
    try {
      
      for (const date of selectedDays) {
        const formattedDate = new Date(date);
        const availabilityDate = formattedDate.toISOString(); // Format ISO 8601
  
        const response = await fetch('https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/availability/AddAvailability', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            availabilityDate, 
            userId, 
          }),
        });
  
        if (response.ok) {
          console.log(`Availability for ${availabilityDate} submitted successfully.`);
        } else {
          alert('Failed to submit availability. Please try again.');
        }
      }
  
    
      setSelectedDays([]);
      alert(`Availability submitted successfully.`);
      window.location.reload();
    } catch (error) {
      console.error('Error:', error);
      alert('There was an error submitting your availability.');
    }
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
        <div className="mini-calendar-grid">
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
