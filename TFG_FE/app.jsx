import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Global Navigation Bar stays at the top of every page */}
        <Navbar />
        
        {/* Page Content Router */}
        <Routes>
          {/* Automatically send users landing on http://localhost:5173/ straight to the login screen */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Target application pages */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          
          {/* Catch-all fallback: If a user types a broken URL, bounce them back to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}