import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loader() {
   return (
      <Box sx={{
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center',
         minWidth: '100%',
         height: {xs: '30vh', md: '50vh'}
      }}>
         <CircularProgress />
      </Box>
   );
}
