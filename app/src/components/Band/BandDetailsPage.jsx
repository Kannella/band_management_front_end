import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FaEdit, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { bands } from "../../pages/data/bands";
import BandMembersTable from "./BandMemberTable";
import "./band_components.css";
import BookingCard from "../Booking/BookingCard";

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

            <div className="content mb-4 mt-4 d-flex justify-content-start">
                <h2 className="title3-page me-5">Band Members</h2>
                <div className="row">
                    <div className="col-12 col-sm-auto">
                        <button className="btn btn-outline-secondary edit-button" onClick={toggleEditMode}>
                            Edit Band
                        </button>
                    </div>
                </div>
            </div>

            {isEditing && (
                <div className="row mb-4">
                    <div className="col-12 col-md-6 col-lg-4">
                        <h3 className="sub-text">Add New Member</h3>
                        <div className="row g-2 align-items-center mx-0">
                            <div className="col-12 col-sm-6">
                                <input
                                    type="text"
                                    name="name"
                                    value={newMember.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter name"
                                    className="form-control"
                                />
                            </div>
                            <div className="col-12 col-sm-6">
                                <input
                                    type="email"
                                    name="email"
                                    value={newMember.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter email"
                                    className="form-control"
                                />
                            </div>
                            <div className="col-12 col-sm-4">
                                <button className="btn btn-dark w-100" onClick={handleSaveNewMember}>
                                    Add Member
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="table-responsive">
                <BandMembersTable
                    members={members}
                    removedMembers={removedMembers}
                    isEditing={isEditing}
                    onRemoveMember={handleRemoveMember}
                    onAddMember={handleAddMember}
                />
            </div>

            <div className="content mb-4 mt-5">
                <h2 className="title3-page">Band Upcoming Events</h2>
                <p className="sub-text">Next bookings</p>
            </div>

            <div className="row">
                <BookingCard />
            </div>
        </div>
    );
}

export default BandDetailsPage;
