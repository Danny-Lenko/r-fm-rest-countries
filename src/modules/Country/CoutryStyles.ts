import styled from "@mui/material/styles/styled";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export const PropertyBox = styled(Typography)(({theme}) => ({
   fontSize: 'small',
   fontWeight: theme.typography.fontWeightBold,
   marginBottom: theme.spacing(1)
}))

export const ValueBox = styled('span')(({theme}) => ({
   fontWeight: theme.typography.fontWeightRegular,
   color: theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[300],
}))

export const BorderButton = styled(Button)(({theme}) => ({
   boxShadow: "0px 3px 1px -2px rgba(0,0,0,0.01),0px 2px 2px 0px rgba(0,0,0,0.014),0px 1px 5px 0px rgba(0,0,0,0.12)",
   textTransform: 'capitalize',
   fontWeight: theme.typography.fontWeightRegular,
   color: theme.palette.mode === 'light' ? theme.palette.grey[700] : theme.palette.grey[300],
   marginRight: theme.spacing(1),
   backgroundColor: theme.palette.background.paper,
   padding: '3px 15px'
}))

export const mainBoxStyles = {
   display: 'flex',
   flexDirection: {xs: 'column', md: 'row'},
   justifyContent: 'space-between',
   alignItems: {xs: 'center', md: 'unset'}
}

export const contentBoxStyles = {
    width: {xs: '100%', sm: '70%', md: '40%', lg: '50%'},
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
}
