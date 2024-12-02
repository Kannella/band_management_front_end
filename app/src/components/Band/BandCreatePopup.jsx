import React, { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios"; 
import { useAuthStore } from '../../store/authStore'; 

function BandCreatePopup({ show, handleClose }) {
    const [bandName, setBandName] = useState("");
    const userId = useAuthStore((state) => state.userId);

    const handleBandNameChange = (e) => {
        setBandName(e.target.value);
    };

    const handleSaveBand = async () => {
        if (!bandName) {
            alert("Please enter a band name.");
            return;
        }

        try {
            await axios.post(
                "https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/Band/CreateBand",
                { name: bandName },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            // 2. Search band created
            const bandsResponse = await axios.get(
                "https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/Band/",
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            // Search bandId created
            const bands = bandsResponse.data;
            const createdBand = bands.find((band) => band.name === bandName);

            if (!createdBand) {
                throw new Error("Failed to find the newly created band.");
            }

            const bandId = createdBand.id;

            // 3. Add Manager as bandMember to band
            await axios.post(
                `https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/BandUser/AddUserToBand`,
                { "bandId": bandId,
                   "userId": userId }, 
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            alert("Band created successfully");
            handleClose();
        } catch (error) {
            console.error("Error in the band creation process:", error);
            alert("An error occurred while creating the band or adding the user.");
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
                            Enter the band name, and click "Save" to create the band.
                        </p>
                    </Row>

                    <Row className="mb-3">
                        <Col xs={12} md={6}>
                            <Form.Group controlId="formBandName">
                                <Form.Label className="label-responsive">
                                    <strong>Band Name</strong>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    value={bandName}
                                    onChange={handleBandNameChange}
                                    placeholder="Enter band name"
                                    className="input-responsive"
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button className="btn-responsive btn-cancel-band" variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button className="btn-responsive btn-save-band" onClick={handleSaveBand}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default BandCreatePopup;
