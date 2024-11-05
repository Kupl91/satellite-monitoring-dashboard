// src/components/common/Loader.tsx
import React from 'react';
import './Loader.css';

interface LoaderProps {
  message: string;
}

const Loader: React.FC<LoaderProps> = ({ message }) => (
  <div className="loader" role="status" aria-live="polite">
    <div className="spinner" aria-hidden="true"></div>
    <span>{message}</span>
  </div>
);

export default Loader;