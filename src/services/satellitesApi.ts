// src\services\satellitesApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Satellite {
  id: string;
  name: string;
  type: 'communication' | 'navigation' | 'scientific';
  status: 'active' | 'inactive' | 'maintenance';
  coordinates: {
    longitude: number;
    latitude: number;
  };
  orbitHeight: number;
  speed?: number; // Может быть отсутствующим
  temperature?: {
    mainSystem: number;
    communication: number;
    powerUnit: number;
  };
  batteryLevel: number;
  lastUpdate: string;
}

export interface SatellitesStatus {
  active: number;
  inactive: number;
  maintenance: number;
}

export const satellitesApi = createApi({
  reducerPath: 'satellitesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000' }), // Замените на ваш базовый URL
  endpoints: (builder) => ({
    getSatellites: builder.query<Satellite[], void>({
      query: () => '/satellites',
    }),
    getSatelliteById: builder.query<Satellite, string>({
      query: (id) => `/satellites/${id}`,
    }),
    getSatellitesStatus: builder.query<SatellitesStatus, void>({
      query: () => '/satellites/status',
    }),
  }),
});

export const {
  useGetSatellitesQuery,
  useGetSatelliteByIdQuery,
  useGetSatellitesStatusQuery,
} = satellitesApi;