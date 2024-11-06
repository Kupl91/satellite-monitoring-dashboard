import React, { useCallback } from 'react';
import SatelliteStatus from '../../components/SatelliteStatus/SatelliteStatus';
import SatelliteMap from '../../components/SatelliteMap/SatelliteMap';
import SatelliteList from '../../components/SatelliteList/SatelliteList';
import { useGetSatellitesQuery, useUpdateSatelliteMutation, randomizeSatelliteData } from '../../services/satellitesApi';
import './SatelliteListPage.css';

const SatelliteListPage: React.FC = () => {
  const { data: satellites } = useGetSatellitesQuery();
  const [updateSatellite] = useUpdateSatelliteMutation();

  const handleRandomize = useCallback(() => {
    if (satellites) {
      randomizeSatelliteData(satellites, updateSatellite);
    }
  }, [satellites, updateSatellite]);

  return (
    <div className="satellite-list-page" role="main">
      <SatelliteStatus />
      <button
        onClick={handleRandomize}
        className="randomize-button"
        aria-label="Случайно изменить координаты спутников"
      >
        Случайно изменить координаты спутников
      </button>
      <SatelliteMap />
      <SatelliteList />
    </div>
  );
};

export default React.memo(SatelliteListPage);