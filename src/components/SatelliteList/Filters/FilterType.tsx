//src\components\SatelliteList\Filters\FilterType.tsx
import React from 'react';
import './FiltersAndSortControls.css';

interface FilterTypeProps {
  filterType: string;
  setFilterType: (value: string) => void;
}

const FilterType: React.FC<FilterTypeProps> = ({ filterType, setFilterType }) => (
  <label className="filter-type">
    Фильтр по типу:
    <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
      <option value="all">Все</option>
      <option value="communication">Коммуникации</option>
      <option value="navigation">Навигация</option>
      <option value="scientific">Научные</option>
    </select>
  </label>
);

export default FilterType;