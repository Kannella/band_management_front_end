import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useAuthStore } from "../store/authStore";
import BandCard from "../components/Band/BandCard";
import BandPopup from "../components/Band/BandCreatePopup";

function BandPage() {
    const userId = useAuthStore((state) => state.userId);
    const navigate = useNavigate();
    const [bands, setBands] = useState([]);
    const [allBandUsers, setAllBandUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                if (userId) {
                    const [bandResponse, bandUsersResponse] = await Promise.all([
                        axios.get(`https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/Booking/GetBandsForUser?userId=${userId}`),
                        axios.get('https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/BandUser'),
                    ]);

                    setBands(bandResponse.data || []);
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

    const handleShowPopup = () => setShowPopup(true);
    const handleClosePopup = () => setShowPopup(false);

    const handleBandClick = (band) => {
        const bandMembers = allBandUsers.filter(user => user.bandId === band.id);
        navigate(`/band/${band.id}`, { state: { bandMembers } });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{`Error: ${error}`}</div>;
    }

    return (
        <div className="container-fluid pt-3 ms-3 mb-3" style={{ overflowX: "hidden" }}>
            <div className="row mb-2">
                <div className="col-12 col-md-10">
                    <h1 className="title-page">My Bands</h1>
                </div>
            </div>

            <div className="row mb-3">
                <div className="col-12 col-md-auto">
                    <div className="sub-text mt-1 mb-1 text-wrap">
                        <p>Ready to create a band? Click on the button below to start</p>
                    </div>
                </div>
            </div>

            <div className="col-12 col-md-auto ms-3">
                <button className="createButton" onClick={handleShowPopup}>
                    <FontAwesomeIcon icon={faPlus} style={{ marginRight: 10 }} />
                    {'Create new band'}
                </button>
            </div>

            <BandPopup show={showPopup} handleClose={handleClosePopup} />

            <hr />

            <div className="row">
                <div className="col-12 col-md-10">
                    <div className="content mb-4">
                        <h2 className="title2-page">Bands</h2>
                        <div className="sub-text2 me-3">Manage all your bands, to choose one click on the arrow inside the card</div>
                    </div>
                </div>
            </div>

            <div className="row justify-content-center">
                {bands.map((band) => (
                    <div key={band.id} className="col-12 col-md-3 col-sm-12 mb-4">
                        <BandCard 
                            band={band} 
                            onClick={() => handleBandClick(band)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BandPage;

