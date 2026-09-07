import { configureStore } from '@reduxjs/toolkit';
import jobsReducer from './jobs/jobsSlice';
import { jobsApi } from './jobs/jobsApi';

export const store = configureStore({
    reducer: {
        jobs: jobsReducer,
        [jobsApi.reducerPath]: jobsApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(jobsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;