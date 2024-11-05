// src/components/common/StatusIndicator.tsx
import React from 'react';
import './StatusIndicator.css';  
import { SatelliteStatus } from '../../types/satellite';  

interface StatusIndicatorProps {  
   status :SatelliteStatus ;   // Используем общий тип для статуса.
}  

const StatusIndicator :React.FC< StatusIndicatorProps > = ({ status }) => (   
   <span className={`status-indicator ${status}`} aria-label={`Статус : ${status}`}>     
        {status}   
   </span> 
);  

export default StatusIndicator;