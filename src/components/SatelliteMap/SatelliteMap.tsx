import React from 'react';
import MapView from '../MapView/MapView';
import './SatelliteMap.css';

const SatelliteMap: React.FC = () => {
  return (
    <div className="satellite-map">
      <h2>Карта спутников</h2>
      <MapView />
    </div>
  );
};

export default SatelliteMap;
