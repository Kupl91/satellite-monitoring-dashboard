import React from 'react';
<<<<<<< Updated upstream
import { Routes, Route } from 'react-router-dom';
import SatelliteList from './pages/SatelliteList';
import SatelliteDetail from './pages/SatelliteDetail';
=======
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SatelliteListPage from './pages/SatelliteList/SatelliteList';
import SatelliteDetail from './pages/SatelliteDetail/SatelliteDetail';
import SatelliteStatus from './components/SatelliteStatus/SatelliteStatus';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
>>>>>>> Stashed changes
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