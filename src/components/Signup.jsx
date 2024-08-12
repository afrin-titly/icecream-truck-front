import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Auth.css';
import { useFlashMessage } from '../contexts/FlashMessageContext';
import { isLoggedIn } from './Auth';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const addMessage = useFlashMessage();

  // useEffect(() => {
  //   if (isLoggedIn()) {
  //     navigate('/');
  //   }
  // }, [navigate]);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            email: email,
            password: password,
            password_confirmation: confirmPassword
          }
          }),
      });

      const data = await response.json();

      if (!response.ok) {
        addMessage(data.errors);
        console.error(`HTTP error! Status: ${response.status}`);
        return;
      }

      const token = response.headers.get('authorization');
      addMessage(data.message)
      if (!token) {
        addMessage(data.errors);
        console.error(`HTTP error! Status: ${response.status}`);
        return;
      }

      localStorage.setItem('jwtToken', token);

      navigate('/');
    } catch (error) {
      console.error('Error signing up:', error);
      addMessage(error.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default Signup;
