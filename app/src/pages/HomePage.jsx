import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import BookingCard from "../components/Booking/BookingCard";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import BandCard from '../components/Band/BandCard';

function HomePage() {
  const [nameUser, setNameUser] = useState("");
  const [bookings, setBookings] = useState([]);
  const [bands, setBands] = useState([]);
  const [allBands, setAllBands] = useState([]);
  const [bandsUser, setBandsUser] = useState([]);
  const [allBandUsers, setAllBandUsers] = useState([]);
  const [bandMap, setBandMap] = useState({});
  const [venueMap, setVenueMap] = useState({});
  const [agentMap, setAgentMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const userId = useAuthStore((state) => state.userId);

  useEffect(() => {
    if (!userId) return;

    const source = axios.CancelToken.source();
    axios
      .get(
        `https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/User/${userId}`,
        { cancelToken: source.token }
      )
      .then((res) => {
        if (res.data && res.data.name) {
          setNameUser(res.data.name);
        } else {
          console.error("Name not found in the response data", res.data);
        }
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          console.error("Error fetching user data", error);
        }
      });

    return () => source.cancel("Request canceled due to component unmount");
  }, [userId]);

  useEffect(() => {
    const fetchData = async () => {
        try {
            setLoading(true);
            if (userId) {
                const [bandResponse, bandUsersResponse] = await Promise.all([
                    axios.get(`https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/Booking/GetBandsForUser?userId=${userId}`),
                    axios.get('https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/BandUser'),
                ]);

                setBandsUser(bandResponse.data || []);
                setAllBands(bandUsersResponse.data || []);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            setError("Failed to load data. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    fetchData();
}, [userId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (userId) {
          const [bookingResponse, bandResponse, bandUsersResponse, venueResponse, agentResponse] = await Promise.all([
            axios.get(`https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/Booking/GetBookingsForUser?userId=${userId}`),
            axios.get(`https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/Band`),
            axios.get(`https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/User`), // Caso precise de outros dados de usuários da banda
            axios.get(`https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/Venue`),
            axios.get(`https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/Agent`)
          ]);

          // Carregar os dados das bandas
          const bands = bandResponse.data || [];
          const bandMap = bands.reduce((acc, band) => {
            acc[band.id] = band.name;
            return acc;
          }, {});
          setBandMap(bandMap);

          // Carregar os dados dos venues
          const venues = venueResponse.data || [];
          const venueMap = venues.reduce((acc, venue) => {
            acc[venue.id] = venue.name;
            return acc;
          }, {});
          setVenueMap(venueMap);

          // Carregar os dados dos agentes
          const agents = agentResponse.data || [];
          const agentMap = agents.reduce((acc, agent) => {
            acc[agent.id] = agent.name;
            return acc;
          }, {});
          setAgentMap(agentMap);

          // Carregar os bookings
          const bookings = bookingResponse.data || [];
          setBookings(bookings);
          setBands(bands);
          setAllBandUsers(bandUsersResponse.data || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const handleBandClick = (band) => {
    const bandMembers = allBandUsers.filter((user) => user.bandId === band.id);
    navigate(`/band/${band.id}`, { state: { bandMembers } });
  };

  // Enriquecer os bookings com os nomes das bandas, venues e agentes
  const enrichedBookings = bookings.map((booking) => ({
    ...booking,
    bandName: bandMap[booking.bandId] || "Nome não disponível",
    venueName: venueMap[booking.venueId] || "Nome não disponível",
    agentName: agentMap[booking.agentId] || "Nome não disponível",
  }));

  const sortedBookings = enrichedBookings
    .sort((a, b) => new Date(b.showStartTime) - new Date(a.showStartTime))  // Ordenando por showStartTime
    .slice(0, 2);  // Pegando apenas os 2 mais recentes

  return (
    <Container fluid className="">
      <Row className="justify-content-start align-items-start ms-3 mb-3">
        <Col>
          <Row>
            <div className="sub-text welcome-text text-start">Hello, </div>
          </Row>
          <Row>
            <div className="user-name-text text-start">{nameUser || "Loading..."}</div>
          </Row>
        </Col>
      </Row>
      <Row className="justify-content-start align-items-start ms-3 mb-3">
        <Col>
          <Row>
            <div className="home-headding-text text-start">Upcoming events</div>
          </Row>
          <Row>
            <div className="sub-text">Next bookings</div>
          </Row>
        </Col>
      </Row>
      <Row className="justify-content-center align-items-center mb-4">
        {sortedBookings.map((booking) => (
          <BookingCard
            key={booking.id}
            booking={booking}
            venue={booking.venueName}  // Passando o nome do venue
            band={booking.bandName}    // Passando o nome da band
            agent={booking.agentName}  // Passando o nome do agent
          />
        ))}
      </Row>
      <Row className="justify-content-center align-items-center ms-3 mt-2">
        <div className="home-headding-text text-start">My Bands</div>
        {bandsUser.map((band) => (
          <div key={band.id} className="col-12 col-md-3 col-sm-12 mb-4 mt-4">
            <BandCard band={band} onClick={() => handleBandClick(band)} />
          </div>
        ))}
      </Row>
    </Container>
  );
}

export default HomePage;
