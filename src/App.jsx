// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import SessionPage from './components/SessionPage';
import Dashboard from './components/Dashboard';
import SessionHistory from './components/SessionHistory';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/session" element={<SessionPage />} />
        <Route path="/session-history" element={<SessionHistory />} />
      </Routes>
    </Router>
  );
};

export default App;
