import React from "react";
import { Container, Stack } from "react-bootstrap";
import PopupBookingBand from "./poup_booking_band";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faLocationDot } from '@fortawesome/free-solid-svg-icons';
import './booking_components.css';

function BookingCard() {
  return (
    <Container 
      className="booking-card-container mb-2">
      <Stack direction="horizontal" gap={2} className="align-items-center flex-wrap">
        
        <Stack className="text-start date-stack">
          <div className="text-data">Friday</div>
          <div className="subtext-data">18</div>
        </Stack>
        

        <Stack  gap={{ xs: 0, sm: 2 }} className="info-stack ">
          <Stack direction="horizontal" gap={2} className="align-items-center card-booking-text">
            <FontAwesomeIcon icon={faClock} />
            <span>show starts at 09:00 AM</span>
          </Stack>
          <Stack direction="horizontal" gap={2} className="align-items-center card-booking-text">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>location: Arena Examples</span>
          </Stack>
        </Stack>

        <Stack gap={4} className="name-band-stack ">
          <div className="card-name-booking-text">Name Title of Booking</div>
          <div className="card-booking-text">Band: Band One</div>
        </Stack>

        <Stack gap={4} className=" details-popup py-4">
            <PopupBookingBand />
        </Stack>


      </Stack>
    </Container>
  );
}

export default BookingCard;
