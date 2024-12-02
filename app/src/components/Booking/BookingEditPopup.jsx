import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Col, Row, Alert } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { format } from 'date-fns';
import { useAuthStore } from '../../store/authStore';
import useScreenSizeController from '../../hooks/useScreenSizeController';
import './booking_components.css';

function EditBookingPopup() {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    bandId: '',
    bookingName: '',
    bookingNumber: '',
    stageOfBooking: '',
    paymentDetails: '',
    agentId: '',
    venueId: '',
    soundcheckTime: '',
    bandArrivalTime: '',
    busDepartureTime: '',
    dinnerTime: '',
    changeoverTime: '',
    showStartTime: '',
    showEndTime: '',
    parkingDetails: '',
    foodDetails: '',
    planning: '',
    bookingNotes: '',
    stageNumber: '',
    description: '',
    isPublic: true,
  });
  const [bands, setBands] = useState([]);
  const [venues, setVenues] = useState([]);
  const [agents, setAgents] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { isMobile } = useScreenSizeController();
  const userId = useAuthStore((state) => state.userId);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [bandResponse, venueResponse, agentResponse] = await Promise.all([
          axios.get(`https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/Booking/GetBandsForUser?userId=${userId}`),
          axios.get('https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/Venue'),
          axios.get('https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/Agent')
        ]);

        setBands(bandResponse.data || []);
        setVenues(venueResponse.data || []);
        setAgents(agentResponse.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError("Error loading data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const formatDateTime = (dateTimeString) => {
    return dateTimeString ? format(new Date(dateTimeString), "yyyy-MM-dd'T'HH:mm") : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const bookingData = {
      ...formData,
      bandId: parseInt(formData.bandId),
      agentId: parseInt(formData.agentId),
      venueId: parseInt(formData.venueId),
      status: parseInt(formData.stageOfBooking),
      arrivalTime: formatDateTime(formData.bandArrivalTime),
      soundCheckTime: formatDateTime(formData.soundcheckTime),
      tourbusLeaveTime: formatDateTime(formData.busDepartureTime),
      showStartTime: formatDateTime(formData.showStartTime),
      dinnerTime: formatDateTime(formData.dinnerTime),
      changeOverTime: formatDateTime(formData.changeoverTime),
      showEndTime: formatDateTime(formData.showEndTime),
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
        setFormData({
          bandId: '',
          bookingName: '',
          bookingNumber: '',
          stageOfBooking: '',
          paymentDetails: '',
          agentId: '',
          venueId: '',
          soundcheckTime: '',
          bandArrivalTime: '',
          busDepartureTime: '',
          dinnerTime: '',
          changeoverTime: '',
          showStartTime: '',
          showEndTime: '',
          parkingDetails: '',
          foodDetails: '',
          planning: '',
          bookingNotes: '',
          stageNumber: '',
          description: '',
          isPublic: true,
        });
      } else {
        throw new Error('Failed to create booking');
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      setError(`Error creating booking: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsLoading(false);
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
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="bookingBand" className="mb-3">
              <Form.Label>Band</Form.Label>
              <Form.Select 
                name="bandId" 
                value={formData.bandId} 
                onChange={handleChange}
                required
              >
                <option value="">Select a band</option>
                {bands.map((band) => (
                  <option key={band.id} value={band.id}>{band.name}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="bookingName">
                  <Form.Label>Booking Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="bookingName"
                    value={formData.bookingName}
                    onChange={handleChange}
                    placeholder="Enter name"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="bookingNumber">
                  <Form.Label>Booking Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="bookingNumber"
                    value={formData.bookingNumber}
                    onChange={handleChange}
                    placeholder="Enter number"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="stageOfBooking">
                  <Form.Label>Stage of Booking</Form.Label>
                  <Form.Select
                    name="stageOfBooking"
                    value={formData.stageOfBooking}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select</option>
                    <option value="1">Final Booking</option>
                    <option value="2">Optional</option>
                    <option value="3">Canceled</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="description" className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter booking description"
              />
            </Form.Group>

            <Form.Group controlId="paymentDetails" className="mb-3">
              <Form.Label>Payment Details</Form.Label>
              <Form.Control
                type="text"
                name="paymentDetails"
                value={formData.paymentDetails}
                onChange={handleChange}
                placeholder="Enter payment details"
              />
            </Form.Group>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="venueSelection">
                  <Form.Label>Venue</Form.Label>
                  <Form.Select 
                    name="venueId" 
                    value={formData.venueId} 
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select an existing venue</option>
                    {venues.map((venue) => (
                      <option key={venue.id} value={venue.id}>
                        {venue.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="agentSelection">
                  <Form.Label>Agent</Form.Label>
                  <Form.Select 
                    name="agentId" 
                    value={formData.agentId} 
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select an existing agent</option>
                    {agents.map((agent) => (
                      <option key={agent.id} value={agent.id}>
                        {agent.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <h5 className="mt-4 mb-3">Event Schedule</h5>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="soundcheckTime">
                  <Form.Label>Soundcheck Time</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="soundcheckTime"
                    value={formData.soundcheckTime}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="bandArrivalTime">
                  <Form.Label>Band Arrival Time</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="bandArrivalTime"
                    value={formData.bandArrivalTime}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="busDepartureTime">
                  <Form.Label>Tour Bus Leaves Time</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="busDepartureTime"
                    value={formData.busDepartureTime}
                    onChange={handleChange}
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
                    name="dinnerTime"
                    value={formData.dinnerTime}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="changeoverTime">
                  <Form.Label>Changeover Time</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="changeoverTime"
                    value={formData.changeoverTime}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="showStartTime">
                  <Form.Label>Show Start Time</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="showStartTime"
                    value={formData.showStartTime}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group controlId="showEndTime">
                  <Form.Label>Show End Time</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="showEndTime"
                    value={formData.showEndTime}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <h5 className="mt-4 mb-3">Booking Logistics</h5>
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group controlId="stageNumber">
                  <Form.Label>Stage Number</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="stageNumber"
                    value={formData.stageNumber}
                    onChange={handleChange}
                    placeholder="Enter stage Number" 
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="planning">
                  <Form.Label>Planning</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="planning"
                    value={formData.planning}
                    onChange={handleChange}
                    placeholder="Enter planning details" 
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="foodDetails">
                  <Form.Label>Food Details</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="foodDetails"
                    value={formData.foodDetails}
                    onChange={handleChange}
                    placeholder="Enter Food Details" 
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="parkingDetails">
                  <Form.Label>Parking Details</Form.Label>
                  <Form.Control 
                    type="text" 
                    name="parkingDetails"
                    value={formData.parkingDetails}
                    onChange={handleChange}
                    placeholder="Enter Parking Details" 
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="publicEventCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="Public Event"
                    name="isPublic"
                    checked={formData.isPublic}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group controlId="bookingNotes" className="mb-3">
              <Form.Label>Booking Notes</Form.Label>
              <Form.Control 
                as="textarea"
                rows={3}
                name="bookingNotes"
                value={formData.bookingNotes}
                onChange={handleChange}
                placeholder="Enter Notes" 
              />
            </Form.Group>

            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={handleClose} className="me-2">
                Cancel
              </Button>
              <Button variant="primary" type="submit" disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create Booking'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditBookingPopup;

