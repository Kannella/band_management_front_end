import { Button } from 'react-bootstrap';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    localStorage.clear(); 
   
    setTimeout(() => {
      navigate('/login');
    }, 100);

  };

  return <Button variant='danger' onClick={handleLogout}>Logout</Button>;
};

export default LogoutButton;
