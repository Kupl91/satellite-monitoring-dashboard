//src/components/SatelliteDetails/TemperatureDisplay.tsx
import React from 'react';
import { Temperature } from '../../types/satellite';
import './TemperatureDisplay.css';

interface TemperatureDisplayProps {
  temperature?: Temperature;
}

const TemperatureDisplay: React.FC<TemperatureDisplayProps> = ({ temperature }) => {
  if (!temperature) return null;

  return (
    <div className="temperature-display">
      <strong>Температура:</strong>
      <ul>
        {temperature.mainSystem !== undefined && (
          <li>Основная система: {temperature.mainSystem}°C</li>
        )}
        {temperature.communication !== undefined && (
          <li>Коммуникации: {temperature.communication}°C</li>
        )}
        {temperature.powerUnit !== undefined && (
          <li>Блок питания: {temperature.powerUnit}°C</li>
        )}
      </ul>
    </div>
  );
};

export default TemperatureDisplay;