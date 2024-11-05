// src/hooks/useRandomizeSatelliteData.ts
import { useEffect } from 'react';
import { Satellite } from '../types/satellite';
import { randomizeSatelliteData, useUpdateSatelliteMutation } from '../services/satellitesApi';

const useRandomizeSatelliteDataHook = (satellites: Satellite[] | undefined) => {
  const [updateSatellite] = useUpdateSatelliteMutation();

  useEffect(() => {
    if (!satellites) return;

    const interval = setInterval(() => {
      randomizeSatelliteData(satellites, updateSatellite);
    }, 30000); // Обновление каждые 30 секунд

    return () => clearInterval(interval);
  }, [satellites, updateSatellite]);
};

export default useRandomizeSatelliteDataHook;