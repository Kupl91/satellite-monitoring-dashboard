import React from 'react';
import type { FilterStatus as FilterStatusType, FilterStatusProps } from '../../../types/satellite';
import './FilterStatus.css';

const FilterStatus: React.FC<FilterStatusProps> = ({ filterStatus, setFilterStatus }) => (
  <label className="filter-status">
    Фильтр по статусу:
    <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as FilterStatusType)}>
      <option value="all">Все</option>
      <option value="active">Активные</option>
      <option value="inactive">Неактивные</option>
      <option value="maintenance">В ремонте</option>
    </select>
  </label>
);

export default FilterStatus;