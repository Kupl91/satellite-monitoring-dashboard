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
    active:number ;
    inactive:number ;
    maintenance:number ;
}

interface MessageProps {    
    message:string ;  
}
  
export type SortBy = 'name' | 'type' | 'status' | 'orbitHeight';
export type FilterType = 'all' | 'communication' | 'navigation' | 'scientific';
export type FilterStatus = 'all' | SatelliteStatus;


interface TemperatureData extends Temperature {
  time: string;
}

interface BatteryData {
  time: string;
  batteryLevel: number;
}

interface SatelliteChartsProps {
  satelliteId: string;
}

interface BatteryLevelDisplayProps {
  batteryLevel: number;
}

interface SatelliteDetailsProps {
  satellite: Satellite;
}

interface TemperatureDisplayProps {
  temperature?: Temperature;
}

interface FiltersAndSortControlsProps {
  sortBy: SortBy;
  setSortBy: (value: SortBy) => void;
  filterType: FilterType;
  setFilterType: (value: FilterType) => void;
  filterStatus: FilterStatus;
  setFilterStatus: (value: FilterStatus) => void;
}

interface SatelliteRowProps {
  satellite: Satellite;
  onClick: () => void;
  style: React.CSSProperties;
}

interface SatelliteUpdaterProps {
  satellite: Satellite;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[];
}