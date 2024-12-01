import React,{useEffect, useState} from "react";
import axios from "axios";
import { Container, Row, Col} from "react-bootstrap";
import BookingCard from "../components/Booking/BookingCard";
import { useAuthStore } from "../store/authStore";

function HomeManagerPage() {
    const [nameUser, setNameUser] = useState("");

    const userId = useAuthStore ((state) => state.userId)
    const isHydrated = useAuthStore.persist.hasHydrated();
    

    useEffect(() => {

        if (!isHydrated) return;
        if (!userId) return; 

        const source = axios.CancelToken.source(); 

        axios
            .get(
                `https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/User/${userId}`,
                { cancelToken: source.token }
            )
            .then((res) => {
                if (res.data && res.data.name) {
                    setNameUser(res.data.name); // Armazenar o nome retornado pela API
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
    }, [isHydrated,userId]);

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
