import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import BookingDetails from "./BookingDetails";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronDown } from "@fortawesome/free-solid-svg-icons";
import './booking_components.css'; 
import useScreenSizeController from "../../hooks/useScreenSizeController";


function BookingBandPopup() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

   const {isMobile} = useScreenSizeController();

  return (
    <div>
      <Button
        variant="secondary"
        size="sm"
        className="d-flex align-items-center mx-auto btn-details"
        onClick={handleShow}
      >
        {!isMobile && 'details'}
        <FontAwesomeIcon icon={faChevronDown} size="lg" style={{ marginLeft: 10}} />
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
          <Modal.Title>Event Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BookingDetails />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Go To
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default BookingBandPopup;
