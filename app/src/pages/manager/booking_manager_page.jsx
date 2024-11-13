import React from 'react';
import PopUpEditBooking from '../../components/Booking/popup_edit_booking';
import BookingDetails from '../../components/Booking/details_booking';
import { Container, Row, Col } from 'react-bootstrap';

function BookingManagerPage() {
    return (
        <Container fluid className="pt-3 ms-3"

        >
            <Row className="mb-2">
                <Col xs={12} md={10}>
                    <h1 className="title-page">Name of Booking</h1>
                </Col>
            </Row>

            <Row className="mb-3">
                <Col xs={12} md="auto">
                    <div className="sub-text mt-1 mb-1">Event Details</div>
                </Col>
                <Col xs={12} md="auto" className="ms-3">
                    <PopUpEditBooking />
                </Col>
            </Row>

            <hr />

            <Row>
                <Col xs={12} md={8}>
                    <BookingDetails />
                </Col>
            </Row>
        </Container>
    );
}

export default BookingManagerPage;
