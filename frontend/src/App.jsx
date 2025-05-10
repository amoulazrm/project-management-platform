import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="#Profile" element={<Profile />} />
        <Route path="#login" element={<Login />} />
        <Route path="#register" element={<Register />} />
        <Route path="#dashboard" element={<Dashboard />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
};

export default App;
