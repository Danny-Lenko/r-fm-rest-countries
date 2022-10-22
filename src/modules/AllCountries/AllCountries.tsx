import { Container } from '@mui/material'
import Loader from '../../library/common/components/Loader/Loader';
import { IGlobalState } from '../../library/interfaces/interfaces';
import { AppDispatch } from '../../main/store/store';
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCountries } from './allCountriesSlice';
import Error from '../../library/common/components/Error/Error';
import CountryCard from './CountryCard';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Theme } from '@mui/system';

const Search = styled('div')(({ theme }) => ({
   boxShadow: "0px 3px 1px -2px rgba(0,0,0,0.01),0px 2px 2px 0px rgba(0,0,0,0.014),0px 1px 5px 0px rgba(0,0,0,0.12)",
   position: 'relative',
   borderRadius: theme.shape.borderRadius,
   backgroundColor: theme.palette.background.paper,
   '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
   },
   margin: '2rem 0',
   minWidth: '100%',
   [theme.breakpoints.up('md')]: {
      minWidth: 'fit-content',
   },

}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
   padding: theme.spacing(0, 2),
   height: '100%',
   position: 'absolute',
   pointerEvents: 'none',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
   color: 'inherit',
   '& .MuiInputBase-input': {
      padding: theme.spacing(1.5, 1, 1.5, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '60vw',
      [theme.breakpoints.up('md')]: {
         width: '30ch',
         '&:focus': {
            width: '40ch',
         },
      },
   },
}));

const selectStyles = {
   minWidth: 220,
   bgcolor: (theme:Theme) => theme.palette.background.paper,
   boxShadow: 25,
   borderRadius: 1,
   mb: {xs: 4, md: 0},
   mr: {xs: 'auto', md: 0},
   '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
   },
   '& .MuiOutlinedInput-input': {
      py: 1.5
   }
}

const AllCountries = () => {
   const dispatch = useDispatch<AppDispatch>()
   const countries = useSelector((state: IGlobalState) => state.countries.countries)
   const countriesStatus = useSelector((state: IGlobalState) => state.countries.status)
   const error = useSelector((state: IGlobalState) => state.countries.error)

   const [region, setRegion] = useState('');

   const handleSelectChange = (event: SelectChangeEvent) => {
      setRegion(event.target.value);
   };

   useEffect(() => {
      if (countriesStatus === 'idle') {
         dispatch(fetchCountries())
      }
   }, [countriesStatus, dispatch])

   console.log(countries)

   return (
      <Container maxWidth='xl'>
         {
            countriesStatus === 'loading' || countriesStatus === 'idle' ? <Loader />
               : countriesStatus === 'failed' ? <Error props={error} />

               : <Box sx={{ flexGrow: 1 }}>

                  <Box sx={{ mx: '10%', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>
                     <Search>
                        <SearchIconWrapper>
                           <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                           placeholder="Search for a country…"
                           inputProps={{ 'aria-label': 'search' }}
                        />
                     </Search>

                     <FormControl sx={selectStyles}>
                        <Select
                           value={region}
                           onChange={handleSelectChange}
                           displayEmpty
                           inputProps={{ 'aria-label': 'Without label' }}
                        >
                           <MenuItem value="">
                              <em>Filter by Region</em>
                           </MenuItem>
                           <MenuItem value={'Africa'}>Africa</MenuItem>
                           <MenuItem value={'America'}>America</MenuItem>
                           <MenuItem value={'Asia'}>Asia</MenuItem>
                           <MenuItem value={'Europe'}>Europe</MenuItem>
                           <MenuItem value={'Oceania'}>Oceania</MenuItem>
                        </Select>
                     </FormControl>
                  </Box>

                  <Grid container spacing={0} gap={5} sx={{ justifyContent: { xs: 'space-evenly', xl: 'space-between' } }}>
                     {
                        countries.map(country => <Grid key={country.name.common}>
                           <CountryCard {...country} />
                        </Grid>)
                     }
                  </Grid>
               </Box>
         }
      </Container>
   );
}

export default AllCountries;