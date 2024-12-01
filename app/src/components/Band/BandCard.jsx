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
                    <img src={band.image} alt={band.name} className="card-img" />
                </div>
                <div className="col-12">
                    <div className="card-body">
                        <h5 className= "card-title mb-2">{band.name}</h5>
                        <p className= "card-text"> GENRE  </p>
                        <p className= "card-text">  <strong>{band.genre}</strong></p>

                        <p className= "card-text mb-2"> MANAGE BY </p>
                        <div className="d-flex align-items-center justify-content-center manager-section">
                                <FaUserCircle className="user-icon" size={23}/>

                                <p className= "card-text mb-0 mx-2"><strong>{band.manager}</strong></p>

                            <button 
                                className="btn btn-link arrow-button" 
                                onClick={handleArrowClick}
                            >
                                <FaArrowCircleRight size={24} />
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default BandCard;