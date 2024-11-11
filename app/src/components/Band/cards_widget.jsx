// cards_widget.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/styles/styles.css';

function CardWidget({ band }) {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/bands/${band.id}`);
    };

    return (
        <div className="card custom-card mb-3 " onClick={handleCardClick} style={{ cursor: "pointer" }}>
            <div className="row g-0">
                <div className="col-12">
                    <img src={band.image} alt={band.name} className="card-img" />
                </div>
                <div className="col-12">
                    <div className="card-body">
                        <h5 className= "card-title">{band.name}</h5>
                        <p className= "card-text"> GENRE:  </p>
                        <p className= "card-text">  <strong>{band.genre}</strong></p>
                        <p className= "card-text"> MANAGE BY: </p>
                        <p className= "card-text"><strong>{band.manager}</strong></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardWidget;