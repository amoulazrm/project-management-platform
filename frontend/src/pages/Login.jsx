import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ✅ nouvelle API
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // ✅ remplacement de useHistory

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        navigate('/dashboard'); // ✅ redirection mise à jour
      } else {
        console.error('Erreur lors de la connexion :', res.data.message);
      }
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
