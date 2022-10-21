import { Link } from "react-router-dom";
import { Container } from "@mui/material";

const NotFount = () => {
   return (
      <Container maxWidth='md'>
         <h3>Page Does Not Exist</h3>
         <Link to='/'><h1>Go Home</h1></Link>
      </Container>  
      
   );
}
 
export default NotFount;