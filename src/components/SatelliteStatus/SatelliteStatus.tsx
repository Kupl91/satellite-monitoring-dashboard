import React from 'react';
import { useGetSatellitesStatusQuery } from '../../services/satellitesApi';
import './SatelliteStatus.css';
import { toast } from 'react-toastify';

const SatelliteStatus: React.FC = () => {
  const { data: status, error, isLoading, refetch } = useGetSatellitesStatusQuery();

  React.useEffect(() => {
    if (error) {
      toast.error('Не удалось загрузить статус спутников. Попробуйте позже.');
    }
  }, [error]);

  return (
    <div className="satellite-status">
      <h3>Статус Спутников</h3>
      {isLoading && <p>Загрузка...</p>}
      {error && (
        <div>
          <p>Ошибка при загрузке статуса спутников.</p>
          <button onClick={() => refetch()}>Повторить попытку</button>
        </div>
      )}
      {status && (
        <ul>
          <li>Активные: {status.active}</li>
          <li>Неактивные: {status.inactive}</li>
          <li>На обслуживании: {status.maintenance}</li>
        </ul>
      )}
    </div>
  );
};

export default SatelliteStatus;