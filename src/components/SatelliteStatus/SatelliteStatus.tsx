// src/components/SatelliteStatus/SatelliteStatus.tsx
import React, { useEffect, useMemo } from 'react';
import { useGetSatellitesQuery } from '../../services/satellitesApi';
import Loader from '../common/Loader';
import ErrorMessage from '../common/ErrorMessage';
import './SatelliteStatus.css';
import { toast } from 'react-toastify';
import { SatellitesStatus } from '../../types/satellite';

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

    return satellites.reduce<SatellitesStatus>(
      (acc, sat) => {
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

  if (isLoading) return <Loader message="Загрузка статуса спутников..." />;
  if (error) return <ErrorMessage message="Ошибка при загрузке статуса спутников." />;

  return (
    <div className="satellite-status" aria-live="polite">
      <h3>Статус Спутников</h3>
      <ul>
        <li>Активные: {status.active}</li>
        <li>Неактивные: {status.inactive}</li>
        <li>На обслуживании: {status.maintenance}</li>
      </ul>
      <button onClick={() => refetch()} aria-label="Повторить попытку загрузки статуса спутников">
        Повторить попытку
      </button>
    </div>
  );
};

export default SatelliteStatus;