import { Container, Grid } from '@mui/material';
import React from 'react'
import '../App.css';

const Loader = () => {
  return (
    <Container>
        <Grid container alignItems={'center'} justifyContent={'center'} style={{width: '100%', height: '80vh'}}>
        <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </Grid>
    </Container>
  )
}

export default Loader