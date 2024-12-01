import React from "react";
import { FaUserCircle, FaTrashAlt } from "react-icons/fa";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";
import './band_components.css';

function BandMembersTable({ members, isEditing, onRemoveMember }) {
    return (
        <TableContainer className= 'table-responsive' component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        {isEditing && <TableCell>Actions</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {members.map((member, index) => (
                        <TableRow key={index}>
                            <TableCell>
                                <FaUserCircle size={30} style={{ marginRight: 8 }} />
                                {member.name}
                            </TableCell>
                            <TableCell>{member.email}</TableCell>
                            {isEditing && (
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => onRemoveMember(member.name)}
                                        startIcon={<FaTrashAlt />}
                                    >
                                        Remove
                                    </Button>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default BandMembersTable;
