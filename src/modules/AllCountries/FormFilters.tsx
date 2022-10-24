import { AppDispatch } from '../../main/store/store';
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchCountries, filterByRegion } from './allCountriesSlice';
import Box from '@mui/material/Box'
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Search, SearchIconWrapper, StyledInputBase, selectStyles } from './FormFilterStyling';

const FormFilters = () => {
   const dispatch = useDispatch<AppDispatch>()
   const [name, setName] = useState('')
   const [region, setRegion] = useState('')

   let keyupTimer:any

   const handleSelectChange = (event: SelectChangeEvent) => {
      setRegion(event.target.value)
   }

   useEffect(() => {
      dispatch(fetchCountries(''))
   }, [dispatch])

   return (
      <Box sx={{ mx: '10%', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
         <Search>
            <SearchIconWrapper>
               <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
               placeholder="Search for a country…"
               inputProps={{ 'aria-label': 'search' }}
               value={name}
               onChange={(e) => {
                  clearInterval(keyupTimer)
                  setName(e.target.value)
                  keyupTimer = setTimeout(() => {dispatch(fetchCountries(e.target.value))}, 1000)
               }}
            />
         </Search>

         <FormControl sx={selectStyles}>
            <Select
               value={region}
               onChange={(e) => {
                  handleSelectChange(e)
                  dispatch(filterByRegion(e.target.value))
               }}
               displayEmpty
               inputProps={{ 'aria-label': 'Without label' }}
            >
               <MenuItem value="">
                  <em>Filter by Region</em>
               </MenuItem>
               <MenuItem value={'Africa'}>Africa</MenuItem>
               <MenuItem value={'Americas'}>Americas</MenuItem>
               <MenuItem value={'Asia'}>Asia</MenuItem>
               <MenuItem value={'Europe'}>Europe</MenuItem>
               <MenuItem value={'Oceania'}>Oceania</MenuItem>
            </Select>
         </FormControl>
      </Box>
   );
}
 
export default FormFilters;