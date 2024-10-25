import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import movieReducer from './auth/movieSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    movie: movieReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
