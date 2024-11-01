import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SatelliteList from './pages/SatelliteList';
import SatelliteDetail from './pages/SatelliteDetail';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SatelliteList />} />
        <Route path="/satellite/:id" element={<SatelliteDetail />} />
      </Routes>
    </div>
  );
};

export default App;