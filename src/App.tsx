// src/App.tsx
import React, { Suspense, lazy } from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SatelliteListPage from './pages/SatelliteList/SatelliteList';
import SatelliteStatus from './components/SatelliteStatus/SatelliteStatus';
import SatelliteMap from './components/SatelliteMap/SatelliteMap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import 'leaflet/dist/leaflet.css';

// Ленивый импорт компонента SatelliteDetail
const SatelliteDetail = lazy(() => import('./pages/SatelliteDetail/SatelliteDetail'));

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <h1>Панель Мониторинга Спутников</h1>
        <Routes>
          <Route path="/" element={<SatelliteListPage />} />
          <Route
            path="/satellite/:id"
            element={
              <Suspense fallback={<div>Загрузка деталей спутника...</div>}>
                <SatelliteDetail />
              </Suspense>
            }
          />
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
};

export default App;