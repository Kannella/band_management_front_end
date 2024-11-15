// member_card.jsx
import React from "react";
import { FaUserCircle, FaTrash } from "react-icons/fa";
import '../../assets/styles/styles.css';

function MemberCard({ member, email, onRemove }) {
    return (
        <div className="card member-card mb-3">
            <div className="d-flex align-items-center p-3">
                <FaUserCircle className="member-icon me-3" size={40} />
                <div className="flex-grow-1">
                    <h5 className="mb-1">{member}</h5>
                    <p className="mb-1">{email}</p>
                </div>
                <button
                    className="btn btn-danger remove-button"
                    onClick={() => onRemove(member)}
                >
                    <FaTrash size={20} />
                </button>
            </div>
        </div>
    );
}

export default MemberCard;
