// src/components/common/StatusIndicator.tsx
import React from 'react';
import './StatusIndicator.css';

interface StatusIndicatorProps {
  status: 'active' | 'inactive' | 'maintenance';
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status }) => (
  <span
    className={`status-indicator ${status}`}
    aria-label={`Статус: ${status}`}
  >
    {status}
  </span>
);

export default StatusIndicator;