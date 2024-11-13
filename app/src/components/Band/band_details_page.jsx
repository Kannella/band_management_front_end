import React from "react";
import { useParams } from "react-router-dom";
import { bands } from "../../pages/data/bands";

function BandDetailsPage() {
    const { id } = useParams();
    const band = bands.find(b => b.id === Number(id));

    if (!band) return <p>Band not found</p>;

    return (
        <div className="container">
            <h1>{band.name}</h1>
            <img src={band.image} alt={band.name} className="band-img" />
            <p><strong>Genre:</strong> {band.genre}</p>
            <p><strong>Manager:</strong> {band.manager}</p>

            <h3>Members</h3>
            <ul>
                {band.members.map((member, index) => (
                    <li key={index}>{member}</li>
                ))}
            </ul>

            <h3>Upcoming Events</h3>
            {band.events.length > 0 ? (
                <ul>
                    {band.events.map((event, index) => (
                        <li key={index}>{event}</li>
                    ))}
                </ul>
            ) : (
                <p>No upcoming events.</p>
            )}
        </div>
    );
}

export default BandDetailsPage;
