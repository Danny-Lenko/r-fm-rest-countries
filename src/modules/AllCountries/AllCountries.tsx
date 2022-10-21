import { Container } from '@mui/material'
import Loader from '../../library/common/components/Loader/Loader';
import { IGlobalState } from '../../library/interfaces/interfaces';
import { AppDispatch } from '../../main/store/store';
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCountries } from './allCountriesSlice';
import Error from '../../library/common/components/Error/Error';
import CountryCard from './CountryCard';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';


import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled('div')(({ theme }) => ({
   boxShadow: "0px 3px 1px -2px rgba(0,0,0,0.01),0px 2px 2px 0px rgba(0,0,0,0.014),0px 1px 5px 0px rgba(0,0,0,0.12)",
   position: 'relative',
   borderRadius: theme.shape.borderRadius,
   backgroundColor: theme.palette.background.paper,
   '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
   },
   margin: '2rem 10% 2rem',
   width: 'auto',
   [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(7),
      width: 'fit-content',
   },
   [theme.breakpoints.up('md')]: {
      marginLeft: 0,
   }
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
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100vw',
      [theme.breakpoints.up('sm')]: {
         width: '30ch',
         '&:focus': {
            width: '40ch',
         },
      },
   },
}));


const AllCountries = () => {
   const dispatch = useDispatch<AppDispatch>()
   const countries = useSelector((state: IGlobalState) => state.countries.countries)
   const countriesStatus = useSelector((state: IGlobalState) => state.countries.status)
   const error = useSelector((state: IGlobalState) => state.countries.error)

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

                  <Search>
                     <SearchIconWrapper>
                        <SearchIcon />
                     </SearchIconWrapper>
                     <StyledInputBase
                        placeholder="Search for a country…"
                        inputProps={{ 'aria-label': 'search' }}
                     />
                  </Search>

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