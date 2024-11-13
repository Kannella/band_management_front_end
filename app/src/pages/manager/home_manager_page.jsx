import React from "react";
import { Container, Row, Col} from "react-bootstrap";
import StackedCards from "../../components/Booking/vertical_stack_cards";
import BookingCard from "../../components/Booking/card_booking";

function HomeManagerPage() {
    return (
        <Container fluid className="">
            <Row className="justify-content-start align-items-start ms-3 mb-3" >
                <Col>
                <Row>
                    <div className="sub-text welcome-text">Hello, </div>
                </Row>
                <Row>
                    <div className="user-name-text">
                        Jane Doe
                    </div>
                </Row>
                </Col>
            </Row>
            <Row className="justify-content-start align-items-start ms-3 mb-3">
                <Col>
                    <Row>
                        <div className="home-headding-text" >Upcoming events</div>
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
