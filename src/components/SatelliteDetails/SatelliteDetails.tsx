import React from 'react';
import { SatelliteDetailsProps } from '../../types/satellite';
import './SatelliteDetails.css';
import TemperatureDisplay from './TemperatureDisplay';
import BatteryLevelDisplay from './BatteryLevelDisplay';
import SatelliteCharts from './ChartsContainer/SatelliteCharts';
import SatelliteInfoList from './SatelliteInfo/SatelliteInfoList';


const SatelliteDetails: React.FC<SatelliteDetailsProps> = ({ satellite }) => {
  return (
    <div className="satellite-details" aria-labelledby="satellite-details-heading">
      <h2 id="satellite-details-heading">{satellite.name}</h2>
      <SatelliteInfoList satellite={satellite} />

<TemperatureDisplay temperature={satellite.temperature} />
<BatteryLevelDisplay batteryLevel={satellite.batteryLevel} />

<SatelliteCharts satelliteId={satellite.id} />
</div>
);
};

export default SatelliteDetails;