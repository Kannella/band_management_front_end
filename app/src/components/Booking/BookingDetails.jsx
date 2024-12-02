import React, { useState } from 'react';
import { Row, Col, Button, Container, Dropdown, DropdownButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

function BookingDetails( {booking, venue, agent}) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const getStatus = (stage) => {
        switch (stage) {
          case 1:
            return 'Final Booking'; 
          case 2:
            return 'Optional';   
          case 3:
            return 'Canceled';  
          default:
            return 'No Status';
        }
      };

      const getEvent = (event) => {
        switch (event) {
          case false:
            return 'Private'; 
          case true:
            return 'Public';    
          default:
            return 'No event status'
        }
      };


        
    
      
    // Mock Data
    const bookingInfo = {
        number: booking.bookingNumber,
        stage: getStatus(booking.status),
        description:booking.description,
        planning:booking.planning,
        isPublicEvent: getEvent(booking.isPublicEvent)

    };

    const agentInfo = {
        name: agent.name,
        email: agent.email,
        phone: agent.phoneNumber,
    };

    const venueInfo = {
        name: venue.name,
        email: venue.contactEmail,
        phone: venue.contactPhoneNumber,
    };

    const scheduleInfo = {
        soundcheck:booking.soundCheckTime,
        arrival: booking.arrivalTime,
        busLeaves: booking.tourbusLeaveTime,
        dinner: booking.dinnerTime,
        changeOver: booking.changeOverTime,
        showStart: booking.showStartTime,
        showEnd: booking.showEndTime,
    };

    const paymentInfo = {
        amount: booking.paymentDetails,
        method: 'Bank Transfer',
        status: 'Paid',
    };

    const logisticsInfo = {
        parking:booking.parkingDetails,
        food: booking.foodDetails,
        dressCode: booking.bookingNotes,
    };

    const convertDateTime = (timestamp) => {
        const date = new Date(timestamp);
        const day = String(date.getDate()).padStart(2, '0'); 
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Add 1 since getMonth() is zero-based
        const year = date.getFullYear(); 
        
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        
        return ` ${hours}:${minutes} - ${day}/${month}`;
    };

      const formattedScheduleInfo = Object.entries(scheduleInfo).reduce((acc, [key, value]) => {
        acc[key] = convertDateTime(value);
        return acc;
    }, {});

    return (
        <Container fluid className="p-4">
            {/* Navegação */}
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
                    <a href="#payment-info" className="btn btn-link text-dark px-2">
                        Payment
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
                <Dropdown.Item href="#payment-info">Payment</Dropdown.Item>
                <Dropdown.Item href="#logistics-info">Logistics</Dropdown.Item>
            </DropdownButton>

            {/* Informações Mockadas */}
            <Row>
                <Col id="booking-info" className="mb-4">
                    <h4 className="mb-3 text-start">Booking Information</h4>
                    <Row>
                        <Col xs={12} md={4} className="text-start">
                            <h6 className='bold-sub-text'>Booking Number: <span className='sub-text'>{bookingInfo.number}</span></h6>
                        </Col>
                        <Col xs={12} md={6} className="text-start">
                            <h6 className='bold-sub-text'>Stage of Booking: <span className='sub-text'>{bookingInfo.stage}</span></h6>
                        </Col>
                    </Row>
                    <Row>
                    <Col xs={12} md={4} className="text-start">
                            <h6 className='bold-sub-text'>Booking Description: <span className='sub-text'>{bookingInfo.description}</span></h6>
                        </Col>  
                        <Col xs={12} md={6} className="text-start">
                            <h6 className='bold-sub-text'>Booking Planning: <span className='sub-text'>{bookingInfo.planning}</span></h6>
                        </Col>  
                    </Row>
                    <Row>
                    <Col xs={12} md={6} className="text-start">
                            <h6 className='bold-sub-text'>Event is: <span className='sub-text'>{bookingInfo.isPublicEvent}</span></h6>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <hr />

            <Row>
                <Col id="agent-info" className="mb-4">
                    <h5 className="mb-3 text-start">Agent Information</h5>
                    <Row>
                        <Col xs={12} md={4} className="text-start">
                            <h6 className='bold-sub-text'>Name: <span className='sub-text'>{agentInfo.name}</span></h6>
                        </Col>
                        <Col xs={12} md={8} className="text-start">
                            <h6 className='bold-sub-text'>Email: <span className='sub-text'>{agentInfo.email}</span></h6>
                        </Col>
                        <Col xs={12} md={6} className="text-start">
                            <h6 className='bold-sub-text'>Phone: <span className='sub-text'>{agentInfo.phone}</span></h6>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row>
                <Col id="venue-info" className="mb-4">
                    <h5 className="mb-3 text-start">Venue</h5>
                    <Row className='mb-4'>
                        <Col xs={12} md={8} className="text-start">
                            <Button variant="primary" style={{ borderRadius: '20px', padding: '0.5rem 1rem' }}>
                                <FontAwesomeIcon icon={faLocationDot} size="lg" style={{ marginRight: '8px' }} />
                                Open Route
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={4} className="text-start">
                            <h6 className='bold-sub-text'>Name: <span className='sub-text'>{venueInfo.name}</span></h6>
                        </Col>
                        <Col xs={12} md={6} className="text-start">
                            <h6 className='bold-sub-text'>Email: <span className='sub-text'>{venueInfo.email}</span></h6>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12} md={4} className="text-start">
                            <h6 className='bold-sub-text'>Phone: <span className='sub-text'>{venueInfo.phone}</span></h6>
                        </Col>
                        <Col xs={12} md={6} className="text-start">
                            <h6 className='bold-sub-text'>Adress: <span className='sub-text'>{venueInfo.phone}</span></h6>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row>
                <Col id="schedule-info" className="mb-4">
                    <h5 className="mb-3 text-start">Event Schedule</h5>
                    {Object.entries(formattedScheduleInfo).map(([key, value]) => (
                        <Row className="mb-2" key={key}>
                            <Col className="text-start">
                                <h6 className='bold-sub-text'>
                                    {key.replace(/([A-Z])/g, ' $1')}: <span className='sub-text'>{value}</span>
                                </h6>
                            </Col>
                        </Row>
                    ))}
                </Col>
            </Row>

            <Row>
                <Col id="payment-info" className="mb-4">
                    <h5 className="mb-3 text-start">Payment</h5>
                    <Row>
                        <Col xs={12} md={6} className="text-start">
                            <h6 className='bold-sub-text'>Amount: <span className='sub-text'>{paymentInfo.amount}</span></h6>
                        </Col>
                    </Row>
                </Col>
            </Row>

            <Row>
                <Col id="logistics-info" className="mb-4">
                    <h5 className="mb-3 text-start">Logistics</h5>
                    <Row>
                        <Col className="text-start">
                            <h6 className='bold-sub-text'>Parking Availability: <span className='sub-text'>{logisticsInfo.parking}</span></h6>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-start">
                            <h6 className='bold-sub-text'>Food Details: <span className='sub-text'>{logisticsInfo.food}</span></h6>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-start">
                            <h6 className='bold-sub-text'>More Descriptions: <span className='sub-text'>{logisticsInfo.dressCode}</span></h6>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

export default BookingDetails;
