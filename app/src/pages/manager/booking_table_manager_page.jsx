import React from "react";
import TableComponent from "../../components/Booking/booking_table";
import { Container, Row, Col } from "react-bootstrap";

function BookingTableManagerPage() {
    return (
        <Container fluid className="pt-3 ms-3 mb-3" style={{ overflowX: "hidden" }}>
            <Row className="mb-2">
                <Col xs={12} md={10}>
                    <div className="title-page">Booking</div>
                </Col>
            </Row>

            <Row className="mb-3">
                <Col xs={12} md="auto">
                    <div className="sub-text mt-1 mb-1"><p>List of all the Events</p></div>
                </Col>
            </Row>

            <hr />

            <Row>
                <Col xs={12}>
                    <TableComponent />
                </Col>
            </Row>
        </Container>
    );
}

export default BookingTableManagerPage;
