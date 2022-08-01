import React, {useContext} from 'react'
import { AppBar, Grid, Button, Toolbar } from '@mui/material'

import { Context } from '../index';
import { useAuthState } from 'react-firebase-hooks/auth';

const Navbar = () => {
    const {auth} = useContext(Context);
    const [user, loading, error] = useAuthState(auth);

  return (
    <AppBar position="static">
        <Toolbar>
            <Grid container justifyContent={'flex-end'}>
                { user ?
                    <Button onClick={() => auth.signOut()} className="button" variant="contained">Log out</Button>
                    :
                    <Button className="button" variant="contained">Login</Button>
                }
            </Grid>
        </Toolbar>
    </AppBar>
  )
}

export default Navbar