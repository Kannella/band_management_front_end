import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { FaEdit, FaUserPlus } from "react-icons/fa";
import axios from "axios";
import { useAuthStore } from "../store/authStore";
import BookingCard from "../components/Booking/BookingCard";
import { useNavigate } from "react-router-dom";

function BandDetailsPage() {
  const { id: bandId } = useParams();
  const isManager = useAuthStore((state) => state.isManager);
  const userId = useAuthStore((state) => state.userId);
  const location = useLocation();
  const navigate = useNavigate();
  const [bandMap, setBandMap] = useState({});
  const [venueMap, setVenueMap] = useState({});
  const [agentMap, setAgentMap] = useState({});
  const [bookings, setBookings] = useState([]);
  const [bandsUser, setBandsUser] = useState([]);
  const [allBandUsers, setAllBandUsers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [availability, setAvailability] = useState([]);
  const [band, setBand] = useState(null);
  const [bandMembers, setBandMembers] = useState(location.state?.bandMembers || []);
  const [allUsers, setAllUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [bands, setBands] = useState([]);

  const enrichedBookings = bookings.map((booking) => ({
    ...booking,
    bandName: bandMap[booking.bandId] || "Nome não disponível",
    venueName: venueMap[booking.venueId] || "Nome não disponível",
    agentName: agentMap[booking.agentId] || "Nome não disponível",
  }));

  const sortedBookings = enrichedBookings
    .sort((a, b) => new Date(b.showStartTime) - new Date(a.showStartTime)) 
    .slice(0, 2);  

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [bandResponse, usersResponse, availabilityResponse] = await Promise.all([
          axios.get(`https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/Band/${bandId}`),
          axios.get('https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/User'),
          axios.get('https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/availability')
        ]);

        setBand(bandResponse.data);
        setAllUsers(usersResponse.data);
        setAvailability(availabilityResponse.data);

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

  const getMemberAvailability = (memberId) => {
    const memberAvailability = availability.filter(avail => avail.userId === memberId);
    return memberAvailability.map(avail => avail.availabilityDate);
  };

  const handleMemberClick = (member) => {
      setSelectedMember(member);
  };

  const handleCloseModal = () => {
    setSelectedMember(null); 
  };


  const handleAddMember = async (e) => {
    e.preventDefault();
    
    try {
      const userToAdd = allUsers.find(user => user.email.toLowerCase() === newUserEmail.toLowerCase());
      
      if (!userToAdd) {
        alert("User not found. Please check the email address.");
        return;
      }
  
      console.log("Adding user:", userToAdd); 
  
      const isAlreadyMember = bandMembers.some(member => member.userId === userToAdd.id);
      if (isAlreadyMember) {
        alert("This user is already a member of the band.");
        return;
      }
  
      const response = await axios.post('https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/BandUser/AddUserToBand', {
        bandId: parseInt(bandId),
        userId: userToAdd.id
      });
  
      console.log('Response from adding user:', response.data); 
  
      setBandMembers([...bandMembers, response.data]);
      setNewUserEmail("");
    } catch (error) {
      console.error("Error adding user to band:", error);
      alert("Failed to add user to band. Please try again.");
    }
  };
  
const handleRemoveMember = async (memberToRemove) => {
  try {
    console.log("Removing member:", memberToRemove); // Log for verification
    
    // Send the DELETE request
    const url = `https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/BandUser/RemoveUserFromBand?bandId=${bandId}&userId=${memberToRemove.userId}`;
    console.log("Request URL:", url); // Log the URL to verify correctness

    await axios.delete(url);
    
    // Update the state with the new list of band members
    setBandMembers(prevMembers => prevMembers.filter(member => member.userId !== memberToRemove.userId));
  } catch (error) {
    console.error("Error removing user from band:", error.response?.data || error.message);
    alert("Failed to remove user from band. Please try again.");
  }
};

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (userId) {
          const [bookingResponse, bandResponse, bandUsersResponse, venueResponse, agentResponse, ] = await Promise.all([
            axios.get(`https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/Booking/GetBookingsForUser?userId=${userId}`),
            axios.get(`https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/Band`),
            axios.get(`https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/User`), 
            axios.get(`https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/Venue`),
            axios.get(`https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/Agent`)
          ]);

          // Load Band Data
          const bands = bandResponse.data || [];
          const bandMap = bands.reduce((acc, band) => {
            acc[band.id] = band.name;
            return acc;
          }, {});
          setBandMap(bandMap);

          // Load all Venues
          const venues = venueResponse.data || [];
          const venueMap = venues.reduce((acc, venue) => {
            acc[venue.id] = venue.name;
            return acc;
          }, {});
          setVenueMap(venueMap);

          // Load all Venue
          const agents = agentResponse.data || [];
          const agentMap = agents.reduce((acc, agent) => {
            acc[agent.id] = agent.name;
            return acc;
          }, {});
          setAgentMap(agentMap);

          // Load all Bookings
          const bookings = bookingResponse.data || [];
          setBookings(bookings);
          setBands(bands);
          setAllBandUsers(bandUsersResponse.data || []);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

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
            {isManager() && (
                <button 
                    className="btn btn-secondary" 
                    onClick={toggleEditMode}
                >
                    <FaEdit className="me-2" /> Edit Band
                </button>
            )}
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
                        <button className="btn btn-secondary"
                        onClick={() => handleMemberClick(member)}>
                            View Availability
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

      {selectedMember && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
   
                <h5 className="modal-title">Availability for {allUsers.find(user => user.id === selectedMember.userId)?.name}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleCloseModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <ul>
                  {getMemberAvailability(selectedMember.userId).map((date, index) => (
                    <li key={index}>{new Date(date).toLocaleDateString()}</li>
                  ))}
                </ul>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="content mb-4 mt-5">
        <h2 className="title3-page">Band Upcoming Events</h2>
        <p className="sub-text">Next bookings</p>
      </div>

      <div className="row">
      {sortedBookings.map((booking) => (
          <BookingCard
            key={booking.id}
            booking={booking}
            venue={booking.venueName} //venue.name
            band={booking.bandName}   // booking.name
            agent={booking.agentName} // agent.name
          />
        ))}
      </div>
    </div>
  );
}

export default BandDetailsPage;

