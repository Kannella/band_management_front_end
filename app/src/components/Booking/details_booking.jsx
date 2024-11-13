import React, { useState } from 'react';
import { Row, Col, Button, Container, Dropdown, DropdownButton, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

function BookingDetails() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const songs = [
        { id: 1, name: 'Song One' },
        { id: 2, name: 'Song Two' },
        { id: 3, name: 'Song Three' },
        { id: 4, name: 'Song Four' },
        { id: 5, name: 'Song Five' },
        { id: 6, name: 'Song Six' },
        { id: 7, name: 'Song Seven' },

    ];

    return (
        <Container fluid className="p-4">
            <Row className="mb-3 d-none d-md-flex" style={{ justifyContent: 'flex-start' }}>
                <Col xs="auto" className="mb-2">
                    <a href="#booking-info" className="btn btn-link text-dark px-2">
                        Information
                    </a>
                </Col>
                <Col xs="auto" className="mb-2">
                    <a href="#agent-info" className="btn btn-link text-dark px-2">
                        Agent Information
                    </a>
                </Col>
                <Col xs="auto" className="mb-2">
                    <a href="#venue-info" className="btn btn-link text-dark px-2">
                        Venue Information
                    </a>
                </Col>
                <Col xs="auto" className="mb-2">
                    <a href="#schedule-info" className="btn btn-link text-dark px-2">
                        Event Schedule
                    </a>
                </Col>
                <Col xs="auto" className="mb-2">
                    <a href="#set-info" className="btn btn-link text-dark px-2">
                        Set Details
                    </a>
                </Col>
                <Col xs="auto" className="mb-2">
                    <a href="#logistics-info" className="btn btn-link text-dark px-2">
                        Logistics
                    </a>
                </Col>
            </Row>

            <DropdownButton
                title="Navigation"
                onClick={toggleDropdown}
                className="d-md-none mb-4"
                variant="outline-dark"
                style={{ width: '100%' }}
            >
                <Dropdown.Item href="#booking-info">Information</Dropdown.Item>
                <Dropdown.Item href="#agent-info">Agent Information</Dropdown.Item>
                <Dropdown.Item href="#venue-info">Venue Information</Dropdown.Item>
                <Dropdown.Item href="#schedule-info">Event Schedule</Dropdown.Item>
                <Dropdown.Item href="#set-info">Set Details</Dropdown.Item>
                <Dropdown.Item href="#logistics-info">Logistics</Dropdown.Item>
            </DropdownButton>

            {/* Conteúdo dos Links */}
            <Row>
                <Col id="booking-info" className="mb-4">
                    <h4 className="mb-3">Booking Information</h4>
                    <Row className="mb-3">
                        <Col xs={12} md={6}>Booking Number: 2001</Col>
                        <Col xs={12} md={6}>Stage of Booking: Final Booking</Col>
                    </Row>
                </Col>
            <hr />
            </Row>

            <Row>
                <Col id="agent-info" className="mb-4">
                    <h5 className="mb-3">Agent Information</h5>
                    <Row className="mb-3">
                        <Col xs={12} md={4}>Name: James Doe</Col>
                        <Col xs={12} md={8}>Email Address: exemplo.usuario@exemplo.com</Col>
                        <Col xs={12} md={6}>Phone Number: +31612345678</Col>
                    </Row>
                </Col>
            </Row>

            <Row>
                <Col id="venue-info" className="mb-4">
                    <h5 className="mb-3">Venue</h5>
                    <Row className="mb-3">
                    <Col xs={12} md={8}>
                            <Button variant="primary" style={{ borderRadius: '20px', padding: '0.5rem 1rem', width: 'auto' }}>
                                <FontAwesomeIcon icon={faLocationDot} size="lg" style={{ marginRight: '8px' }} />
                                Open Route
                            </Button>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col xs={12} md={4}>Name: Arena Example</Col>
                    </Row>
                    <Row className="mb-3">
                        <Col xs={12} md={6}>Email Address: exemplo.usuario@exemplo.com</Col>
                        <Col xs={12} md={6}>Phone Number: +31612345678</Col>
                    </Row>
                </Col>
            </Row>

            <Row>
                <Col id="schedule-info" className="mb-4">
                    <h5 className="mb-3">Event Schedule</h5>
                    <Row className="mb-3">
                        <Col xs={12} md={6}>Soundcheck Time: 7:30 AM</Col>
                        <Col xs={12} md={6}>Band Arrival Time: 7:00 AM</Col>
                    </Row>
                    <Row className="mb-3">
                        <Col xs={12} md={6}>Tour Bus Leaves Time: 8:00 AM</Col>
                        <Col xs={12} md={6}>Lunch/Dinner Time: 7:30 AM</Col>
                    </Row>
                    <Row className="mb-3">
                        <Col xs={12}>Change Over Time: 7:00 AM</Col>
                    </Row>
                    <Row className="mb-3">
                        <Col xs={12} md={6}>Show Start Time: 09:00 AM</Col>
                        <Col xs={12} md={6}>Show End Time: 11:00 AM</Col>
                    </Row>
                </Col>
            </Row>

            <Row>
                <Col id="set-info" className="mb-4">
                    <h5 className="mb-3">Set Songs</h5>
                    <div style={{ maxHeight: '200px', maxWidth:'48vw',overflowY: 'auto' }}>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Song Order</th>
                                    <th>Song Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {songs.map(song => (
                                    <tr key={song.id}>
                                        <td
                                        sx={{
                                            maxWidth: '50px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' 
                                        }}
                                        >{song.id}</td>
                                        <td>{song.name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </Col>
            </Row>

            <Row >
                
                <Col id="logistics-info" className="mb-4">
                    <h5>Logistics</h5>
                    <Row className="mb-3">
                        <Col xs={12} md={6}>Parking Availability: Yes</Col>
                        <Col xs={12} md={6}>Food And Drink Availability: Yes</Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>Dress Code Requirements: Black Attire</Col>
                    </Row>
                    <Row className="mb-3">
                        <Col>Sound System:</Col>
                    </Row>
                    
                    <Container
                        style={{
                            background: '#881337E0',
                            color: '#0F172A',
                            padding: '8px 12px',
                            display: 'inline-block',
                            width: 'auto',
                            borderRadius: '8px'
                        }}
                    >
                        <span>Provided By the Band</span>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
}

export default BookingDetails;
