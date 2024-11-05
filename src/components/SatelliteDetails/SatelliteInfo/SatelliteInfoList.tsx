//src/components/SatelliteDetails/SatelliteInfo/SatelliteInfoList.tsx
import React from 'react';
import { Satellite, SatelliteInfoListProps } from '../../../types/satellite';
import SatelliteInfoItem from './SatelliteInfoItem';
import './SatelliteInfoList.css';
import { formatDate } from '../../../utils/formatDate';

const SatelliteInfoList: React.FC<SatelliteInfoListProps> = ({ satellite }) => {
  const info = [
    { label: 'Тип', value: satellite.type },
    { label: 'Статус', value: satellite.status },
    { label: 'Высота орбиты', value: `${satellite.orbitHeight} км` },
    { label: 'Скорость', value: satellite.speed ? `${satellite.speed} км/с` : 'N/A' },
    { label: 'Последнее обновление', value: formatDate(satellite.lastUpdate) },
  ];

  return (
    <div className="satellite-info-list" aria-label="Информация о спутнике">
      {info.map((item) => (
        <SatelliteInfoItem key={item.label} label={item.label} value={item.value} />
      ))}
    </div>
  );
};

export default SatelliteInfoList;