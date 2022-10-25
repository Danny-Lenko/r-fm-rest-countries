import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ICountry, IGlobalState } from "../../library/interfaces/interfaces";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Image from 'mui-image'
import { fetchCountries } from "../AllCountries/allCountriesSlice";
import { useEffect } from 'react'
import { AppDispatch } from "../../main/store/store";
import Loader from "../../library/common/components/Loader/Loader";
import Error from "../../library/common/components/Error/Error";
import Typography from "@mui/material/Typography";
import styled from "@mui/material/styles/styled";

const Country = () => {
   const { name } = useParams()
   const dispatch = useDispatch<AppDispatch>()
   const countries = useSelector((state: IGlobalState) => state.countries.countries)
   const country: ICountry = countries.find(country => country.name.common === name)!
   const countriesStatus = useSelector((state: IGlobalState) => state.countries.status)
   const error = useSelector((state: IGlobalState) => state.countries.error)

   useEffect(() => {
      dispatch(fetchCountries(''))
   }, [dispatch])

   const nativeName = country && Object.entries(country.name.nativeName)[0][1].common 
      ? Object.entries(country.name.nativeName)[0][1].common 
      : 'Does Not Have'


   console.log(nativeName)

   const PropertyBox = styled(Typography)(({theme}) => ({
      fontSize: 'small',
      fontWeight: theme.typography.fontWeightBold,
      marginBottom: theme.spacing(1)
   }))

   const ValueBox = styled('span')(({theme}) => ({
      fontWeight: theme.typography.fontWeightRegular
   }))

   return (
      <Container maxWidth="xl">
         {
            countriesStatus === 'loading' 
            || countriesStatus === 'idle' 
               ? <Box sx={{height: '80vh', display: 'flex', alignItems: 'center'}} >
                  <Loader />
               </Box>
               : countriesStatus === 'failed' ? <Error props={error} />

               : <Box sx={{border: '1px lightgreen solid', display: 'flex', justifyContent: 'space-between'}}>
                  {/* image box */}
                  <Box sx={{border: 1}}>
                     <Image
                        src={country!.flags.png}
                     />
                  </Box>
                  {/* content box */}
                  <Box sx={{border: 1, display: 'flex'}}>
                     <Typography sx={{border: 1, flexGrow: 1}} variant="h6">{country.name.common}</Typography>
                     {/* 1st block of values */}
                     <Box>
                        <PropertyBox>
                           Native Name: <ValueBox>{nativeName}</ValueBox>
                        </PropertyBox>
                        <PropertyBox>
                           Population: <ValueBox>{country.population.toLocaleString()}</ValueBox>
                        </PropertyBox>
                        <PropertyBox>
                           Region: <ValueBox>{country.region}</ValueBox>
                        </PropertyBox>
                        <PropertyBox>
                           Sub Region: <ValueBox>{country.subregion}</ValueBox>
                        </PropertyBox>
                        <PropertyBox>
                           Capital: <ValueBox>{country.capital}</ValueBox>
                        </PropertyBox>
                     </Box>
                     {/* 2nd block of values */}
                     <Box>
                        <PropertyBox>
                           Native Name: <ValueBox>{nativeName}</ValueBox>
                        </PropertyBox>
                        <PropertyBox>
                           Population: <ValueBox>{country.population.toLocaleString()}</ValueBox>
                        </PropertyBox>
                        <PropertyBox>
                           Region: <ValueBox>{country.region}</ValueBox>
                        </PropertyBox>
                        <PropertyBox>
                           Sub Region: <ValueBox>{country.subregion}</ValueBox>
                        </PropertyBox>
                        <PropertyBox>
                           Capital: <ValueBox>{country.capital}</ValueBox>
                        </PropertyBox>
                     </Box>
                  </Box>
               </Box>
         }
      </Container>
   );
}

export default Country;