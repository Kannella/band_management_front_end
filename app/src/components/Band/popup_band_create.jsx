// popup_band_create
import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import BandMembersTable from "./band_member_table";

function BandPopup({ show, handleClose }) {
    // Example state for members (you can replace this with actual logic or props)
    const [members, setMembers] = useState([]);
    const [removedMembers, setRemovedMembers] = useState([]);
    const [isEditing] = useState(true);

    const handleRemoveMember = (memberName) => {
        const memberToRemove = members.find(member => member.name === memberName);
        setMembers(members.filter(member => member.name !== memberName));
        setRemovedMembers([...removedMembers, memberToRemove]);
    };

    const handleAddMember = (memberName) => {
        const memberToAdd = removedMembers.find(member => member.name === memberName);
        setRemovedMembers(removedMembers.filter(member => member.name !== memberName));
        setMembers([...members, memberToAdd]);
    };    

    return (
        <Modal 
            show={show}
            onHide={handleClose}
            centered
            size="lg"
            className="band-popup-modal" 
            >
            <Modal.Header closeButton>
                <Modal.Title>Create Band</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <Form>
                    <Row className="mb-3">
                        <p>Find all booking details below. Click on the tabs to view specific information about the booking, venue, schedule, set, and logistics.</p>
                    </Row>

                    <Row className="mb-3">
                        <Col md={6}>
                            <Form.Group controlId="formBandName">
                                <Form.Label><strong>Band Name</strong></Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Band name"
                                    className="form-control"
                                />
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group controlId="formGenre">
                                <Form.Label><strong>Genre</strong></Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Genre"
                                    className="form-control"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    
                    <Form.Label>
                        <strong>Band Members</strong>
                    </Form.Label>

                    <BandMembersTable
                        members={members}
                        removedMembers={removedMembers}
                        isEditing={isEditing}
                        onRemoveMember={handleRemoveMember}
                        onAddMember={handleAddMember}
                    />
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
