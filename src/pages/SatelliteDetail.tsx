import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetSatelliteByIdQuery } from '../services/satellitesApi';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

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

const SatelliteDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: satellite, error, isLoading } = useGetSatelliteByIdQuery(id!);
  const [temperatureData, setTemperatureData] = useState<TemperatureData[]>([]);
  const [batteryData, setBatteryData] = useState<BatteryData[]>([]);

  useEffect(() => {
    // Генерация случайных данных для графиков
    const generateData = () => {
      const tempData: TemperatureData[] = [];
      const battData: BatteryData[] = [];
      for (let i = 0; i < 24; i++) {
        const hour = `${i}:00`;
        tempData.push({
          time: hour,
          mainSystem: Math.floor(Math.random() * 100) - 50,
          communication: Math.floor(Math.random() * 100) - 50,
          powerUnit: Math.floor(Math.random() * 100) - 50,
        });
        battData.push({
          time: hour,
          batteryLevel: Math.floor(Math.random() * 101),
        });
      }
      setTemperatureData(tempData);
      setBatteryData(battData);
    };

    generateData();
  }, [id]);

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка при загрузке данных.</div>;
  if (!satellite) return <div>Спутник не найден.</div>;

  return (
    <div>
      <h1>Детальная информация о спутнике {satellite.name}</h1>
      <div>
        <p><strong>ID:</strong> {satellite.id}</p>
        <p><strong>Тип:</strong> {satellite.type}</p>
        <p><strong>Статус:</strong> {satellite.status}</p>
        <p><strong>Координаты:</strong> {satellite.coordinates.latitude}, {satellite.coordinates.longitude}</p>
        <p><strong>Высота орбиты:</strong> {satellite.orbitHeight} км</p>
        <p><strong>Скорость:</strong> {satellite.speed ? `${satellite.speed} км/с` : 'Данные отсутствуют'}</p>
        <p><strong>Температура:</strong> {satellite.temperature 
            ? `Main System: ${satellite.temperature.mainSystem}°C, Communication: ${satellite.temperature.communication}°C, Power Unit: ${satellite.temperature.powerUnit}°C`
            : 'Данные отсутствуют'
        }</p>
        <p><strong>Уровень батареи:</strong> {satellite.batteryLevel}%</p>
        <p><strong>Последнее обновление:</strong> {satellite.lastUpdate}</p>
      </div>

      <h2>Температура за последние 24 часа</h2>
      <LineChart width={600} height={300} data={temperatureData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="mainSystem" stroke="#8884d8" />
        <Line type="monotone" dataKey="communication" stroke="#82ca9d" />
        <Line type="monotone" dataKey="powerUnit" stroke="#ffc658" />
      </LineChart>

      <h2>Уровень батареи за последние 24 часа</h2>
      <LineChart width={600} height={300} data={batteryData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis domain={[0, 100]} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="batteryLevel" stroke="#ff7300" />
      </LineChart>
    </div>
  );
};

export default SatelliteDetail;