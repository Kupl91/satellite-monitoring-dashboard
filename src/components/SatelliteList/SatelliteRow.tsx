//src/components/SatelliteList/SatelliteRow.tsx
import React from 'react';
import { Satellite } from '../../types/satellite';
import './SatelliteRow.css';
import StatusIndicator from '../common/StatusIndicator';

interface SatelliteRowProps {
  satellite: Satellite;
  onClick: () => void;
  style: React.CSSProperties;
}

const SatelliteRow: React.FC<SatelliteRowProps> = ({ satellite, onClick, style }) => (
  <div
    className="satellite-row"
    style={style}
    onClick={onClick}
    role="button"
    tabIndex={0}
    onKeyPress={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        onClick();
      }
    }}
  >
    <div className="satellite-cell">{satellite.name}</div>
    <div className="satellite-cell">{satellite.type}</div>
    <div className="satellite-cell">
      <StatusIndicator status={satellite.status} />
    </div>
    <div className="satellite-cell">{satellite.orbitHeight} км</div>
  </div>
);

export default SatelliteRow;