// src/components/SatelliteList/FiltersAndSortControls.tsx
import React from 'react';
import { SortBy, FilterType, FilterStatus } from '../../../types/satellite';

interface FiltersAndSortControlsProps {
  sortBy: SortBy;
  setSortBy: React.Dispatch<React.SetStateAction<SortBy>>;
  filterType: FilterType;
  setFilterType: React.Dispatch<React.SetStateAction<FilterType>>;
  filterStatus: FilterStatus;
  setFilterStatus: React.Dispatch<React.SetStateAction<FilterStatus>>;
}

const FiltersAndSortControls: React.FC<FiltersAndSortControlsProps> = ({
  sortBy,
  setSortBy,
  filterType,
  setFilterType,
  filterStatus,
  setFilterStatus,
}) => {
  return (
    <div className="filters-and-sort-controls">
      <label>
        Сортировать по:
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortBy)}>
          <option value="name">Имя</option>
          <option value="type">Тип</option>
          <option value="status">Статус</option>
          <option value="orbitHeight">Высота орбиты</option>
        </select>
      </label>
      <label>
        Фильтр по типу:
        <select value={filterType} onChange={(e) => setFilterType(e.target.value as FilterType)}>
          <option value="all">Все</option>
          <option value="communication">Коммуникации</option>
          <option value="navigation">Навигация</option>
          <option value="scientific">Научные</option>
        </select>
      </label>
      <label>
        Фильтр по статусу:
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}>
          <option value="all">Все</option>
          <option value="active">Активные</option>
          <option value="inactive">Неактивные</option>
          <option value="maintenance">В ремонте</option>
        </select>
      </label>
    </div>
  );
};

export default FiltersAndSortControls;