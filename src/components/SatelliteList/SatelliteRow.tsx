import React from 'react';
import { Satellite, SatelliteRowProps } from '../../types/satellite';
import './SatelliteRow.css';
import StatusIndicator from '../common/StatusIndicator';



const SatelliteRow: React.FC<SatelliteRowProps> = ({ satellite, onClick, style }) => (
  <div
    className="satellite-row"
    style={style}
    onClick={onClick}
    role="button"
    tabIndex={0}
    aria-pressed="false"
    onKeyPress={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        onClick();
      }
    }}
    aria-label={`Спутник ${satellite.name}, тип ${satellite.type}, статус ${satellite.status}`}
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