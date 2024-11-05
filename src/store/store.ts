// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { satellitesApi } from '../services/satellitesApi';

export const store = configureStore({
  reducer: {
    [satellitesApi.reducerPath]: satellitesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(satellitesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;