// src/slices/satellitesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Satellite } from '../types/satellite';

interface SatellitesState {
  satellites: Satellite[];
}

const initialState: SatellitesState = {
  satellites: [],
};

const satellitesSlice = createSlice({
  name: 'satellites',
  initialState,
  reducers: {
    setSatellites(state, action: PayloadAction<Satellite[]>) {
      state.satellites = action.payload;
    },
    updateSatellite(state, action: PayloadAction<Satellite>) {
      const index = state.satellites.findIndex(sat => sat.id === action.payload.id);
      if (index !== -1) {
        state.satellites[index] = action.payload;
      }
    },
  },
});

export const { setSatellites, updateSatellite } = satellitesSlice.actions;
export default satellitesSlice.reducer;