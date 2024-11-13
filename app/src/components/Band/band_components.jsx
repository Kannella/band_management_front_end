// band_components.jsx
import React from "react";
import {useLocation } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../assets/styles/styles.css';

function BandComponents() {
    const location = useLocation();
    const band = location.state?.band;

    if (!band) {
        return <p>Band not found!</p>;
    }

    return (
        <div className="container mt-4">
           <h1>{band.name}</h1>
            <h2>Genre: {band.genre}</h2>
            <h3>Managed by: {band.manager}</h3>
            <div className="content mt-4">
                <h4>Band Members:</h4>
                <ul>
                    {band.members.map((member, index) => (
                        <li key={index}>{member}</li>
                    ))}
                </ul>

                <h4>Upcoming Events:</h4>
                <ul>
                    {band.events.length > 0 ? (
                        band.events.map((event, index) => (
                            <li key={index}>{event}</li>
                        ))
                    ) : (
                        <p>No upcoming events.</p>
                    )}
                </ul>
            </div>
        </div>
    );
}
export default BandComponents;
