// src/components/SatelliteList/SatelliteList.tsx
import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { useGetSatellitesQuery, randomizeSatelliteData, useUpdateSatelliteMutation } from '../../services/satellitesApi';
import { List, AutoSizer, ListRowProps } from 'react-virtualized';
import './SatelliteList.css';
import { useNavigate } from 'react-router-dom';
import FiltersAndSortControls from './Filters/FiltersAndSortControls';
import { SortBy, FilterType, FilterStatus } from '../../types/satellite';

const SatelliteList: React.FC = React.memo(() => {
  const { data: satellites, error, isLoading } = useGetSatellitesQuery();
  const [updateSatellite] = useUpdateSatelliteMutation();
  const navigate = useNavigate();

  const [sortBy, setSortBy] = useState<SortBy>('name');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');

  useEffect(() => {
    const interval = setInterval(() => {
      if (satellites) {
        randomizeSatelliteData(satellites, updateSatellite);
      }
    }, 30000); // Обновление каждые 30 секунд

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
    return [...filteredSatellites].sort((a, b) => {
      if (sortBy === 'orbitHeight') {
        return a.orbitHeight - b.orbitHeight;
      }
      if (a[sortBy] < b[sortBy]) return -1;
      if (a[sortBy] > b[sortBy]) return 1;
      return 0;
    });
  }, [filteredSatellites, sortBy]);

  const handleRowClick = useCallback((id: string) => {
    navigate(`/satellite/${id}`);
  }, [navigate]);

  const rowRenderer = useCallback(({ index, key, style }: ListRowProps) => {
    const sat = sortedSatellites[index];
    return (
      <div
        key={key}
        style={style}
        className="satellite-row"
        onClick={() => handleRowClick(sat.id)}
        role="button"
        tabIndex={0}
        onKeyPress={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleRowClick(sat.id);
          }
        }}
      >
        <div className="satellite-cell">{sat.name}</div>
        <div className="satellite-cell">{sat.type}</div>
        <div className="satellite-cell">
          <span className={`status-indicator ${sat.status}`}>
            {sat.status.charAt(0).toUpperCase() + sat.status.slice(1)}
          </span>
        </div>
        <div className="satellite-cell">{sat.orbitHeight} км</div>
      </div>
    );
  }, [sortedSatellites, handleRowClick]);

  if (isLoading) return <div>Загрузка списка спутников...</div>;
  if (error) return <div>Ошибка при загрузке списка спутников.</div>;

  return (
    <div>
      <FiltersAndSortControls
        sortBy={sortBy}
        setSortBy={setSortBy}
        filterType={filterType}
        setFilterType={setFilterType}
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
      />
      <AutoSizer>
        {({ height, width }) => (
          <List
            width={width}
            height={height}
            rowCount={sortedSatellites.length}
            rowHeight={50}
            rowRenderer={rowRenderer}
          />
        )}
      </AutoSizer>
    </div>
  );
});

export default SatelliteList;