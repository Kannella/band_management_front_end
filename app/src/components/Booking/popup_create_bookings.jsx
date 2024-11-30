import { useState } from 'react';
import {Button, Modal, Form, Col,Row} from 'react-bootstrap';
import './booking_components.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import useScreenSizeController from '../../hooks/useScreenSizeController';

import './booking_components.css';

function PopUpCreateBooking() {
  const [show, setShow] = useState(false);
  const [newVenue, setNewVenue] = useState(false);
  const [venueName, setVenueName] = useState("");
  const [venueContactName, setVenueContactName] = useState("");
  const [venuePhone, setVenuePhone] = useState("");
  const [venueEmail, setVenueEmail] = useState("");
  const [venueAddress, setVenueAddress] = useState("");
  const [newAgent, setNewAgent] = useState(false);
  const [AgentName, setAgentName] = useState("");
  const [AgentContactName, setAgentContactName] = useState("");
  const [AgentPhone, setAgentPhone] = useState("");
  const [AgentEmail, setAgentEmail] = useState("");

  const handleVenueChange = (e) => {
    const value = e.target.value;
    if (value === "new") {
      setNewVenue(true);
    } else {
      setNewVenue(false);
      setVenueName(value);
    }
  };

  const handleAgentChange = (e) => {
    const value = e.target.value;
    if (value === "new") {
      setNewAgent(true);
    } else {
      setNewAgent(false);
      setAgentName(value);
    }
  };


  const { isMobile } = useScreenSizeController();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="secondary"
        size="sm"
        className="d-flex align-items-center btn-add-booking"
        onClick={handleShow}
      >
        <FontAwesomeIcon icon={faPlus} style={{ marginRight: isMobile ? 0 : 10 }} />
        {!isMobile && 'Add New Booking'}
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        scrollable
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Band Selection */}
            <Form.Text className="mb-4">Select Band</Form.Text>
            <Row>
              <Col lg={6}>
              <Form.Group controlId="bookingBand">
                <Form.Label>Band</Form.Label>
                <Form.Select>
                  <option>Band one</option>
                  <option>Band two</option>
                </Form.Select>
              </Form.Group>
              </Col>

            </Row>

            {/* Booking Information */}
            <Form.Text as="h1" className="mb-3">Booking Information</Form.Text>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="bookingName">
                  <Form.Label>Booking Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter name" />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="bookingNumber">
                  <Form.Label>Booking Number</Form.Label>
                  <Form.Control type="text" placeholder="Enter number" />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="bookingStage">
                  <Form.Label>Stage of Booking</Form.Label>
                  <Form.Select>
                    <option>Select</option>
                    <option>Optional</option>
                    <option>Final Booking</option>
                    <option>Canceled</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
            <Col md={4}>
                <Form.Group  className="mb-3" controlId="paymentDetails">
                  <Form.Label>Payment Details</Form.Label>
                  <Form.Control type="text" placeholder="Enter payment details" />
                </Form.Group>
              </Col>
            </Row>
            {/* Venue Information */}
            <Form.Text className="mb-3"><strong>Agent Information</strong></Form.Text>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="agentName">
                  <Form.Label>Agent</Form.Label>
                  <Form.Control type="text" placeholder="Enter name" />
                </Form.Group>
              </Col>
            </Row>

           {/* Venue Information */}
           <Form.Text className="mb-3"><strong>Venue Information</strong></Form.Text>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="venueSelection">
                  <Form.Label>Venue</Form.Label>
                  <Form.Select onChange={handleVenueChange}>
                    <option value="">Select an existing venue</option>
                    <option value="venue1">Venue 1</option>
                    <option value="venue2">Venue 2</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                {/* Add New Venue Button */}
                <Button
                  variant="outline-dark"
                  size="sm"
                  onClick={() => setNewVenue(true)}
                >
                  Add New Venue
                </Button>
              </Col>
            </Row>

            {/* If adding a new venue, display these fields */}
            {newVenue && (
              <>
                <Row className="mb-3">
                  <Col md={4}>
                    <Form.Group controlId="venueName">
                      <Form.Label>Venue Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter venue name"
                        value={venueName}
                        onChange={(e) => setVenueName(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="venueContactName">
                      <Form.Label>Contact Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter contact name"
                        value={venueContactName}
                        onChange={(e) => setVenueContactName(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="venuePhone">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter phone number"
                        value={venuePhone}
                        onChange={(e) => setVenuePhone(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={4}>
                    <Form.Group controlId="venueEmail">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email address"
                        value={venueEmail}
                        onChange={(e) => setVenueEmail(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="venueAddress">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter address"
                        value={venueAddress}
                        onChange={(e) => setVenueAddress(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </>
            )}

            {/* Agent Information */}
           <Form.Text className="mb-3"><strong>Agent Information</strong></Form.Text>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="AgentSelection">
                  <Form.Label>Agent</Form.Label>
                  <Form.Select onChange={handleAgentChange}>
                    <option value="">Select an existing Agent</option>
                    <option value="Agent1">Agent 1</option>
                    <option value="Agent2">Agent 2</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                {/* Add New Agent Button */}
                <Button
                  variant="outline-dark"
                  size="sm"
                  onClick={() => setNewAgent(true)}
                >
                  Add New Agent
                </Button>
              </Col>
            </Row>

            {/* If adding a new Agent, display these fields */}
            {newAgent && (
              <>
                <Row className="mb-3">
                  <Col md={4}>
                    <Form.Group controlId="AgentName">
                      <Form.Label>Agent Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Agent name"
                        value={AgentName}
                        onChange={(e) => setAgentName(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="AgentContactName">
                      <Form.Label>Contact Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter contact name"
                        value={AgentContactName}
                        onChange={(e) => setAgentContactName(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="AgentPhone">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter phone number"
                        value={AgentPhone}
                        onChange={(e) => setAgentPhone(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col md={4}>
                    <Form.Group controlId="venueEmail">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Enter email address"
                        value={venueEmail}
                        onChange={(e) => setVenueEmail(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </>
            )}

            {/* Event Schedule */}
            <Form.Text className="mb-3"><strong>Event Schedule</strong></Form.Text>
            <Row className="mb-3">
              <Col md={3}>
                <Form.Group controlId="soundcheckTime">
                  <Form.Label>Soundcheck Time</Form.Label>
                  <Form.Control type="time" />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="bandArrivalTime">
                  <Form.Label>Band Arrival Time</Form.Label>
                  <Form.Control type="time" />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="busDepartureTime">
                  <Form.Label>Tour Bus Leaves Time</Form.Label>
                  <Form.Control type="time" />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={3}>
                <Form.Group controlId="mealTime">
                  <Form.Label>Lunch/Dinner Time</Form.Label>
                  <Form.Control type="time" />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="changeoverTime">
                  <Form.Label>Changeover Time</Form.Label>
                  <Form.Control type="time" />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="showStartTime">
                  <Form.Label>Show Start Time</Form.Label>
                  <Form.Control type="time" />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="showEndTime">
                  <Form.Label>Show End Time</Form.Label>
                  <Form.Control type="time" />
                </Form.Group>
              </Col>
            </Row>

            {/* Booking Logistics */}
            <Form.Text className="mb-3"><strong>Booking Logistics</strong></Form.Text>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="parkingDetails">
                  <Form.Label>Parking Details</Form.Label>
                  <Form.Control type="text" placeholder="Enter parking details" />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="foodDetails">
                  <Form.Label>Food Details</Form.Label>
                  <Form.Control type="text" placeholder="Enter food details" />
                </Form.Group>
              </Col>

            </Row>

            {/* Additional Information */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="isPublicEvent">
                  <Form.Label>Is Public Event</Form.Label>
                  <Form.Select>
                    <option>Yes</option>
                    <option>No</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
            <Col md={6}>
                <Form.Group controlId="eventDescription">
                  <Form.Label>More Description</Form.Label>
                  <Form.Control type="text" placeholder="Enter description" />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button className='btn-cancel' variant="danger" onClick={handleClose}>
            Cancel
          </Button>
          <Button className='btn-save' variant="dark" onClick={handleClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PopUpCreateBooking;
