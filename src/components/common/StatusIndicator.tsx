import React from 'react';
import './StatusIndicator.css';  
import { SatelliteStatus } from '../../types/satellite';  

interface StatusIndicatorProps {  
   status: SatelliteStatus;
}  

const StatusIndicator: React.FC<StatusIndicatorProps> = React.memo(({ status }) => (   
   <span className={`status-indicator ${status}`} aria-label={`Статус : ${status}`}>     
        {status}   
   </span> 
));  

export default StatusIndicator;