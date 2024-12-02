import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { FaEdit, FaUserPlus } from "react-icons/fa";
import axios from "axios";
import { useAuthStore } from "../store/authStore";
import BookingCard from "../components/Booking/BookingCard";

function BandDetailsPage() {
  const { id: bandId } = useParams();
  const location = useLocation();
  const userId = useAuthStore((state) => state.userId);

  const [band, setBand] = useState(null);
  const [bandMembers, setBandMembers] = useState(location.state?.bandMembers || []);
  const [allUsers, setAllUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newUserEmail, setNewUserEmail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [bandResponse, usersResponse] = await Promise.all([
          axios.get(`https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/Band/${bandId}`),
          axios.get('https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/User'),
        ]);

        setBand(bandResponse.data);
        setAllUsers(usersResponse.data);

        if (!location.state?.bandMembers) {
          const bandUsersResponse = await axios.get(`https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/BandUser?bandId=${bandId}`);
          setBandMembers(bandUsersResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [bandId, location.state?.bandMembers]);

  const handleAddMember = async (e) => {
    e.preventDefault();
    
    try {
      const userToAdd = allUsers.find(user => user.email.toLowerCase() === newUserEmail.toLowerCase());
      
      if (!userToAdd) {
        alert("User not found. Please check the email address.");
        return;
      }

      const isAlreadyMember = bandMembers.some(member => member.userId === userToAdd.id);
      if (isAlreadyMember) {
        alert("This user is already a member of the band.");
        return;
      }

      const response = await axios.post('https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/BandUser/AddUserToBand', {
        bandId: parseInt(bandId),
        userId: userToAdd.id
      });

      setBandMembers([...bandMembers, response.data]);
      setNewUserEmail("");
    } catch (error) {
      console.error("Error adding user to band:", error);
      alert("Failed to add user to band. Please try again.");
    }
  };

  const handleRemoveMember = async (memberToRemove) => {
    try {
      await axios.delete(`https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/BandUser/RemoveUserFromBand?bandId=${bandId}&userId=${memberToRemove.userId}`);
      setBandMembers(bandMembers.filter(member => member.userId !== memberToRemove.userId));
    } catch (error) {
      console.error("Error removing user from band:", error);
      alert("Failed to remove user from band. Please try again.");
    }
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!band) return <div>Band not found</div>;

  return (
    <div className="container-fluid pt-3 ms-3">
      <h1 className="title-page">{band.name}</h1>

      <div className="content mb-4 mt-4 d-flex justify-content-between align-items-center">
        <h2 className="title3-page">Band Members</h2>
        <button 
          className="btn btn-secondary" 
          onClick={toggleEditMode}
        >
          <FaEdit className="me-2" /> Edit Band
        </button>
      </div>

      {isEditing && (
        <div className="row mb-4">
          <div className="col-12">
            <form onSubmit={handleAddMember} className="d-flex gap-2">
              <input
                type="email"
                className="form-control"
                placeholder="Enter user email"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
                required
              />
              <button type="submit" className="btn btn-primary">
                <FaUserPlus className="me-2" /> Add Member
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              {isEditing && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {bandMembers.length === 0 ? (
              <tr>
                <td colSpan={isEditing ? 4 : 3} className="text-center">
                  No members found for this band
                </td>
              </tr>
            ) : (
              bandMembers.map((member) => {
                const user = allUsers.find(u => u.id === member.userId);
                return (
                  <tr key={member.id}>
                    <td>{member.userId}</td>
                    <td>{user ? user.name : 'Unknown'}</td>
                    <td>{user ? user.email : 'Unknown'}</td>
                    {isEditing && (
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleRemoveMember(member)}
                        >
                          Remove
                        </button>
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
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

