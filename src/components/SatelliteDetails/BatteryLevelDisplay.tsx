// src/components/SatelliteDetails/BatteryLevelDisplay.tsx
import React from 'react';
import './BatteryLevelDisplay.css';
import { BatteryLevelDisplayProps } from '../../types/satellite';

const BatteryLevelDisplay: React.FC<BatteryLevelDisplayProps> = ({ batteryLevel }) => (
  <div className="battery-level-display" aria-label="Уровень батареи">
    <strong>Уровень батареи:</strong> {batteryLevel}%
  </div>
);

export default BatteryLevelDisplay;