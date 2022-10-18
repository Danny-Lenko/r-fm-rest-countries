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
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';

const ResponsiveAppBar = () => {
   const theme = useTheme();
   const colorMode = useContext(ColorModeContext);
   const navigate = useNavigate()
   const location = useLocation()

   return (
      <AppBar 
         position='static'
         color='default' 
      >
         <Container maxWidth='xl'>
            <Toolbar disableGutters>
               <Typography fontWeight='bold' sx={{ mr: 2, display: 'flex' }} >
                  Where in the world?
               </Typography>

               <Box sx={{ flexGrow: 1, display: 'flex' }}>

               </Box>

               <Box sx={{ flexGrow: 0 }}>
                  <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleClrMode} color="inherit">
                     {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                  </IconButton>
               </Box>
            </Toolbar>
         </Container>
      </AppBar>
   );
};
export default ResponsiveAppBar;
