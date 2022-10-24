import { Container } from '@mui/material'
import Loader from '../../library/common/components/Loader/Loader'
import { IGlobalState } from '../../library/interfaces/interfaces'
import { useSelector } from 'react-redux'
import Error from '../../library/common/components/Error/Error'
import CountryCard from './CountryCard'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import FormFilters from './FormFilters'

const AllCountries = () => {
   const countries = useSelector((state: IGlobalState) => state.countries.countries)
   const countriesStatus = useSelector((state: IGlobalState) => state.countries.status)
   const error = useSelector((state: IGlobalState) => state.countries.error)

   console.log(countries)

   return (
      <Container maxWidth='xl'>
         <FormFilters />

         {
            countriesStatus === 'loading' || countriesStatus === 'idle' ? <Loader />
               : countriesStatus === 'failed' ? <Error props={error} />

               : <Box sx={{ flexGrow: 1 }}>

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