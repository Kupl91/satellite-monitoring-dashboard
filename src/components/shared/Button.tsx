import React from 'react';
import './Button.css';
import { ButtonProps } from '../../types/satellite';

const Button: React.FC<ButtonProps> = ({ label, ...props }) => (
  <button className="shared-button" {...props} aria-label={props['aria-label'] || label}>
    {label}
  </button>
);

export default Button;