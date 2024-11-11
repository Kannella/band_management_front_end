import React from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

function BandPopup({ show, handleClose }) {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Create Band</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <Form>
                    <Row className="mb-6">
                        <p>Find all booking details below. Click on the tabs to view specific information about the booking, venue, schedule, set, and logistics.</p>
                    </Row>
                    <Row className="mb-3">
                        {/* Band Name Input */}
                        <Col md={6}>
                            <Form.Group controlId="formBandName">
                                <Form.Label><strong>Band Name</strong></Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Band name"
                                    className="form-control"
                                />
                            </Form.Group>
                        </Col>

                        {/* Genre Input */}
                        <Col md={6}>
                            <Form.Group controlId="formGenre">
                                <Form.Label><strong>Genre</strong></Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter Genre"
                                    className="form-control"
                                />
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
    );
}

export default BandPopup;
