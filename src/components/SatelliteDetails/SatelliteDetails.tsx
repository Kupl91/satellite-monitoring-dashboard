import React from 'react';
import { Satellite } from '../../types/satellite';
import './SatelliteDetails.css';
import TemperatureDisplay from './TemperatureDisplay';
import BatteryLevelDisplay from './BatteryLevelDisplay';
import ChartsContainer from './ChartsContainer/SatelliteCharts';
import SatelliteInfoList from './SatelliteInfo/SatelliteInfoList';

interface SatelliteDetailsProps {
  satellite: Satellite;
}

const SatelliteDetails: React.FC<SatelliteDetailsProps> = ({ satellite }) => {
  return (
    <div className="satellite-details">
      <h2>{satellite.name}</h2>
      <SatelliteInfoList satellite={satellite} />
      
      {/* Использование выделенных компонентов */}
      <TemperatureDisplay temperature={satellite.temperature} />
      <BatteryLevelDisplay batteryLevel={satellite.batteryLevel} />
      
      {/* Графики */}
      <ChartsContainer satelliteId={satellite.id} />
    </div>
  );
};

export default SatelliteDetails;