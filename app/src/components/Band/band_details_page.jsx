import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaEdit, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { bands } from "../../pages/data/bands";
import BandMembersTable from "./band_member_table";
import "./band_components.css";
import BookingCard from "../Booking/card_booking";

function BandDetailsPage() {
    const { id } = useParams();
    const band = bands.find((b) => b.id === Number(id));

    const [members, setMembers] = useState(
        band.members.map((member) => ({
            name: member,
            email: `${member.toLowerCase().replace(" ", ".")}@example.com`,
        }))
    );

    const [newMember, setNewMember] = useState({ name: "", email: "" });
    const [removedMembers, setRemovedMembers] = useState([]);
    const [isEditing, setIsEditing] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewMember({ ...newMember, [name]: value });
    };

    const handleSaveNewMember = () => {
        if (newMember.name && newMember.email) {
            setMembers([...members, newMember]);
            setNewMember({ name: "", email: "" }); // Limpa o formulário
        }
    };

    const handleRemoveMember = (memberName) => {
        const removedMember = members.find((member) => member.name === memberName);
        setMembers(members.filter((member) => member.name !== memberName));
        setRemovedMembers([...removedMembers, removedMember]);
    };

    const handleAddMember = (memberName) => {
        const memberToAdd = removedMembers.find((member) => member.name === memberName);
        setMembers([...members, memberToAdd]);
        setRemovedMembers(removedMembers.filter((member) => member.name !== memberName));
    };

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
    };

    if (!band) return <p>Band not found</p>;

    return (
        <div className="container-fluid pt-3 ms-3">
            <h1 className="title-page">{band.name}</h1>

            <div className="content mb-4 mt-4 custom-header">
                <h2 className="title3-page">Band Members</h2>
                <button className="btn btn-outline-primary edit-button" onClick={toggleEditMode}>
                    <FaEdit /> Edit Band
                </button>
            </div>

            {isEditing && (
                <div className="row mb-4">
                    <div className="col-12">
                        <h3 className="sub-text">Add New Member</h3>
                        <div className="row g-2 align-items-center mx-0">
                            <div className="col-4">
                                <input
                                    type="text"
                                    name="name"
                                    value={newMember.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter name"
                                    className="form-control"
                                />
                            </div>
                            <div className="col-4">
                                <input
                                    type="email"
                                    name="email"
                                    value={newMember.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter email"
                                    className="form-control"
                                />
                            </div>
                            <div className="col-3">
                                <button className="btn btn-dark w-100" onClick={handleSaveNewMember}>
                                    Add Member
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <BandMembersTable
                members={members}
                removedMembers={removedMembers}
                isEditing={isEditing}
                onRemoveMember={handleRemoveMember}
                onAddMember={handleAddMember}
            />

            <div className="content mb-4 mt-5">
                <h2 className="title3-page">Band Upcoming Events</h2>
                <p className="sub-text">Next bookings</p>
                <BookingCard />
                <BookingCard />
            </div>
        </div>
    );
}

export default BandDetailsPage;
