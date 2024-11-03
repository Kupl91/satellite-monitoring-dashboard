// src\components\SatelliteList\SatelliteList.tsx
import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { useGetSatellitesQuery, randomizeSatelliteData, useUpdateSatelliteMutation } from '../../services/satellitesApi';
import { FixedSizeList as List } from 'react-window';
import './SatelliteList.css';

const SatelliteList: React.FC = () => {
  const { data: satellites, refetch } = useGetSatellitesQuery();
  const [updateSatellite] = useUpdateSatelliteMutation();

  const [sortBy, setSortBy] = useState<'name' | 'type' | 'status' | 'orbitHeight'>('name');
  const [filterType, setFilterType] = useState<'all' | 'communication' | 'navigation' | 'scientific'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive' | 'maintenance'>('all');

  useEffect(() => {
    const interval = setInterval(() => {
      if (satellites) {
        randomizeSatelliteData(satellites, updateSatellite);
      }
    }, 30000); // 30 секунд

    return () => clearInterval(interval);
  }, [satellites, updateSatellite]);

  const filteredSatellites = useMemo(() => {
    return satellites?.filter((sat) => {
      const typeMatch = filterType === 'all' || sat.type === filterType;
      const statusMatch = filterStatus === 'all' || sat.status === filterStatus;
      return typeMatch && statusMatch;
    });
  }, [satellites, filterType, filterStatus]);

  const sortedSatellites = useMemo(() => {
    if (!filteredSatellites) return [];
    const mutableSatellites = [...filteredSatellites];
    return mutableSatellites.sort((a, b) => {
      if (sortBy === 'orbitHeight') {
        return a.orbitHeight - b.orbitHeight;
      }
      if (a[sortBy] < b[sortBy]) return -1;
      if (a[sortBy] > b[sortBy]) return 1;
      return 0;
    });
  }, [filteredSatellites, sortBy]);

  const Row = useCallback(
    ({ index, style }: { index: number; style: React.CSSProperties }) => {
      const sat = sortedSatellites[index];
      return (
        <div className="satellite-row" style={style}>
          <div>{sat.name}</div>
          <div>{sat.type}</div>
          <div>{sat.status}</div>
          <div>{sat.orbitHeight} км</div>
        </div>
      );
    },
    [sortedSatellites]
  );

  return (
    <div>
      <div className="controls">
        <label>
          Сортировать по:
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)}>
            <option value="name">Имя</option>
            <option value="type">Тип</option>
            <option value="status">Статус</option>
            <option value="orbitHeight">Высота орбиты</option>
          </select>
        </label>
        <label>
          Фильтр по типу:
          <select value={filterType} onChange={(e) => setFilterType(e.target.value as any)}>
            <option value="all">Все</option>
            <option value="communication">Коммуникации</option>
            <option value="navigation">Навигация</option>
            <option value="scientific">Научные</option>
          </select>
        </label>
        <label>
          Фильтр по статусу:
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as any)}>
            <option value="all">Все</option>
            <option value="active">Активные</option>
            <option value="inactive">Неактивные</option>
            <option value="maintenance">На обслуживании</option>
          </select>
        </label>
      </div>
      <List
        height={600}
        itemCount={sortedSatellites.length}
        itemSize={35}
        width={'100%'}
        className="satellite-list"
      >
        {Row}
      </List>
    </div>
  );
};

export default SatelliteList;
