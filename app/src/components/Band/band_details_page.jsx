// band_details_page.jsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaTrashAlt, FaUserCircle, FaEdit, FaPlusCircle } from "react-icons/fa";
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

    const [removedMembers, setRemovedMembers] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    const handleRemoveMember = (memberName) => {
        const removedMember = members.find(member => member.name === memberName);
        setMembers(members.filter(member => member.name !== memberName));
        setRemovedMembers([...removedMembers, removedMember]);
    };

    const handleAddMember = (memberName) => {
        const memberToAdd = removedMembers.find(member => member.name === memberName);
        setMembers([...members, memberToAdd]);
        setRemovedMembers(removedMembers.filter(member => member.name !== memberName));
    };

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    if (!band) return <p>Band not found</p>;

    return (
        <div className="container mt-4">
            <h1>{band.name}</h1>

            <div className="content mb-4 mt-4 custom-header">
                <h2 className="mb-0">Band Members</h2>
                <button className="btn btn-outline-primary edit-button" onClick={toggleEditMode}>
                    <FaEdit /> Edit Band
                </button>
            </div>

            {isEditing && removedMembers.length > 0 && (
                <div className="readd-members-card mb-4">
                    <div className="readd-card-header">
                        <p>Re-add Removed Members</p>
                    </div>
                    <div className="readd-card-body">
                        {removedMembers.map((member, index) => (
                            <div key={index} className="readd-member-card">
                                <div className="readd-member-info">
                                    <FaUserCircle className="readd-member-icon" size={35} />
                                    <span className="readd-member-name">{member.name}</span>
                                </div>
                                <span className="readd-member-email">{member.email}</span>
                                <button
                                    className="btn btn-link readd-button"
                                    onClick={() => handleAddMember(member.name)}
                                >
                                    <FaPlusCircle size={17} /> Add
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

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

                            {isEditing && (
                            <button
                                className="btn btn-link remove-button"
                                onClick={() => handleRemoveMember(member.name)}
                            >
                                <FaTrashAlt size={15} />
                            </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="content mb-4 mt-5">
                <h2>Band Upcoming Events</h2>
            </div>

            </div>
                
    );
}

export default BandDetailsPage;
