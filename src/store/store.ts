/* eslint-disable no-undef */
import { configureStore } from '@reduxjs/toolkit';
import numberReducer from './reducers/numberSlice';

const reducer = {
    numbers: numberReducer,
};

export const store = configureStore({
    reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
