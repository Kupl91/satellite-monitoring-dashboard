import React from 'react';
import './Loader.css';
import {MessageProps } from '../../types/satellite';


const Loader: React.FC<MessageProps> = ({ message }) => (
  <div className="loader" role="status" aria-live="polite">
    <div className="spinner" aria-hidden="true"></div>
    <span>{message}</span>
  </div>
);

export default Loader;