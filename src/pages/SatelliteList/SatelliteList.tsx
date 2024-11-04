// src/pages/SatelliteList.tsx
import React from 'react';
import SatelliteList from '../../components/SatelliteList/SatelliteList';
import SatelliteStatus from '../../components/SatelliteStatus/SatelliteStatus';
import SatelliteMap from '../../components/SatelliteMap/SatelliteMap';
import './SatelliteList.css';

const SatelliteListPage: React.FC = () => {
  return (
    <div className="satellite-list-page">
      <SatelliteStatus />
      <SatelliteMap />
      <SatelliteList />
    </div>
  );
};

export default SatelliteListPage;
