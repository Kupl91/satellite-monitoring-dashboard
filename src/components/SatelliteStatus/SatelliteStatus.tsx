// src/components/SatelliteStatus/SatelliteStatus.tsx
import React, { useEffect, useMemo } from 'react';
import { useGetSatellitesQuery } from '../../services/satellitesApi';
import './SatelliteStatus.css';
import { toast } from 'react-toastify';
import { Satellite } from '../../types/satellite';

const SatelliteStatus: React.FC = () => {
  const { data: satellites, error, isLoading, refetch } = useGetSatellitesQuery();

  useEffect(() => {
    if (error) {
      toast.error('Не удалось загрузить статус спутников. Попробуйте позже.');
      console.error(error);
    }
  }, [error]);

  const status = useMemo(() => {
    if (!satellites) return { active: 0, inactive: 0, maintenance: 0 };

    return satellites.reduce(
      (acc, sat: Satellite) => {
        switch (sat.status) {
          case 'active':
            acc.active += 1;
            break;
          case 'inactive':
            acc.inactive += 1;
            break;
          case 'maintenance':
            acc.maintenance += 1;
            break;
          default:
            break;
        }
        return acc;
      },
      { active: 0, inactive: 0, maintenance: 0 }
    );
  }, [satellites]);

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
      {satellites && (
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