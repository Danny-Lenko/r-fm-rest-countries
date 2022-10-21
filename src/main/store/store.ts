import { configureStore } from '@reduxjs/toolkit'
import countriesReducer from '../../modules/AllCountries/allCountriesSlice'

export const store = configureStore({
  reducer: {
    countries: countriesReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
