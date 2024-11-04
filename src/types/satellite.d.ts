//src\types\satellite.d.ts
export interface Coordinates {
    longitude: number;
    latitude: number;
  }
  
  export interface Temperature {
    mainSystem?: number;
    communication?: number;
    powerUnit?: number;
  }
  
  export interface Satellite {
    id: string;
    name: string;
    type: 'communication' | 'navigation' | 'scientific';
    status: 'active' | 'inactive' | 'maintenance';
    coordinates: Coordinates;
    orbitHeight: number; // в км
    speed?: number; // км/с, может быть отсутствующим
    temperature?: Temperature; // может быть отсутствующей
    batteryLevel: number; // %
    lastUpdate: string; // два формата даты
  }
  
  export interface SatellitesStatus {
    active: number;
    inactive: number;
    maintenance: number;
  }