import React from 'react';
<<<<<<< Updated upstream:src/pages/SatelliteList.tsx
import { useGetSatellitesQuery } from '../services/satellitesApi';
import { FixedSizeList as List } from 'react-window';
import { useDispatch } from 'react-redux';
import { selectSatellite } from '../slices/satellitesSlice';
import { useNavigate } from 'react-router-dom';
import MapView from '../components/MapView';

const SatelliteList: React.FC = () => {
  const { data: satellites, error, isLoading } = useGetSatellitesQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка при загрузке данных.</div>;

  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const satellite = satellites![index];
    return (
      <div
        style={style}
        onClick={() => {
          dispatch(selectSatellite(satellite.id));
          navigate(`/satellite/${satellite.id}`);
        }}
        className="satellite-row"
      >
        <div>{satellite.name}</div>
        <div>{satellite.type}</div>
        <div>{satellite.status}</div>
        <div>{satellite.orbitHeight} км</div>
      </div>
    );
  };
=======
import SatelliteList from '../../components/SatelliteList/SatelliteList';
import SatelliteStatus from '../../components/SatelliteStatus/SatelliteStatus';
import SatelliteMap from '../../components/SatelliteMap/SatelliteMap';
import './SatelliteList.css';
>>>>>>> Stashed changes:src/pages/SatelliteList/SatelliteList.tsx

  return (
    <div>
      <h1>Список спутников</h1>
      <div style={{ display: 'flex' }}>
        <div style={{ width: '40%', height: '600px', overflow: 'auto' }}>
          <List
            height={600}
            itemCount={satellites!.length}
            itemSize={50}
            width={'100%'}
          >
            {Row}
          </List>
        </div>
        <div style={{ width: '60%' }}>
          <MapView />
        </div>
      </div>
    </div>
  );
};

export default SatelliteList;