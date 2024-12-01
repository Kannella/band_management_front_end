import { useState, useEffect } from 'react';
import { Button, Modal, Form, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import useScreenSizeController from '../../hooks/useScreenSizeController';
import './booking_components.css';

function BookingEditPopup
({ detailsBooking }) {
  const [show, setShow] = useState(false);

  const { isMobile } = useScreenSizeController();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    // Reset any state if needed when detailsBooking changes
    // This can be used to populate initial state if required
  }, [detailsBooking]);

;


  return (
    <>
      <Button
        variant="secondary"
        size="sm"
        className="d-flex align-items-center btn-add-booking"
        onClick={handleShow}
      >
        <FontAwesomeIcon icon={faPlus} style={{ marginRight: isMobile ? 0 : 10 }} />
        {!isMobile && 'Edit Booking'}
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
            {/* Band Selection */}
            <Form.Text className="mb-4">Select Band</Form.Text>
            <Row>
              <Col lg={6}>
                <Form.Group controlId="bookingBand">
                  <Form.Label>Band</Form.Label>
                  <Form.Select defaultValue={"example band"}>
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
                  <Form.Control
                    type="text"
                    value={"example name"}
                    placeholder="Enter name"
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="bookingNumber">
                  <Form.Label>Booking Number</Form.Label>
                  <Form.Control
                    type="text"
                    value={"example number"}
                    placeholder="Enter number"
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="bookingStage">
                  <Form.Label>Stage of Booking</Form.Label>
                  <Form.Select defaultValue={"example"} >
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
                <Form.Group className="mb-3" controlId="paymentDetails">
                  <Form.Label>Payment Details</Form.Label>
                  <Form.Control
                    type="text"
                    value={"detailsBooking.paymentDetails"}
                    placeholder="Enter payment details"
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Venue Information */}
            <Form.Text className="mb-3"><strong>Venue Information</strong></Form.Text>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="venueName">
                  <Form.Label>Venue</Form.Label>
                  <Form.Control
                    type="text"
                    value={"detailsBooking.venueNam"}
                    placeholder="Enter venue name"
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="venueAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    value={"detailsBooking.venueAddress"}
                    placeholder="Enter address"
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Agent Information */}
            <Form.Text className="mb-3"><strong>Agent Information</strong></Form.Text>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="agentName">
                  <Form.Label>Agent</Form.Label>
                  <Form.Control
                    type="text"
                    value={"detailsBooking.agentName"}
                    placeholder="Enter agent name"
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Event Schedule */}
            <Form.Text className="mb-3"><strong>Event Schedule</strong></Form.Text>
            <Row className="mb-3">
              <Col md={3}>
                <Form.Group controlId="soundcheckTime">
                  <Form.Label>Soundcheck Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={"detailsBooking.soundcheckTime"}
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="bandArrivalTime">
                  <Form.Label>Band Arrival Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={"detailsBooking.bandArrivalTime"}
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="busDepartureTime">
                  <Form.Label>Tour Bus Leaves Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={"detailsBooking.busDepartureTime"}
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={3}>
                <Form.Group controlId="mealTime">
                  <Form.Label>Lunch/Dinner Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={"detailsBooking.mealTime"}
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="changeoverTime">
                  <Form.Label>Changeover Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={"detailsBooking.changeoverTime"}
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="showStartTime">
                  <Form.Label>Show Start Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={"detailsBooking.showStartTime"}
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="showEndTime">
                  <Form.Label>Show End Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={"detailsBooking.showEndTime"}
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Booking Logistics */}
            <Form.Text className="mb-3"><strong>Booking Logistics</strong></Form.Text>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="parkingDetails">
                  <Form.Label>Parking Details</Form.Label>
                  <Form.Control
                    type="text"
                    value={"detailsBooking.parkingDetail"}
                    readOnly
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="foodDetails">
                  <Form.Label>Food Details</Form.Label>
                  <Form.Control
                    type="text"
                    value={"detailsBooking.foodDetails"}
                    readOnly
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Additional Information */}
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="isPublicEvent">
                  <Form.Label>Is Public Event</Form.Label>
                  <Form.Select defaultValue={"detailsBooking.isPublicEvent"} >
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
                  <Form.Control
                    type="text"
                    value={"detailsBooking.eventDescription"}
                    readOnly
                  />
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

export default BookingEditPopup
;
