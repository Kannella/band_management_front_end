import React from "react";
import { Container, Stack, Button } from "react-bootstrap";
import PopupBookingBand from "./BookingBandPopup";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faLocationDot, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import './booking_components.css';
import { useNavigate } from "react-router-dom";
import useScreenSizeController from "../../hooks/useScreenSizeController";

function BookingCard({ booking, venue, band, agent }) {
  const navigate = useNavigate();

  const {isMobile} = useScreenSizeController();

  const showStartDate = new Date(booking.showStartTime);
  
  const showTime = `${showStartDate.getHours()}:${showStartDate.getMinutes().toString().padStart(2, "0")}`;
  
 
  const dayOfWeek = showStartDate.toLocaleString("en-US", { weekday: "long" });
  const formattedDate = showStartDate.toLocaleString("en-US", { day: "numeric" });
  
  const bookingInfo = {
    data: showTime,
    name: booking.name,
  }

  const venueInfo = {
    venueName: venue,
  }

  const bandInfo = {
    bandName: band,
  }

  const agentInfo = {
    agentName: agent,
  }

  const handleGoToBooking = () => {
    navigate(`/bookings/${booking.id}`); // Redireciona para a página de detalhes
  };

  return (
    <Container className="booking-card-container mb-2">
      <Stack direction="horizontal" gap={2} className="align-items-center flex-wrap">
        
        <Stack className="text-start date-stack">
          <div className="text-data">{dayOfWeek}</div>
          <div className="subtext-data">{formattedDate}</div> 
        </Stack>

        <Stack gap={{ xs: 0, sm: 2 }} className="info-stack">
          <Stack direction="horizontal" gap={2} className="align-items-center card-booking-text">
            <FontAwesomeIcon icon={faClock} />
            <span>Show starts at {bookingInfo.data}</span>
          </Stack>
          <Stack direction="horizontal" gap={2} className="align-items-center card-booking-text">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>Location: {venueInfo.venueName}</span>
          </Stack>
        </Stack>

        <Stack gap={2} className="info-stack">
          <div className="card-name-booking-text">{bookingInfo.name}</div>
          <div className="card-booking-text">Band: {bandInfo.bandName}</div>
        </Stack>

        <Stack gap={4} className="details-popup py-4">
          {/* Botão pequeno e responsivo */}
          <Button 
            variant="secondary" 
            size="sm" // Tamanho pequeno
            className="text-nowrap responsive-button" 
            onClick={handleGoToBooking}
            style={
              {
                width: isMobile? '40px' : "80px"
              }
            }
          >
             {isMobile ? <FontAwesomeIcon icon={faChevronDown} /> : 'Details'}
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}

export default BookingCard;
