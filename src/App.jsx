import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Dashbord from './Pages/Dashbord';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* 1. Redirect root to Login by default */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* 2. Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 3. Private Route (Dashboard) */}
        <Route path="/dashboard" element={<ProtectedRoute><Dashbord /></ProtectedRoute>} />

        {/* 4. Catch-all: redirect any unknown URL to login */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;