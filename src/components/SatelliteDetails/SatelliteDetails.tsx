// src/components/SatelliteDetails/SatelliteDetails.tsx
import React from 'react';
import { Satellite } from '../../types/satellite';
import './SatelliteDetails.css';
import TemperatureDisplay from './TemperatureDisplay';
import BatteryLevelDisplay from './BatteryLevelDisplay';
import SatelliteCharts from './ChartsContainer/SatelliteCharts';
import SatelliteInfoList from './SatelliteInfo/SatelliteInfoList';

interface SatelliteDetailsProps {
  satellite: Satellite;
}

const SatelliteDetails: React.FC<SatelliteDetailsProps> = ({ satellite }) => {
  return (
    <div className="satellite-details" aria-labelledby="satellite-details-heading">
      <h2 id="satellite-details-heading">{satellite.name}</h2>
      <SatelliteInfoList satellite={satellite} />

{/* Использование выделенных компонентов */}
<TemperatureDisplay temperature={satellite.temperature} />
<BatteryLevelDisplay batteryLevel={satellite.batteryLevel} />

{/* Графики */}
<SatelliteCharts satelliteId={satellite.id} />
</div>
);
};

export default SatelliteDetails;