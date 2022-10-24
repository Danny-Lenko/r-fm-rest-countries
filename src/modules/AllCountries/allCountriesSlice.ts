import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { IAllCountries } from '../../library/interfaces/interfaces'

const initialState: IAllCountries = {
  countries: [],
  status: 'idle',
  error: null,
  region: null
}

export const fetchCountries = createAsyncThunk('countries/fetchCountries', async (name:string) => {
   const endPoint = name ? `name/${name}` : 'all'
   return fetch(`https://restcountries.com/v3.1/${endPoint}`).then(res => res.json())   
})


const allCountriesSlice = createSlice({
   name: 'countries',
   initialState,
   reducers: {
      filterByRegion: (state, action) => {
         state.region = action.payload
      }
   },
   extraReducers(builder) {
      builder
         .addCase(fetchCountries.pending, (state, action) => {
            state.status = 'loading'
         })
         .addCase(fetchCountries.fulfilled, (state, action) => {
            console.log(action.payload)
            state.countries = action.payload
            state.status = 'succeeded'
         })
         .addCase(fetchCountries.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
         })
   }
})

export const { filterByRegion } = allCountriesSlice.actions

export default allCountriesSlice.reducer