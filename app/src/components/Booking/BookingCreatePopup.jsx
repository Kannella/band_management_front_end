import { useEffect, useState } from 'react';
import { Button, Modal, Form, Col, Row } from 'react-bootstrap';
import './booking_components.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import useScreenSizeController from '../../hooks/useScreenSizeController';
import axios from 'axios';
import { useAuthStore } from '../../store/authStore';

function BookingCreatePopup() {
  const [show, setShow] = useState(false);
  const [bandId, setBandId] = useState('');
  const [bookingName, setBookingName] = useState('');
  const [bookingNumber, setBookingNumber] = useState('');
  const [stageOfBooking, setStageOfBooking] = useState('');
  const [paymentDetails, setPaymentDetails] = useState('');
  const [agentId, setAgentId] = useState('');
  const [venueId, setVenueId] = useState('');
  const [soundcheckTime, setSoundcheckTime] = useState('');
  const [bandArrivalTime, setBandArrivalTime] = useState('');
  const [busDepartureTime, setBusDepartureTime] = useState('');
  const [dinnerTime, setDinnerTime] = useState('');
  const [changeoverTime, setChangeoverTime] = useState('');
  const [showStartTime, setShowStartTime] = useState('');
  const [showEndTime, setShowEndTime] = useState('');
  const [parkingDetails, setParkingDetails] = useState('');
  const [foodDetails, setFoodDetails] = useState('');
  const [planning, setPlanning] = useState('');
  const [bookingNotes, setBookingNotes] = useState('');
  const [stageNumber, setStageNumber] = useState('');
  const [description, setDescription] = useState('');
  const [arrivalTime, setArrivalTime] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [bands, setBand] = useState([]);
  const [venues, setVenues] = useState([]); 
  const [agents, setAgents] = useState([]);
  const [error, setError] = useState('');
  const [eventTimestamp, setEventTimestamp] = useState(null);


  const { isMobile } = useScreenSizeController();
  const userId = useAuthStore((state) => state.userId); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Requisição para obter as bandas do usuário
        const bandResponse = await axios.get(
          `https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/Booking/GetBandsForUser?userId=${userId}`
        );
        setBand(bandResponse.data || []);

        // Requisição para obter as localizações
        const venueResponse = await axios.get(
          'https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/Venue'
        );
        setVenues(venueResponse.data || []);

        // Requisição para obter os agentes
        const agentResponse = await axios.get(
          'https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/Agent'
        );
        setAgents(agentResponse.data || []);
        
      } catch (error) {
        setError("Erro ao carregar os dados");
      }
    };
    fetchData();
  }, [userId]);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      name:bookingName,
      description: description,
      bandId: bandId,
      agentId: agentId,
      venueId: venueId,
      status: stageOfBooking,
      planning: planning,
      paymentDetails: paymentDetails,
      bookingNumber: bookingNumber,
      arrivalTime: arrivalTime,
      bookingNotes: bookingNotes,
      stageNumber: stageNumber,
      foodDetails: foodDetails,
      soundCheckTime: soundcheckTime,
      tourbusLeaveTime: busDepartureTime,
      showStartTime: showStartTime,
      dinnerTime: dinnerTime,
      changeOverTime: changeoverTime,
      showEndTime: showEndTime,
      parkingDetails: parkingDetails,
      isPublicEvent: isPublic,
    };

    try {
      const response = await axios.post('https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/Booking', bookingData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        alert('Booking created successfully!');
        setShow(false); 
      } else {
        throw new Error('Failed to create booking');
      }
    } catch (error) {
      console.error(error);
      alert('Error creating booking');
    }
  };

  

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
                  <Form.Select value={bandId} onChange={(e) => setBandId(e.target.value)}>
                    {bands.map((band) => (
                      <option key = {band.id} value={band.id} >{band.name}</option>

                    ))}
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
                    value={bookingName}
                    onChange={(e) => setBookingName(e.target.value)}
                    placeholder="Enter name"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="bookingNumber">
                  <Form.Label>Booking Number</Form.Label>
                  <Form.Control
                    type="text"
                    value={bookingNumber}
                    onChange={(e) => setBookingNumber(e.target.value)}
                    placeholder="Enter number"
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="bookingStage">
                  <Form.Label>Stage of Booking</Form.Label>
                  <Form.Select
                    value={stageOfBooking}
                    onChange={(e) => setStageOfBooking(e.target.value)}
                  >
                    <option>Select</option>
                    <option value="1">Final Booking</option>
                    <option value="2">Optional</option>
                    <option value="3">Canceled</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId='description'>
                  <Form.Label>Descrição</Form.Label>
                  <Form.Control
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter booking description"
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Payment Details */}
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3" controlId="paymentDetails">
                  <Form.Label>Payment Details</Form.Label>
                  <Form.Control
                    type="text"
                    value={paymentDetails}
                    onChange={(e) => setPaymentDetails(e.target.value)}
                    placeholder="Enter payment details"
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Venue Selection */}
            <Form.Text className="mb-3"><strong>Venue Information</strong></Form.Text>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="venueSelection">
                  <Form.Label>Venue</Form.Label>
                  <Form.Select value={venueId} onChange={(e) => setVenueId(e.target.value)}>
                    <option value="">Select an existing venue</option>
                    {venues.map((venue) => (
                      <option key={venue.id} value={venue.id}>
                        {venue.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

                        {/* Agent Selection */}
            <Form.Text className="mb-3"><strong>Agent Information</strong></Form.Text>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="agentSelection">
                  <Form.Label>Agent</Form.Label>
                  <Form.Select value={agentId} onChange={(e) => setAgentId(e.target.value)}>
                    <option value="">Select an existing venue</option>
                  {agents.map((agent) => (
                      <option key={agent.id} value={agent.id}>
                        {agent.name}
                      </option>
                    ))}
                  </Form.Select>
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
                    type="datetime-local"
                    value={soundcheckTime}
                    onChange={(e) => setSoundcheckTime(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="bandArrivalTime">
                  <Form.Label>Band Arrival Time</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={bandArrivalTime}
                    onChange={(e) => setBandArrivalTime(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="busDepartureTime">
                  <Form.Label>Tour Bus Leaves Time</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={busDepartureTime}
                    onChange={(e) => setBusDepartureTime(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={3}>
                <Form.Group controlId="dinnerTime">
                  <Form.Label>Lunch/Dinner Time</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={dinnerTime}
                    onChange={(e) => setDinnerTime(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="changeoverTime">
                  <Form.Label>Changeover Time</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={changeoverTime}
                    onChange={(e) => setChangeoverTime(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="showStartTime">
                  <Form.Label>Show Start Time</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={showStartTime}
                    onChange={(e) => setShowStartTime(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="showEndTime">
                  <Form.Label>Show End Time</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    value={showEndTime}
                    onChange={(e) => setShowEndTime(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

             {/* Booking Logistics */}
             <Form.Text className="mb-3"><strong>Booking Logistics</strong></Form.Text>
            <Row className="mb-3">
            <Col md={4}>
                <Form.Group controlId="stageNumber">
                  <Form.Label>Stage Number</Form.Label>
                  <Form.Control type="text" 
                  value={stageNumber}
                  onChange={(e) => setStageNumber(e.target.value)}
                  placeholder="Enter stage Number" />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="planning">
                  <Form.Label>Planning</Form.Label>
                  <Form.Control type="text" 
                  value={planning}
                  onChange={(e) => setPlanning(e.target.value)}
                  placeholder="Enter planning details" />
                </Form.Group>
              </Col>
            </Row>
            <Row  className="mb-3">
              <Col md={4}>
              <Form.Group controlId="foodDetails">
                  <Form.Label>Food Details</Form.Label>
                  <Form.Control type="text" 
                  value={foodDetails}
                  onChange={(e) => setFoodDetails(e.target.value)}
                  placeholder="Enter Food Details" />
                </Form.Group>
              </Col>
              <Col md={4}>
              <Form.Group controlId="parkingDetails">
                  <Form.Label>Parking Details</Form.Label>
                  <Form.Control type="text" 
                  value={parkingDetails}
                  onChange={(e) => setParkingDetails(e.target.value)}
                  placeholder="Enter Parking Details" />
                </Form.Group>
              </Col>

            </Row>

            {/* Additional Information */}
            <Row className="mb-3">
            <Col md={6}>
                <Form.Group controlId="publicEventCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="Public Event"
                    checked={isPublic}
                    onChange={(e) => setIsPublic(e.target.checked)}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
            <Col md={6}>
                <Form.Group controlId="bookingNotes">
                  <Form.Label>Booking Notes</Form.Label>
                  <Form.Control type="text"
                  value={bookingNotes}
                  onChange={(e) => setBookingNotes(e.target.value)}
                   placeholder="Enter Notes" />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button className='btn-cancel' variant="danger" onClick={handleClose}>
            Cancel
          </Button>
          <Button className='btn-save' variant="dark" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BookingCreatePopup;
