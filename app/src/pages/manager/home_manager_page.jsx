import React,{useEffect, useState} from "react";
import axios from "axios";
import { Container, Row, Col} from "react-bootstrap";
import BookingCard from "../../components/Booking/card_booking";

function HomeManagerPage() {
    const [nameUser, setNameUser] = useState("");

    // get storage userId
    const userId = 1

    useEffect(() => {
        axios
            .get(`https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/User/${userId}`)
            .then(res => {
                setNameUser(res.data.name); 
            })
            .catch(error => {
                console.error("No user found", error);
            });
    }, []);

    return (
        <Container fluid className="">
            <Row className="justify-content-start align-items-start ms-3 mb-3" >
                <Col>
                <Row>
                    <div className="sub-text welcome-text text-start">Hello, </div>
                </Row>
                <Row>
                    <div className="user-name-text text-start">
                        {nameUser || "Loading..."}
                    </div>
                </Row>
                </Col>
            </Row>
            <Row className="justify-content-start align-items-start ms-3 mb-3">
                <Col>
                    <Row>
                        <div className="home-headding-text text-start" >Upcoming events</div>
                    </Row>
                    <Row>
                        <div className="sub-text">Next bookings</div>
                    </Row>
                </Col>

            </Row>
            <Row className="justify-content-center align-items-center">
                <BookingCard/>
                <BookingCard/>
            </Row>
        </Container>
    );
}

export default HomeManagerPage;
