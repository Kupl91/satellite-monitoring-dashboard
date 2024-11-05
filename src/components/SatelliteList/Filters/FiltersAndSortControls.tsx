// НАЧНИ ГОТОВИТЬ РАЗБИВКУ НА 3 ЧАСТИ
import React from 'react';
import { SortBy, FilterType, FilterStatus, FiltersAndSortControlsProps } from '../../../types/satellite';
import './FiltersAndSortControls.css';

const FiltersAndSortControls: React.FC<FiltersAndSortControlsProps> = ({
  sortBy,
  setSortBy,
  filterType,
  setFilterType,
  filterStatus,
  setFilterStatus,
}) => {
  return (
    <div className="filters-and-sort-controls" role="region" aria-label="Фильтры и сортировка спутников">
      <label htmlFor="sort-by-select">
        Сортировать по:
        <select
          id="sort-by-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortBy)}
        >
          <option value="name">Имя</option>
          <option value="type">Тип</option>
          <option value="status">Статус</option>
          <option value="orbitHeight">Высота орбиты</option>
        </select>
      </label>
      <label htmlFor="filter-type-select">
        Фильтр по типу:
        <select
          id="filter-type-select"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as FilterType)}
        >
          <option value="all">Все</option>
          <option value="communication">Коммуникации</option>
          <option value="navigation">Навигация</option>
          <option value="scientific">Научные</option>
        </select>
      </label>
      <label htmlFor="filter-status-select">
        Фильтр по статусу:
        <select
          id="filter-status-select"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
        >
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