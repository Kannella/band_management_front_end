import React, { useState } from "react";
import BandPopup from "../../components/Band/popup_band_create";
import CardWidget from "../../components/Band/cards_widget";
import { bands } from '../data/bands';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus} from '@fortawesome/free-solid-svg-icons';

function BandManagerPage() {
    const [showPopup, setShowPopup] = useState(false);

    const handleShowPopup = () => setShowPopup(true);
    const handleClosePopup = () => setShowPopup(false);

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

            <div className="row justify-content-center ">
                {bands.map((band) => (
                    <div key={band.id} className="col-12 col-md-3 col-sm-12 mb-4">
                        <CardWidget band={band} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default BandManagerPage;
