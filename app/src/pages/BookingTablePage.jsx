import React, { useEffect, useState } from "react";
import axios from "axios";
import BookingTable from "../components/Booking/BookingTable";
import { Container, Row, Col } from "react-bootstrap";
import { useAuthStore } from "../store/authStore";

function BookingTablePage() {
    const userId = useAuthStore((state) => state.userId);
    const [bookings, setBookings] = useState([]);
    const [bandMap, setBandMap] = useState({});
    const [venueMap, setVenueMap] = useState({});
    const [agentMap, setAgentMap] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const bandsResponse = await axios.get(
                    'https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/Band'
                );
                const bands = bandsResponse.data || [];

                const bandMap = bands.reduce((acc, band) => {
                    acc[band.id] = band.name;
                    return acc;
                }, {});
                setBandMap(bandMap);

                const venueResponse = await axios.get(
                    'https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/Venue'
                );
                const venues = venueResponse.data || [];
                
                const venueMap = venues.reduce((acc, venue) => {
                    acc[venue.id] = venue.name;
                    return acc;
                }, {});
                setVenueMap(venueMap)

                const agentReponse = await axios.get(
                    'https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/Agent'
                );
                const agents = agentReponse.data || [];

                const agentMap = agents.reduce((acc, agent) =>{
                    acc[agent.id] = agent.name;
                    return acc;
                }, {});
                setAgentMap(agentMap)

                if (userId) {
                    const bookingsResponse = await axios.get(
                        `https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/Booking/GetBookingsForUser?userId=${userId}`
                    );
                    setBookings(bookingsResponse.data || []);
                }
            } catch (error) {
                setError("Erro ao carregar os dados");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [userId]);

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>{error}</p>;

    // Booking with bandName, venueName, agentName
    const enrichedBookings = bookings.map((booking) => ({
        ...booking,
        bandName: bandMap[booking.bandId] || "Nome não disponível",
        venueName: venueMap[booking.venueId] || "Nome não disponível",
        agentName: agentMap[booking.agentId] || "Nome não disponível",
    }));


    return (
        <Container fluid className="pt-3 ms-3 mb-3" style={{ overflowX: "hidden" }}>
            <Row className="mb-2">
                <Col xs={12} md={10}>
                    <div className="title-page">Booking</div>
                </Col>
            </Row>

            <Row className="mb-3">
                <Col xs={12} md="auto">
                    <div className="sub-text mt-1 mb-1">
                        <p>List of all the Events</p>
                    </div>
                </Col>
            </Row>

            <hr />

            <Row>
                <Col xs={12}>
                        <BookingTable bookings={enrichedBookings} />
                </Col>
            </Row>
        </Container>
    );
}

export default BookingTablePage;
