// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SatelliteListPage from './pages/SatelliteList/SatelliteList';
import SatelliteDetail from './pages/SatelliteDetail/SatelliteDetail';
import SatelliteStatus from './components/SatelliteStatus/SatelliteStatus';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import 'leaflet/dist/leaflet.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <h1>Панель Мониторинга Спутников</h1>
        <Routes>
          <Route path="/" element={<SatelliteListPage />} />
          <Route path="/satellite/:id" element={<SatelliteDetail />} />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
};

export default App;
