import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Satellite, SatellitesStatus } from '../types/satellite';

export const satellitesApi = createApi({
  reducerPath: 'satellitesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  tagTypes: ['Satellites'],
  endpoints: (builder) => ({
    getSatellites: builder.query<Satellite[], void>({
      query: () => 'satellites',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Satellites' as const, id })),
              { type: 'Satellites', id: 'LIST' },
            ]
          : [{ type: 'Satellites', id: 'LIST' }],
    }),
    getSatelliteById: builder.query<Satellite, string>({
      query: (id) => `satellites/${id}`,
      providesTags: (result, error, id) => [{ type: 'Satellites', id }],
    }),
    getSatellitesStatus: builder.query<SatellitesStatus, void>({
      query: () => 'satellites/status',
    }),
    updateSatellite: builder.mutation<Satellite, Partial<Satellite> & Pick<Satellite, 'id'>>({
      query: (satellite) => ({
        url: `satellites/${satellite.id}`,
        method: 'PUT',
        body: satellite,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Satellites', id }],
    }),
  }),
});

export const {
  useGetSatellitesQuery,
  useGetSatelliteByIdQuery,
  useGetSatellitesStatusQuery,
  useUpdateSatelliteMutation,
} = satellitesApi;

export const randomizeSatelliteData = async (
  satellites: Satellite[],
  updateSatellite: (satellite: Partial<Satellite> & Pick<Satellite, 'id'>) => { unwrap: () => Promise<Satellite> }
) => {
  const randomizedData = satellites.map((sat) => {
    const newLongitude = sat.coordinates.longitude + (Math.random() - 0.5) * 2;
    const newLatitude = sat.coordinates.latitude + (Math.random() - 0.5) * 2;

    const newSpeed = sat.speed
      ? parseFloat((sat.speed + (Math.random() - 0.5) * 0.2).toFixed(3))
      : undefined;

    const newTemperature = sat.temperature
      ? {
          mainSystem: sat.temperature.mainSystem !== undefined
            ? parseFloat((sat.temperature.mainSystem + (Math.random() - 0.5) * 2).toFixed(2))
            : undefined,
          communication: sat.temperature.communication !== undefined
            ? parseFloat((sat.temperature.communication + (Math.random() - 0.5) * 2).toFixed(2))
            : undefined,
          powerUnit: sat.temperature.powerUnit !== undefined
            ? parseFloat((sat.temperature.powerUnit + (Math.random() - 0.5) * 2).toFixed(2))
            : undefined,
        }
      : undefined;

    return {
      ...sat,
      coordinates: {
        longitude: parseFloat(newLongitude.toFixed(6)),
        latitude: parseFloat(newLatitude.toFixed(6)),
      },
      speed: newSpeed,
      temperature: newTemperature,
      lastUpdate: new Date().toISOString(),
    };
  });

  await Promise.all(
    randomizedData.map(async (sat) => {
      try {
        await updateSatellite(sat).unwrap();
      } catch (error) {
        console.error(`Ошибка обновления спутника ${sat.id}:`, error);
      }
    })
  );
};