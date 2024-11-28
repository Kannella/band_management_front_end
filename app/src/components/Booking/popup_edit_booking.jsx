import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

function PopUpEditBooking() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="secondary"
        size="sm"
        className="d-flex align-items-center mx-auto"
        style={{
            backgroundColor: '#64748B',
            borderRadius: '12px',
            padding: '6px 12px',
            fontSize: '12px',
            marginLeft: '36%'
        }}
        onClick={handleShow}
        > Edit Booking
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
          <Modal.Title>Edit Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Text className="mb-4">
              Find all booking details below. Click on the tabs to view specific information about the booking, venue, schedule, set, and logistics.
            </Form.Text>

            {/* Booking Information */}
            <Form.Text  as="h1" className="mb-3">Booking Information</Form.Text>
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

            {/* Agent Information */}
            <Form.Text className="mb-3"><strong>Agent Information</strong></Form.Text>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="agentName">
                  <Form.Label>Agent Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter name" />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="agentPhone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="text" placeholder="Enter phone" />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="agentEmail">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
              </Col>
            </Row>

            {/* Venue Information */}
            <Form.Text className="mb-3"><strong>Venue Information</strong></Form.Text>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="venueName">
                  <Form.Label>Venue Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter name" />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="venuePhone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="text" placeholder="Enter phone" />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="venueEmail">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="venueAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="text" placeholder="Enter address" />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group controlId="venueNumber">
                  <Form.Label>Number</Form.Label>
                  <Form.Control type="text" placeholder="Enter number" />
                </Form.Group>
              </Col>
              <Col md={2}>
                <Form.Group controlId="venuePostalCode">
                  <Form.Label>Postal Code</Form.Label>
                  <Form.Control type="text" placeholder="Enter code" />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="venueCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control type="text" placeholder="Enter city" />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="venueCountry">
                  <Form.Label>Country</Form.Label>
                  <Form.Control type="text" placeholder="Enter country" />
                </Form.Group>
              </Col>
            </Row>

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

            {/* Set Details */}
            <Form.Text className="mb-3"><strong>Set Details</strong></Form.Text>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="musicGenre">
                  <Form.Label>Music Genre</Form.Label>
                  <Form.Control type="text" placeholder="Enter genre" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="setSong">
                  <Form.Label>Set Song</Form.Label>
                  <Form.Control type="text" placeholder="Enter song" />
                </Form.Group>
              </Col>
            </Row>

            {/* Logistics */}
            <Form.Text className="mb-3"><strong>Logistics</strong></Form.Text>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="parkingAvailability">
                  <Form.Label>Parking Availability</Form.Label>
                  <Form.Select>
                    <option>Yes</option>
                    <option>No</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="foodDrinkAvailability">
                  <Form.Label>Food and Drink Availability</Form.Label>
                  <Form.Select>
                    <option>Yes</option>
                    <option>No</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="dressCode">
                  <Form.Label>Dress Code</Form.Label>
                  <Form.Control type="text" placeholder="Enter dress code" />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default PopUpEditBooking;
