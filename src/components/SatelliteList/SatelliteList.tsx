// src/components/SatelliteList/SatelliteList.tsx
import React, { useState } from 'react';
import { useGetSatellitesQuery } from '../../services/satellitesApi';
import SatelliteRow from './SatelliteRow';
import Loader from '../common/Loader';
import ErrorMessage from '../common/ErrorMessage';
import FiltersAndSortControls from './Filters/FiltersAndSortControls';
import useRandomizeSatelliteDataHook from '../../hooks/useRandomizeSatelliteData';
import { SortBy, FilterType, FilterStatus } from '../../types/satellite';
import './SatelliteList.css';

const SatelliteList: React.FC = () => {
  const { data: satellites, error, isLoading } = useGetSatellitesQuery();
  useRandomizeSatelliteDataHook(satellites);

  const [sortBy, setSortBy] = useState<SortBy>('name');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');

  if (isLoading) return <Loader message="Загрузка списка спутников..." />;
  if (error) return <ErrorMessage message="Ошибка при загрузке спутников." />;
  if (!satellites) return <p>Спутники не найдены.</p>;

  // Фильтрация спутников
  const filteredSatellites = satellites.filter((sat) => {
    const typeMatch = filterType === 'all' || sat.type === filterType;
    const statusMatch = filterStatus === 'all' || sat.status === filterStatus;
    return typeMatch && statusMatch;
  });

  // Сортировка спутников
  const sortedSatellites = [...filteredSatellites].sort((a, b) => {
    if (sortBy === 'orbitHeight') {
      return a.orbitHeight - b.orbitHeight;
    }
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return aValue.localeCompare(bValue);
    }
    return 0;
  });

  return (
    <div className="satellite-list">
      <FiltersAndSortControls
        sortBy={sortBy}
        setSortBy={setSortBy}
        filterType={filterType}
        setFilterType={setFilterType}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />
      <div className="table-header">
        <div className="header-cell">Имя</div>
        <div className="header-cell">Тип</div>
        <div className="header-cell">Статус</div>
        <div className="header-cell">Высота орбиты (км)</div>
      </div>
      {sortedSatellites.map((satellite) => (
        <SatelliteRow
          key={satellite.id}
          satellite={satellite}
          onClick={() => {
            // Логика при клике на строку спутника
          }}
          style={{}}
        />
      ))}
    </div>
  );
};

export default SatelliteList;