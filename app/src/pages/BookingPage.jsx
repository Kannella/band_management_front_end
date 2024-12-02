import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PopUpEditBooking from '../components/Booking/BookingEditPopup';
import BookingDetails from '../components/Booking/BookingDetails';
import { Container, Row, Col } from 'react-bootstrap';
import { useAuthStore } from '../store/authStore';

function BookingPage() {
    
    const { id: bookingId } = useParams();
    const isManager = useAuthStore((state) => state.isManager);
    const [booking, setBooking] = useState(null);
    const [venue, setVenue] = useState(null);
    const [agent, setAgent] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Requisição do booking
                const bookingResponse = await axios.get(
                    `https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/Booking/${bookingId}`
                );
                const bookingData = bookingResponse.data;
                setBooking(bookingData);

                // Requisição do venue usando venueId do booking
                const venueResponse = await axios.get(
                    `https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/Venue/${bookingData.venueId}`
                );
                setVenue(venueResponse.data);

                // Requisição do agent usando agentId do booking
                const agentResponse = await axios.get(
                    `https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/Agent/${bookingData.agentId}`
                );
                setAgent(agentResponse.data);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError("Failed to load data. Please try again later.");
            }
        };

        fetchData();
    }, [bookingId]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!booking || !venue || !agent) {
        return <div>Loading...</div>;
    }

    return (
        <Container fluid className="pt-3 ms-3 mb-3">
            <Row className="mb-2">
                <Col xs={12} md={10}>
                    <h1 className="title-page">{booking.name} Booking</h1>
                </Col>
            </Row>

            <Row className="mb-3">
                <Col xs={12} md="auto">
                    <div className="sub-text mt-1 mb-1">Event Details</div>
                </Col>
                {isManager() &&(
                <Col xs={12} md="auto" className="ms-3">
                    <PopUpEditBooking bookingId = {booking.id}  />
                </Col>
                )}
            </Row>

            <hr />

            <Row>
                <Col xs={12} md={8}>

                    <BookingDetails booking={booking} venue={venue} agent={agent} />
                </Col>
            </Row>
        </Container>
    );
}

export default BookingPage;
