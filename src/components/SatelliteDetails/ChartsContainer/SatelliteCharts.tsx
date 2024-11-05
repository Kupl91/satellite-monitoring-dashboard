//src/components/SatelliteDetails/SatelliteCharts/SatelliteCharts.tsx
import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { formatDate } from '../../../utils/formatDate';
import './SatelliteCharts.css';
import { BatteryData, SatelliteChartsProps, TemperatureData } from '../../../types/satellite';

const generateMockTemperatureData = (): TemperatureData[] => {
  const data: TemperatureData[] = [];
  const now = new Date();
  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000)
      .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    data.push({
      time,
      mainSystem: Math.floor(Math.random() * 100) - 50,
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
    const time = new Date(now.getTime() - i * 60 * 60 * 1000)
      .toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    data.push({
      time,
      batteryLevel: Math.floor(Math.random() * 101),
    });
  }
  return data;
};

const SatelliteCharts: React.FC<SatelliteChartsProps> = () => {
  const [temperatureData, setTemperatureData] = useState<TemperatureData[]>([]);
  const [batteryData, setBatteryData] = useState<BatteryData[]>([]);

  useEffect(() => {
    setTemperatureData(generateMockTemperatureData());
    setBatteryData(generateMockBatteryData());
  }, []);

  return (
    <div className="satellite-charts">
      <h3 className="chart-title">Температура за последние 24 часа</h3>
      <ResponsiveContainer width="100%" height={300} aria-label="График температуры за последние 24 часа">
  <LineChart data={temperatureData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="time" />
    <YAxis domain={['auto', 'auto']} />
    <Tooltip />
    <Legend />
    <Line type="monotone" dataKey="mainSystem" stroke="#8884d8" />
    <Line type="monotone" dataKey="communication" stroke="#82ca9d" />
    <Line type="monotone" dataKey="powerUnit" stroke="#ff7300" />
  </LineChart>
</ResponsiveContainer>


<ResponsiveContainer width="100%" height={300} aria-label="График уровня заряда батареи за последние 24 часа">
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
  );
};

export default SatelliteCharts;