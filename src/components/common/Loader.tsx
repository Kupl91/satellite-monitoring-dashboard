//src\components\common\Loader.tsx
import React from 'react';
import './Loader.css';

interface LoaderProps {
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({ message = 'Загрузка...' }) => (
  <div className="loader">
    <div className="spinner" />
    <span>{message}</span>
  </div>
);

export default Loader;