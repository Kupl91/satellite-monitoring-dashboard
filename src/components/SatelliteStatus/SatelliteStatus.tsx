import React from 'react';
import { useGetSatellitesStatusQuery } from '../../services/satellitesApi';
import Loader from '../common/Loader';
import ErrorMessage from '../common/ErrorMessage';
import './SatelliteStatus.css';

const SatelliteStatus: React.FC = () => {
  const { data, error, isLoading } = useGetSatellitesStatusQuery();

  if (isLoading) return <Loader message="Загрузка статуса спутников..." />;
  if (error) return <ErrorMessage message="Ошибка при загрузке статуса спутников." />;

  return (
    <div className="satellite-status">
      <h3>Статус Спутников</h3>
      <ul>
        <li>Активные: {data?.active}</li>
        <li>Неактивные: {data?.inactive}</li>
        <li>На обслуживании: {data?.maintenance}</li>
      </ul>
    </div>
  );
};

export default SatelliteStatus;