//src\components\SatelliteList\Filters\FilterStatus.tsx
import React from 'react';
import './FilterStatus.css';
import './FiltersAndSortControls.css';

interface FilterStatusProps {
  filterStatus: string;
  setFilterStatus: (value: string) => void;
}

const FilterStatus: React.FC<FilterStatusProps> = ({ filterStatus, setFilterStatus }) => (
  <label className="filter-status">
    Фильтр по статусу:
    <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
      <option value="all">Все</option>
      <option value="active">Активны</option>
      <option value="inactive">Неактивны</option>
      <option value="maintenance">На обслуживании</option>
    </select>
  </label>
);

export default FilterStatus;