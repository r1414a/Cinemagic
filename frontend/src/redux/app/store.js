import { configureStore } from '@reduxjs/toolkit'
import movieReducer from "../features/movieSlice/movie"
import userReducer from "../features/userSlice/user";

export const store = configureStore({
  reducer: {
    movie: movieReducer,
    user: userReducer
  },
})