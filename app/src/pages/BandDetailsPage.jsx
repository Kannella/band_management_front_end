import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { FaEdit, FaUserPlus } from "react-icons/fa";
import axios from "axios";
import { useAuthStore } from "../store/authStore";
import BookingCard from "../components/Booking/BookingCard";
import { useNavigate } from "react-router-dom";

function BandDetailsPage() {
  const { id: bandId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [bandMap, setBandMap] = useState({});
  const [venueMap, setVenueMap] = useState({});
  const [agentMap, setAgentMap] = useState({});
  const [bookings, setBookings] = useState([]);
  const userId = useAuthStore((state) => state.userId);
  const [bandsUser, setBandsUser] = useState([]);
  const [allBandUsers, setAllBandUsers] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [band, setBand] = useState(null);
  const [bandMembers, setBandMembers] = useState(location.state?.bandMembers || []);
  const [allUsers, setAllUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [bands, setBands] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);

  const enrichedBookings = bookings.map((booking) => ({
    ...booking,
    bandName: bandMap[booking.bandId] || "Nome não disponível",
    venueName: venueMap[booking.venueId] || "Nome não disponível",
    agentName: agentMap[booking.agentId] || "Nome não disponível",
  }));

  const sortedBookings = enrichedBookings
    .sort((a, b) => new Date(b.showStartTime) - new Date(a.showStartTime))  // Ordenando por showStartTime
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
        setSelectedMember(member); // Definir o membro clicado para exibir no popup
    };

    const handleCloseModal = () => {
        setSelectedMember(null); // Fechar a modal
      };
    



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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (userId) {
          const [bookingResponse, bandResponse, bandUsersResponse, venueResponse, agentResponse] = await Promise.all([
            axios.get(`https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/Booking/GetBookingsForUser?userId=${userId}`),
            axios.get(`https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/Band`),
            axios.get(`https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/User`), // Caso precise de outros dados de usuários da banda
            axios.get(`https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/Venue`),
            axios.get(`https://bandmanagerbackend-ephyhfb4d4fvayh2.brazilsouth-01.azurewebsites.net/api/Agent`)
          ]);

          // Carregar os dados das bandas
          const bands = bandResponse.data || [];
          const bandMap = bands.reduce((acc, band) => {
            acc[band.id] = band.name;
            return acc;
          }, {});
          setBandMap(bandMap);

          // Carregar os dados dos venues
          const venues = venueResponse.data || [];
          const venueMap = venues.reduce((acc, venue) => {
            acc[venue.id] = venue.name;
            return acc;
          }, {});
          setVenueMap(venueMap);

          // Carregar os dados dos agentes
          const agents = agentResponse.data || [];
          const agentMap = agents.reduce((acc, agent) => {
            acc[agent.id] = agent.name;
            return acc;
          }, {});
          setAgentMap(agentMap);

          // Carregar os bookings
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
                  <tr key={member.id} onClick={() => handleMemberClick(member)}>
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

      {/* Modal for displaying member availability */}
      {selectedMember && (
        <div className="modal fade show" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }} tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Availability for {allUsers.find(user => user.id === selectedMember.userId)?.name}</h5>
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
            venue={booking.venueName}  // Passando o nome do venue
            band={booking.bandName}    // Passando o nome da band
            agent={booking.agentName}  // Passando o nome do agent
          />
        ))}
      </div>
    </div>
  );
}

export default BandDetailsPage;

