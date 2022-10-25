import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { ICountry } from '../../library/interfaces/interfaces';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from 'react-router-dom';

export default function CountryCard({ 
   name, 
   flags, 
   population, 
   region, 
   capital 
}: ICountry) {

   const countryCardStyles = {
      width: 270,
      backgroundImage: 'none',
      '& .MuiCardContent-root': {
         px: 3,
         pb: 4
      },
      '& .MuiTypography-root.cardHeading': {
         my: 1,
         mb: 2,
         fontSize: '1.1rem',
      },
      '& .MuiListItemText-multiline': {
         display: 'flex',
         gap: 0.5,
         alignItems: 'baseline',
         mt: 0
      },
      '& .MuiListItemText-primary': {
         fontSize: '0.9rem',
         fontWeight: 'medium'
      },
   }

   const navigate = useNavigate()

   return (
      <Card elevation={25} sx={countryCardStyles}>
         <CardActionArea
            onClick={() => navigate(`/${name.common}`)}
         >
            <CardMedia
               component="img"
               height="140"
               image={flags.png}
               alt={name.common}
            />
            <CardContent>
               <Typography className='cardHeading' variant="h6" component="div">
                  {name.common}
               </Typography>
               <List disablePadding >
                  <ListItem disablePadding>
                     <ListItemText primary="Population:" secondary={population.toLocaleString()} />
                  </ListItem>
                  <ListItem disablePadding>
                     <ListItemText primary="Region:" secondary={region}/>
                  </ListItem>
                  <ListItem disablePadding>
                     <ListItemText primary="Capital:" secondary={capital}/>
                  </ListItem>
               </List>
            </CardContent>
         </CardActionArea>
      </Card>
   );
}
