import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { Theme } from '@mui/system';

export const Search = styled('div')(({ theme }) => ({
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

export const SearchIconWrapper = styled('div')(({ theme }) => ({
   padding: theme.spacing(0, 2),
   height: '100%',
   position: 'absolute',
   pointerEvents: 'none',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
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

export const selectStyles = {
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
