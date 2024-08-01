import { useNavigate } from 'react-router-dom';
import { useFlashMessage } from '../contexts/FlashMessageContext';
import '../styles/Auth.css';


function Logout() {
  const navigate = useNavigate();
  const addMessage = useFlashMessage();

  const handleLogout = async (e) => {
    const jwtToken = localStorage.getItem('jwtToken');
    if (!jwtToken) {
      console.error('JWT token not found');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/users/sign_out', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${jwtToken}`,
        }
      });

      const data = await response.json();

      if (!response.ok) {
        addMessage(data.errors)
        return;
      }

      addMessage(data.message)
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('user');
      navigate(0);
      navigate('/');
    } catch (error) {
      console.error('Error logging in:', error);
      addMessage(error.message);
    }
  };

  return (
    <span className="nav-link" onClick={handleLogout} style={{ cursor: 'pointer' }}>
      Logout
    </span>
  );
}

export default Logout;
