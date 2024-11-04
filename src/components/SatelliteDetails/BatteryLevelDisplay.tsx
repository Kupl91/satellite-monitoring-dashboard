//src/components/SatelliteDetails/BatteryLevelDisplay.tsx
import React from 'react';
import './BatteryLevelDisplay.css';

interface BatteryLevelDisplayProps {
  batteryLevel: number;
}

const BatteryLevelDisplay: React.FC<BatteryLevelDisplayProps> = ({ batteryLevel }) => (
  <div className="battery-level-display">
    <strong>Уровень батареи:</strong> {batteryLevel}%
  </div>
);

export default BatteryLevelDisplay;