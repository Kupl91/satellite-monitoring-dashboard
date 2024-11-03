// src/components/SatelliteDetails/SatelliteDetails.tsx
import React, { useEffect, useState } from 'react';
import { Satellite } from '../../types/satellite';
import './SatelliteDetails.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatDate } from '../../utils/formatDate';

interface TemperatureData {
  time: string;
  mainSystem: number;
  communication: number;
  powerUnit: number;
}

interface BatteryData {
  time: string;
  batteryLevel: number;
}

interface SatelliteDetailsProps {
  satellite: Satellite;
}

const generateMockTemperatureData = (): TemperatureData[] => {
  const data: TemperatureData[] = [];
  const now = new Date();
  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    data.push({
      time,
      mainSystem: Math.floor(Math.random() * 100) - 50, // -50°C to +50°C
      communication: Math.floor(Math.random() * 100) - 50,
      powerUnit: Math.floor(Math.random() * 100) - 50,
    });
  }
  return data;
};

const generateMockBatteryData = (): BatteryData[] => {
  const data: BatteryData[] = [];
  const now = new Date();
  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    data.push({
      time,
      batteryLevel: Math.floor(Math.random() * 101), // 0% to 100%
    });
  }
  return data;
};

const SatelliteDetails: React.FC<SatelliteDetailsProps> = ({ satellite }) => {
  const [temperatureData, setTemperatureData] = useState<TemperatureData[]>([]);
  const [batteryData, setBatteryData] = useState<BatteryData[]>([]);

  useEffect(() => {
    // Генерация фиктивных данных
    setTemperatureData(generateMockTemperatureData());
    setBatteryData(generateMockBatteryData());

    // В реальном приложении здесь должен быть запрос к API для получения исторических данных
  }, [satellite.id]);

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
      <p><strong>Последнее обновление:</strong> {formatDate(satellite.lastUpdate)}</p>

      <div className="charts">
        <h3>Температура за последние 24 часа</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={temperatureData}><CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={[-50, 50]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="mainSystem" stroke="#8884d8" />
            <Line type="monotone" dataKey="communication" stroke="#82ca9d" />
            <Line type="monotone" dataKey="powerUnit" stroke="#ff7300" />
          </LineChart>
        </ResponsiveContainer>

        <h3>Уровень заряда батареи за последние 24 часа</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={batteryData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="batteryLevel" stroke="#387908" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SatelliteDetails;