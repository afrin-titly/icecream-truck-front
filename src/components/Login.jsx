import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useFlashMessage } from '../contexts/FlashMessageContext';
import '../styles/Auth.css';
import { isLoggedIn } from './Auth';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useCart();
  const addMessage = useFlashMessage();

  useEffect(() => {
    if (isLoggedIn()) {
      navigate(0);
      navigate('/');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email: email,
            password: password,
          }
         }),
      });

      const data = await response.json();
      const { message, user } = data

      if (!response.ok) {
        const errorData = data.errors;
        throw new Error(errorData || `HTTP error! status: ${response.status}`);
      }

      const token = response.headers.get('authorization');
      addMessage(message)
      if (!token) {
        throw new Error('No token found in the response headers');
      }

      localStorage.setItem('jwtToken', token);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/');
      navigate(0); // refresh page
    } catch (error) {
      console.error('Error logging in:', error);
      addMessage(error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/signup">Signup</Link></p>
    </div>
  );
}

export default Login;
