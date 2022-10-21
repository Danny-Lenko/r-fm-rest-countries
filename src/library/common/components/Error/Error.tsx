import { Container } from "@mui/material";

const Error = (props:any) => {
   return (  
      <Container>
         <h3>Lost Connection with the server: {props.error}</h3>
         <h4>Try refreshing the page</h4>
      </Container>
   );
}
 
export default Error;