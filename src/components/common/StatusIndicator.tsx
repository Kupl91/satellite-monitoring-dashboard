//src/components/common/StatusIndicator.tsx
import React from 'react';
import './StatusIndicator.css';

interface StatusIndicatorProps {
  status: 'active' | 'inactive' | 'maintenance';
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status }) => {
  const statusClass = `status-indicator ${status}`;
  
  return (
    <span className={statusClass}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusIndicator;