import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import BandMembersTable from "./BandMemberTable";

function BandCreatePopup({ show, handleClose }) {
    const [members, setMembers] = useState([]);
    const [newMember, setNewMember] = useState({ name: "", email: "" });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMember({ ...newMember, [name]: value });
    };

    const handleSaveNewMember = () => {
        if (newMember.name && newMember.email) {
            setMembers([...members, newMember]);
            setNewMember({ name: "", email: "" }); 
        }
    };

    return (
        <Modal
            show={show}
            onHide={handleClose}
            centered
            dialogClassName="modal-responsive"
            className="band-popup-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title className="title-responsive">Create Band</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Row className="mb-3">
                        <p className="instructions-responsive">
                            Enter the band name, add members, and click "Save" to create the band.
                        </p>
                    </Row>

                    <Row className="mb-3">
                        <Col xs={12} md={6}>
                            <Form.Group controlId="formBandName">
                                <Form.Label className="label-responsive"><strong>Band Name</strong></Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Band name"
                                    className="input-responsive"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Label className="label-responsive"><strong>Band Members</strong></Form.Label>

                    <Row className="mb-3">
                        <Col xs={12} md={6}>
                            <Form.Group controlId="formMemberName">
                                <Form.Label className="label-responsive">Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={newMember.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter name"
                                    className="input-responsive"
                                />
                            </Form.Group>
                        </Col>
                        <Col xs={12} md={6}>
                            <Form.Group controlId="formMemberEmail">
                                <Form.Label className="label-responsive">Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={newMember.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter email"
                                    className="input-responsive"
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <Button className="btn-responsive btn-dark" onClick={handleSaveNewMember}>
                                Add Member
                            </Button>
                        </Col>
                    </Row>

                    <BandMembersTable members={members} />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className="btn-responsive btn-cancel-band" variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button className="btn-responsive btn-save-band" onClick={handleClose}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default BandCreatePopup;
