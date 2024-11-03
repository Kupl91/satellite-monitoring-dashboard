//src\components\SatelliteDetails\SatelliteDetails.tsx
import React from 'react';
import { Satellite } from '../../types/satellite';
import './SatelliteDetails.css';

interface SatelliteDetailsProps {
  satellite: Satellite;
}

const SatelliteDetails: React.FC<SatelliteDetailsProps> = ({ satellite }) => {
  return (
    <div className="satellite-details">
      <h2>{satellite.name}</h2>
      <p><strong>Тип:</strong> {satellite.type}</p>
      <p><strong>Статус:</strong> {satellite.status}</p>
      <p><strong>Высота орбиты:</strong> {satellite.orbitHeight} км</p>
      {satellite.speed && <p><strong>Скорость:</strong> {satellite.speed} км/с</p>}
      {satellite.temperature && (
        <div>
          <strong>Температура:</strong>
          <ul>
            <li>Основная система: {satellite.temperature.mainSystem}°C</li>
            <li>Коммуникации: {satellite.temperature.communication}°C</li>
            <li>Блок питания: {satellite.temperature.powerUnit}°C</li>
          </ul>
        </div>
      )}
      <p><strong>Уровень батареи:</strong> {satellite.batteryLevel}%</p>
      <p><strong>Последнее обновление:</strong> {new Date(satellite.lastUpdate).toLocaleString()}</p>
    </div>
  );
};

export default SatelliteDetails;
