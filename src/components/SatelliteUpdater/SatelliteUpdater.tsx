import React from 'react';
import { useUpdateSatelliteMutation } from '../../services/satellitesApi';
import { Satellite } from '../../types/satellite';
import { toast } from 'react-toastify';

interface SatelliteUpdaterProps {
  satellite: Satellite;
}

const SatelliteUpdater: React.FC<SatelliteUpdaterProps> = ({ satellite }) => {
  const [updateSatellite] = useUpdateSatelliteMutation();

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
    <button onClick={handleUpdate}>
      Обновить Спутник
    </button>
  );
};

export default SatelliteUpdater;
