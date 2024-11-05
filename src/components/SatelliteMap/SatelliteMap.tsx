// src/components/SatelliteMap/SatelliteMap.tsx
import React from 'react';
import MapView from '../MapView/MapView';
import './SatelliteMap.css';

const SatelliteMap: React.FC = () => (
  <div className="satellite-map" aria-label="Карта расположения спутников">
    <MapView />
  </div>
);

export default SatelliteMap;