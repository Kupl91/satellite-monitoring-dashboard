//src/components/SatelliteDetails/SatelliteInfo/SatelliteInfoItem.tsx
import React from 'react';
import './SatelliteInfoItem.css';

interface SatelliteInfoItemProps {
  label: string;
  value: string;
}

const SatelliteInfoItem: React.FC<SatelliteInfoItemProps> = ({ label, value }) => (
  <div className="satellite-info-item">
    <strong>{label}:</strong> {value}
  </div>
);

export default SatelliteInfoItem;