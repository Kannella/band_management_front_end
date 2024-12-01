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
  const [mealTime, setMealTime] = useState('');
  const [changeoverTime, setChangeoverTime] = useState('');
  const [showStartTime, setShowStartTime] = useState('');
  const [showEndTime, setShowEndTime] = useState('');
  const [parkingDetails, setParkingDetails] = useState('');
  const [foodDetails, setFoodDetails] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [eventDate, setEventDate] = useState('');
  const [bands, setBand] = useState([]);
  const [bandList, setBandList] = useState([]);
  const [venues, setVenues] = useState([]); 
  const [agents, setAgents] = useState([]);
  const [error, setError] = useState('');


  const { isMobile } = useScreenSizeController();
  const userId = useAuthStore((state) => state.userId); 

  const handleTimeChange = (e, setterFunction) => {
    const time = e.target.value;
    const currentDate = new Date().toISOString().split('T')[0];
    setterFunction(`${currentDate}T${time}:00`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Requisição para obter as bandas do usuário
        const bandResponse = await axios.get(
          `https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/Booking/GetBandsForUser?userId=${userId}`
        );
        const userBands = bandResponse.data || [];

        // Requisição para obter todas as bandas
        const allBandsResponse = await axios.get(
          'https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/Band'
        );
        const allBands = allBandsResponse.data || [];

        // Filtrar as bandas que possuem o mesmo nome das bandas que o usuário possui
        const filteredBands = allBands.filter(band => 
          userBands.some(userBand => userBand.name === band.name)
        );

        // Guardar nome e id das bandas filtradas
        const bandInfo = filteredBands.map(band => ({
          id: band.id,
          name: band.name
        }));

        setBandList(bandInfo); // Atualizar estado com bandas filtradas
        setBand(userBands); // Guardar as bandas do usuário

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
      name: bookingName,
      description: description,
      bandId: bandId,
      agentId: agentId,
      venueId: venueId,
      status: stageOfBooking,
      paymentDetails: paymentDetails,
      bookingNumber: bookingNumber,
      stageNumber: stageOfBooking,
      foodDetails: foodDetails,
      soundCheckTime: soundcheckTime,
      arrivalTime: bandArrivalTime,
      tourbusLeaveTime: busDepartureTime,
      dinnerTime: mealTime,
      changeOverTime: changeoverTime,
      showStartTime: showStartTime,
      showEndTime: showEndTime,
      parkingDetails: parkingDetails,
      bookingNotes: description,
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
                    {bandList.map((band) => (
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
            <Row className='mb-3'>
              <Col md={3}>
              <Form.Group controlId="eventDate">
              <Form.Label>Event Date</Form.Label>
              <Form.Control
                type="date"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
              />
              </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={3}>
                <Form.Group controlId="soundcheckTime">
                  <Form.Label>Soundcheck Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={soundcheckTime}
                    onChange={(e) => handleTimeChange(e, setSoundcheckTime)}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="bandArrivalTime">
                  <Form.Label>Band Arrival Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={bandArrivalTime}
                    onChange={(e) => handleTimeChange(e, setBandArrivalTime)}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="busDepartureTime">
                  <Form.Label>Tour Bus Leaves Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={busDepartureTime}
                    onChange={(e) => handleTimeChange(e, setBusDepartureTime)}
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
                    value={mealTime}
                    onChange={(e) => handleTimeChange(e, setMealTime)}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="changeoverTime">
                  <Form.Label>Changeover Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={changeoverTime}
                    onChange={(e) => handleTimeChange(e, setChangeoverTime)}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="showStartTime">
                  <Form.Label>Show Start Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={showStartTime}
                    onChange={(e) => handleTimeChange(e, setShowStartTime)}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="showEndTime">
                  <Form.Label>Show End Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={showEndTime}
                    onChange={(e) => handleTimeChange(e, setShowEndTime)}
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* Public Event Toggle */}
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
