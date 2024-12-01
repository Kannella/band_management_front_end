import React, { useState, useEffect } from "react";
import axios from "axios";
import BandPopup from "../components/Band/BandCreatePopup";
import CardWidget from "../components/Band/BandCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus} from '@fortawesome/free-solid-svg-icons';
import { useAuthStore } from "../store/authStore";

function BandPage() {
    const userId = useAuthStore((state) => state.userId); 
    const [bands, setBands] = useState([]); // For storing the user's bands with full details
    const [allBands, setAllBands] = useState([]); // For storing all available bands
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [showPopup, setShowPopup] = useState(false);
    const handleShowPopup = () => setShowPopup(true);
    const handleClosePopup = () => setShowPopup(false);

    useEffect(() => {
        const fetchBands = async () => {
            try {
                setLoading(true); // Start loading

                if (userId) {
                    // 1. Fetch the user's bands (only name)
                    const bandResponse = await axios.get(
                        `https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/Booking/GetBandsForUser?userId=${userId}`
                    );
                    const userBands = bandResponse.data || [];
                    
                    // 2. Fetch all available bands (with id and name)
                    const allBandsResponse = await axios.get(
                        "https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/Band/"
                    );
                    const allBandsList = allBandsResponse.data || [];

                    setAllBands(allBandsList); // Store all bands

                    // 3. Match the names and get the id of each band
                    const updatedBands = userBands.map((userBand) => {
                        const matchingBand = allBandsList.find(
                            (band) => band.name === userBand.name
                        );
                        return matchingBand ? { ...userBand, id: matchingBand.id } : userBand;
                    });

                    setBands(updatedBands); // Update the user's bands with the id
                }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false); // Finish loading
            }
        };

        fetchBands();
    }, [userId]);

    if (loading) {
        return <div>Loading...</div>; // Show loading message or spinner
    }

    if (error) {
        return <div>{`Error: ${error}`}</div>; // Show error message
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
                        <CardWidget band={band} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BandPage;
