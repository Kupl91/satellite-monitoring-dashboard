//src\components\SatelliteList\Filters\SortControls.tsx
import React from 'react';
import './SortControls.css';

interface SortControlsProps {
  sortBy: string;
  setSortBy: (value: string) => void;
}

const SortControls: React.FC<SortControlsProps> = ({ sortBy, setSortBy }) => (
  <label className="sort-controls">
    Сортировать по:
    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
      <option value="name">Имя</option>
      <option value="type">Тип</option>
      <option value="status">Статус</option>
      <option value="orbitHeight">Высота орбиты</option>
    </select>
  </label>
);

export default SortControls;