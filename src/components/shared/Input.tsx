import React from 'react';
import './Input.css';
import { InputProps } from '../../types/satellite';


const Input: React.FC<InputProps> = (props) => (
  <input className="shared-input" {...props} aria-label={props['aria-label'] || 'Ввод'} />
);

export default Input;