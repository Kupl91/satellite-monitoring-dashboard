// src/pages/SatelliteDetail/SatelliteDetail.tsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useGetSatelliteByIdQuery } from '../../services/satellitesApi';
import SatelliteDetails from '../../components/SatelliteDetails/SatelliteDetails';
import SatelliteUpdater from '../../components/SatelliteUpdater/SatelliteUpdater';
import './SatelliteDetail.css';

const SatelliteDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: satellite, isLoading, error } = useGetSatelliteByIdQuery(id!);

  if (isLoading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка загрузки данных.</p>;
  if (!satellite) return <p>Спутник не найден.</p>;

  return (
    <div className="satellite-detail-page">
      <SatelliteDetails satellite={satellite} />
      <SatelliteUpdater satellite={satellite} />
    </div>
  );
};

export default SatelliteDetail;