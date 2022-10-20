import { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@mui/material';
import { ColorModeContext } from '../../../utilities/ToggleColorMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

const ResponsiveAppBar = () => {
   const theme = useTheme();
   const colorMode = useContext(ColorModeContext);
   const navigate = useNavigate()
   const location = useLocation()

   return (
      <AppBar 
         position='static'
         color='default'
         elevation={25} // (this is a customized value pushed in my theme in App.tsx)
      >
         <Container maxWidth='xl'>
            <Toolbar disableGutters>
               <Typography color='unset' fontWeight='bold' sx={{ mr: 2, display: 'flex' }} >
                  Where in the world?
               </Typography>

               <Box sx={{ flexGrow: 0, ml: 'auto' }}>
                  <IconButton sx={{ ml: 1, fontSize: 11 }} onClick={colorMode.toggleClrMode} color="inherit">
                     {
                        theme.palette.mode === 'dark' 
                           ? <LightModeIcon fontSize='small' /> 
                           : <DarkModeIcon fontSize='small' /> 
                     }
                     <Typography fontSize={13} sx={{ml:1}}>
                        {theme.palette.mode === 'light' ? 'Dark Mode': 'Light Mode'}
                     </Typography>
                  </IconButton>
               </Box>
            </Toolbar>
         </Container>
      </AppBar>
   );
};
export default ResponsiveAppBar;
