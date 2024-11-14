import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaTrashAlt, FaUserCircle } from "react-icons/fa";
import { bands } from "../../pages/data/bands";
import '../../assets/styles/styles.css';


function BandDetailsPage() {
    const { id } = useParams();
    const band = bands.find(b => b.id === Number(id));

    const [members, setMembers] = useState(
        band.members.map(member => ({
            name: member,
            email: `${member.toLowerCase().replace(' ', '.')}@example.com`,
        }))
    );

    const handleRemoveMember = (memberName) => {
        setMembers(members.filter(member => member.name !== memberName));
    };

    if (!band) return <p>Band not found</p>;

    return (
        <div className="container mt-4">
            <h1>{band.name}</h1>

            <div className="content mb-4">
                <h2>Band Members</h2>
            </div>

            <div className="members-table">
                <div className="members-header">
                        <span className="header-name">Members</span>
                        <span className="header-email">E-mail</span>
                        <span className="header-action"></span>
                    </div>

                    <div className="members-list">
                        {members.map((member, index) => (
                            <div key={index} className="member-card">
                                <div className="member-info">
                                    <FaUserCircle className="member-icon" size={35} />
                                    <span className="member-name">{member.name}</span>
                                </div>
                                <span className="member-email">{member.email}</span>
                                <button
                                    className="btn btn-link remove-button"
                                    onClick={() => handleRemoveMember(member.name)}
                                >
                                    <FaTrashAlt size={15} />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
                

    );
}

export default BandDetailsPage;
