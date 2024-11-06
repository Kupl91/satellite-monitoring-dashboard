export interface Coordinates {
  longitude: number;
  latitude: number;
}

export interface Temperature {
  mainSystem?: number;
  communication?: number;
  powerUnit?: number;
}

export type SatelliteStatus = 'active' | 'inactive' | 'maintenance';

export interface Satellite {
  id: string;
  name: string;
  type: 'communication' | 'navigation' | 'scientific';
  status: SatelliteStatus;
  coordinates: Coordinates;
  orbitHeight: number;
  speed?: number;
  temperature?: Temperature;
  batteryLevel: number;
  lastUpdate: string;
}

export interface SatellitesStatus {
  active: number;
  inactive: number;
  maintenance: number;
}

interface MessageProps {
  message: string;
}

export type SortBy = 'name' | 'type' | 'status' | 'orbitHeight';
export type FilterType = 'all' | 'communication' | 'navigation' | 'scientific';
export type FilterStatus = 'all' | 'active' | 'inactive' | 'maintenance';

interface TemperatureData extends Temperature {
  time: string;
}

interface BatteryData {
  time: string;
  batteryLevel: number;
}

export interface SatelliteChartsProps {
  satelliteId: string;
}

export interface BatteryLevelDisplayProps {
  batteryLevel: number;
}

export interface SatelliteDetailsProps {
  satellite: Satellite;
}

export interface TemperatureDisplayProps {
  temperature?: Temperature;
}


export interface SortControlsProps {
  sortBy: SortBy;
  setSortBy: (value: SortBy) => void;
}

export interface FilterTypeProps {
  filterType: FilterType;
  setFilterType: (value: FilterType) => void;
}

export interface FilterStatusProps {
  filterStatus: FilterStatus;
  setFilterStatus: (value: FilterStatus) => void;
}

export interface SatelliteRowProps {
  satellite: Satellite;
  onClick: () => void;
  style: React.CSSProperties;
}

export interface SatelliteUpdaterProps {
  satellite: Satellite;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
}

export interface SatelliteInfoListProps {
  satellite: Satellite;
}

export interface SatelliteInfoItemProps {
  label: string;
  value: string;
}