import { useAuthStore } from '../../store/authStore';
import { clearBookingStorage } from '../../store/bookingStore';
import { clearBandStorage } from '../../store/bandStore';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout(); 
    clearBandStorage();
    clearBookingStorage(); 
    navigate('/login');
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;


