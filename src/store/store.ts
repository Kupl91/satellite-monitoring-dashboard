import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
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

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;