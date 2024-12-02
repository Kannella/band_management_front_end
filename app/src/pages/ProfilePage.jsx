import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import LogoutButton from '../components/User/LogoutButton';

function ProfilePage() {

    return (
        <Container fluid className="pt-3 ms-3 mb-3">
            <Row className="mb-2">
            <Col xs={12} md={10}>
                    <h1 className="title-page">User Logout</h1>
                </Col>
                <Col xs={12} md={10}>
                    <LogoutButton />
                </Col>
            </Row>
        </Container>
    );
}

export default ProfilePage;
