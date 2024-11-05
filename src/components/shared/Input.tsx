// src/components/shared/Input.tsx
import React from 'react';
import './Input.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = (props) => (
  <input className="shared-input" {...props} aria-label={props['aria-label'] || 'Ввод'} />
);

export default Input;