// src/components/SatelliteUpdater/SatelliteUpdater.tsx
import React from 'react';
import { useUpdateSatelliteMutation } from '../../services/satellitesApi';
import { Satellite, SatelliteUpdaterProps } from '../../types/satellite';
import { toast } from 'react-toastify';


const SatelliteUpdater: React.FC<SatelliteUpdaterProps> = ({ satellite }) => {
  const [updateSatellite, { isLoading }] = useUpdateSatelliteMutation();

  const handleUpdate = async () => {
    try {
      await updateSatellite(satellite).unwrap();
      toast.success(`Спутник ${satellite.name} обновлён успешно!`);
    } catch (error) {
      console.error(`Ошибка обновления спутника ${satellite.id}:`, error);
      toast.error(`Ошибка обновления спутника ${satellite.name}`);
    }
  };

  return (
    <button onClick={handleUpdate} disabled={isLoading} className="shared-button" aria-label={`Обновить спутник ${satellite.name}`}>
      {isLoading ? 'Обновление...' : 'Обновить Спутник'}
    </button>
  );
};

export default SatelliteUpdater;