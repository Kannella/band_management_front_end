import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from '../components/Calendar/CalendarWidget';
import '../components/Calendar/calendar_components.css';
import { useAuthStore } from '../store/authStore';

const CalendarPage = () => {
  const { userId } = useAuthStore(); 
  const [events, setEvents] = useState([]);  
  const [loading, setLoading] = useState(true);  
  const [error, setError] = useState(null); 

  useEffect(() => {
    if (userId) {
      axios.get(`https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/Booking/GetBookingsForUser?userId=${userId}`)
        .then(response => {
          setEvents(response.data);  
          setLoading(false); 
        })
        .catch(error => {
          setError(error.message);  
          setLoading(false); 
        });
    }
  }, [userId]); 


  if (loading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
          <Calendar events={events} />
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;
