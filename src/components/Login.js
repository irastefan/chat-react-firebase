import { Box, Button, Container, Grid } from '@mui/material'
import React, { useContext } from 'react'
import { Context } from '../index'
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";


const Login = () => {
  const { auth } = useContext(Context);

  const login = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    console.log(user);
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.customData.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
  });
    
  }

  return (
    <Container>
        <Grid 
          container 
          style={{height: window.innerHeight - 50}} 
          alignItems={"center"} 
          justifyContent  ={'center'}
        >
            <Grid style={{background: 'white', width: 400}}
              container
              alignItems={'center'}
              direction={'column'}
            >
                <Box p={5}>
                    <Button onClick={login} variant={'contained'}>Login with Google</Button>
                </Box>
            </Grid>
        </Grid>
    </Container>
  )
}

export default Login