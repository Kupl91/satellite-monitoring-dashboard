import React from 'react';
import { SortBy } from '../../../types/satellite';
import { SortControlsProps } from '../../../types/satellite';
import './SortControls.css';

const SortControls: React.FC<SortControlsProps> = ({ sortBy, setSortBy }) => (
  <label className="sort-controls">
    Сортировать по:
    <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortBy)}>
      <option value="name">Имя</option>
      <option value="type">Тип</option>
      <option value="status">Статус</option>
      <option value="orbitHeight">Высота орбиты</option>
    </select>
  </label>
);

export default SortControls;