// BandMembersTable.jsx
import React from "react";
import { FaUserCircle, FaTrashAlt, FaPlusCircle } from "react-icons/fa";
import './band_components.css'; 

function BandMembersTable({ members, removedMembers, isEditing, onRemoveMember, onAddMember }) {
    return (
        <>
            {/* Active Members Table */}
            <div className="members-table">
                <div className="members-header">
                    <span className="header-name">Members</span>
                    <span className="header-email">E-mail</span>
                    {isEditing && <span className="header-action"></span>}
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
                                    onClick={() => onRemoveMember(member.name)}
                                >
                                    <FaTrashAlt size={15} />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Removed Members Table */}
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
                                    onClick={() => onAddMember(member.name)}
                                >
                                    <FaPlusCircle size={17} /> Add
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}

export default BandMembersTable;
