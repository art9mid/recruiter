import { configureStore } from '@reduxjs/toolkit';
import appSlice from './slices/app';

const store = configureStore({
  reducer: appSlice.reducer,
});

store.subscribe(() => console.log(store.getState()));

export default store;
