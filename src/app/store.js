import { configureStore } from '@reduxjs/toolkit';
import calcReducer from '../features/calculator/calcReducer'


export const store = configureStore({
  reducer: {
    calc: calcReducer,
  },
});
