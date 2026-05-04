import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router';
// ... other imports

function App() {
  return (
    // Update this line below!
    <Router basename="/Auth-master">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashbord /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
