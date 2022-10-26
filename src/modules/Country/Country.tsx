import { useNavigate, useParams } from "react-router-dom";
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
import Button from "@mui/material/Button";
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';

const Country = () => {
   const { name } = useParams()
   const dispatch = useDispatch<AppDispatch>()
   const countries = useSelector((state: IGlobalState) => state.countries.countries)
   const country: ICountry = countries.find(country => country.name.common === name)!
   const countriesStatus = useSelector((state: IGlobalState) => state.countries.status)
   const error = useSelector((state: IGlobalState) => state.countries.error)
   const navigate = useNavigate()

   useEffect(() => {
      dispatch(fetchCountries(''))
   }, [dispatch])

   const nativeName = country ? Object.values(country.name.nativeName)[0].common : 'No Native Name'
   const currencies = country ? Object.values(country.currencies).map(curr => curr.name).join(', ') : 'No Own Currency'
   const languages = country ? Object.values(country.languages).map(lang => lang).join(', ') : 'No Official Language'
   const borders = country && country.borders ? country.borders : null
   const countryBorders = borders ? borders.map(acronym => {
      return countries.find(country => country.cca3 === acronym)?.name.common
   }) : null

   console.log(country)

   const PropertyBox = styled(Typography)(({theme}) => ({
      fontSize: 'small',
      fontWeight: theme.typography.fontWeightBold,
      marginBottom: theme.spacing(1)
   }))

   const ValueBox = styled('span')(({theme}) => ({
      fontWeight: theme.typography.fontWeightRegular,
      color: theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[300],
   }))

   const BorderButton = styled(Button)(({theme}) => ({
      boxShadow: "0px 3px 1px -2px rgba(0,0,0,0.01),0px 2px 2px 0px rgba(0,0,0,0.014),0px 1px 5px 0px rgba(0,0,0,0.12)",
      textTransform: 'capitalize',
      fontWeight: theme.typography.fontWeightRegular,
      color: theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[300],
      marginRight: theme.spacing(1),
      backgroundColor: theme.palette.background.paper,
      padding: '3px 15px'
   }))

   const mainBoxStyles = {
      display: 'flex',
      flexDirection: {xs: 'column', md: 'row'},
      justifyContent: 'space-between',
      alignItems: {xs: 'center', md: 'unset'}
   }

   const contentBoxStyles = {
       width: {xs: '100%', sm: '70%', md: '40%', lg: '50%'},
       display: 'flex',
       flexWrap: 'wrap',
       justifyContent: 'space-between'
   }

   return (
      <Container maxWidth="xl">
         <BorderButton
            startIcon={<KeyboardBackspaceRoundedIcon />}
            onClick={() => navigate(-1)}
            sx={{px: 4, my: {xs: 3, lg: 6}}}
         >
            Back
         </BorderButton>
         {
            countriesStatus === 'loading'
            || countriesStatus === 'idle'
               ? <Box sx={{height: {xs: '60vh', lg: '40vh'}, display: 'flex', alignItems: 'center'}} >
                  <Loader />
               </Box>
               : countriesStatus === 'failed' ? <Error props={error} />

               : <Box sx={mainBoxStyles}>
                  {/* image box */}
                  <Box sx={{ width: {xs: '80%', sm: '50%', md: '59%', lg: '40%'}, maxHeight: '70vh'}}>
                     <Image
                        src={country!.flags.png}
                     />
                  </Box>
                  {/* content box */}
                  <Box sx={contentBoxStyles}>
                     <Typography sx={{width: '100%', mt: 3, mb: 2}} variant="h6">{country.name.common}</Typography>
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
                           Top Level Domain: <ValueBox>{country.tld}</ValueBox>
                        </PropertyBox>
                        <PropertyBox>
                           Currencies: <ValueBox>{currencies}</ValueBox>
                        </PropertyBox>
                        <PropertyBox>
                           Languages: <ValueBox>{languages}</ValueBox>
                        </PropertyBox>
                     </Box>
                     {/* border countryies */}
                     <PropertyBox sx={{width: '100%', mt: 5, mb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 1}}>
                        <Typography fontSize='small' fontWeight={800} sx={{mb: 1}}>Border Countries:</Typography> 
                        <Box>{
                           countryBorders 
                              ? countryBorders.map(country => <BorderButton
                                 onClick={() => navigate(`/${country}`)}
                                 sx={{mb: 1}}
                                 size="small"
                              >
                                 {country}
                              </BorderButton>) 
                              : <Typography sx={{mb:1}}>No Countries Close</Typography>
                        }</Box>
                     </PropertyBox>
                  </Box>
               </Box>
         }
      </Container>
   );
}

export default Country;