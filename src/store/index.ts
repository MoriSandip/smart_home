import { configureStore } from '@reduxjs/toolkit';
import smartHomeReducer from './smartHomeSlice';

export const store = configureStore({
    reducer: {
        smartHome: smartHomeReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'],
            },
        }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>; 