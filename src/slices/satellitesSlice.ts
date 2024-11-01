import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Satellite } from '../services/satellitesApi';

interface SatellitesState {
  selectedSatelliteId: string | null;
  // Добавьте другие поля состояния по необходимости
}

const initialState: SatellitesState = {
  selectedSatelliteId: null,
};

const satellitesSlice = createSlice({
  name: 'satellites',
  initialState,
  reducers: {
    selectSatellite(state, action: PayloadAction<string>) {
      state.selectedSatelliteId = action.payload;
    },
    deselectSatellite(state) {
      state.selectedSatelliteId = null;
    },
    // Добавьте другие редюсеры по необходимости
  },
});

export const { selectSatellite, deselectSatellite } = satellitesSlice.actions;

export default satellitesSlice.reducer;