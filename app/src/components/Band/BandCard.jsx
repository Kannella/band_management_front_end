// cards_widget.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import {FaArrowCircleRight, FaUserCircle} from 'react-icons/fa';
import './band_components.css'; 


function BandCard({ band }) {
    const navigate = useNavigate();

    const handleArrowClick = () => {
        navigate(`/band/${band.id}`);
    };

    return (
        <div className="card custom-card mb-3 ">
            <div className="row g-0">
                <div className="col-12">
                    <div className="card-body mt-4">
                        <h5 className= "card-title mt-4 mb-4">{band.name}</h5>
                        <div className="d-flex align-items-center justify-content-center manager-section mt-4">

                            <button 
                                className="btn btn-link arrow-button" 
                                onClick={handleArrowClick}
                            >
                                <FaArrowCircleRight size={50} />
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default BandCard;