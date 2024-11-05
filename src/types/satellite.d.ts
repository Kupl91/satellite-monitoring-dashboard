// src/types/satellite.d.ts
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
  type: 'communication' | 'navigation' |'scientific';
  status: 'active' | 'inactive' | 'maintenance';
  coordinates: Coordinates;
  orbitHeight: number; // в км
  speed?: number; // км/с, может быть отсутствующим
  temperature?: Temperature; // может быть отсутствующей
  batteryLevel: number; // %
  lastUpdate: string; // ISO 8601 формат
}

export interface SatellitesStatus {
  active: number;
  inactive: number;
  maintenance: number;
}

export type SortBy = 'name' | 'type' | 'status' | 'orbitHeight';
export type FilterType = 'all' | 'communication' | 'navigation' | 'scientific';
export type FilterStatus = 'all' | 'active' | 'inactive' | 'maintenance';
