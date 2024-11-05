// src/components/shared/Select.tsx
import React from 'react';
import './Select.css';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
}

const Select: React.FC<SelectProps> = ({ options, ...props }) => (
  <select className="shared-select" {...props} aria-label={props['aria-label'] || 'Выбор'}>
    {options.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
);

export default Select;