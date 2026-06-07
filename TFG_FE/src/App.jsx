import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React from 'react';
import { AuthProvider } from './auth/AuthContext';
import LoginPage from './pages/login';
import ProjectsDashboard from './pages/ProjectDashboard';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Automatically redirect standard visitors to the login view */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Main Application Routes */}
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/Dashboard" element={<ProjectsDashboard/>} />
          {/* Fallback redirect for broken or mismatched URLs */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}