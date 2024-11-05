// src/components/shared/Button.tsx
import React from 'react';
import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const Button: React.FC<ButtonProps> = ({ label, ...props }) => (
  <button className="shared-button" {...props} aria-label={props['aria-label'] || label}>
    {label}
  </button>
);

export default Button;