import React from 'react';
import type { FilterType as FilterTypeEnum, FilterTypeProps } from '../../../types/satellite';
import './FilterType.css';

const FilterType: React.FC<FilterTypeProps> = ({ filterType, setFilterType }) => (
  <label className="filter-type">
    Фильтр по типу:
    <select
      value={filterType}
      onChange={(e) => setFilterType(e.target.value as FilterTypeEnum)}
    >
      <option value="all">Все</option>
      <option value="communication">Коммуникации</option>
      <option value="navigation">Навигация</option>
      <option value="scientific">Научные</option>
    </select>
  </label>
);

export default FilterType;
