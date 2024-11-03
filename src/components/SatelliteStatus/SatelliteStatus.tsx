import React from 'react';
import { useGetSatellitesStatusQuery } from '../../services/satellitesApi';
import './SatelliteStatus.css';

const SatelliteStatus: React.FC = () => {
  const { data: status } = useGetSatellitesStatusQuery();

  return (
    <div className="satellite-status">
      <h3>Статус Спутников</h3>
      {status ? (
        <ul>
          <li>Активные: {status.active}</li>
          <li>Неактивные: {status.inactive}</li>
          <li>На обслуживании: {status.maintenance}</li>
        </ul>
      ) : (
        <p>Загрузка...</p>
      )}
    </div>
  );
};

export default SatelliteStatus;