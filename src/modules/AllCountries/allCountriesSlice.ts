import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { IAllCountries } from '../../library/interfaces/interfaces'

const initialState: IAllCountries = {
  countries: [],
  status: 'idle',
  error: null
}

export const fetchCountries = createAsyncThunk('countries/fetchCountries', async (name:string) => {
   const endPoint = name ? `name/${name}` : 'all'
   const res = await fetch(`https://restcountries.com/v3.1/${endPoint}`)
   const data = await res.json()
   return data
})

// export const fetchCountries = createAsyncThunk('countries/fetchCountries', async () => {
//    const res = await fetch(`https://restcountries.com/v3.1/all`)
//    const data = await res.json()
//    return data
// })

const allCountriesSlice = createSlice({
   name: 'countries',
   initialState,
   reducers: {
      // omit existing reducers here
   },
   extraReducers(builder) {
      builder
         .addCase(fetchCountries.pending, (state, action) => {
            state.status = 'loading'
         })
         .addCase(fetchCountries.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.countries = action.payload
         })
         .addCase(fetchCountries.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
         })
   }
})

// export const { } = allCountriesSlice.actions

export default allCountriesSlice.reducer