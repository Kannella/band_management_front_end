import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";  // Corrected import
import BookingDetails from "./details_booking";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronDown } from "@fortawesome/free-solid-svg-icons";

function PopupBookingBand() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button
        variant="secondary"
        size="sm"
        className="d-flex align-items-center mx-auto"
        style={{
          backgroundColor: '#64748B',
          borderRadius: '20px',
          padding: '6px 12px',
          fontSize: '14px',
          marginLeft: '36%',
          fontWeight:'bold'
        }}
        onClick={handleShow}
      >
        details
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

export default PopupBookingBand;
