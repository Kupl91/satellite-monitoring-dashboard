// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { satellitesApi } from '../services/satellitesApi';
import satellitesReducer from '../slices/satellitesSlice';

export const store = configureStore({
  reducer: {
    satellites: satellitesReducer,
    [satellitesApi.reducerPath]: satellitesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(satellitesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
