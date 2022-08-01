import React, { useContext } from 'react'
import { Routes, Route} from 'react-router-dom'
import Login from './Login';
import Chat from './Chat';
import { privateRoutes, publicRoutes } from './routes';
import { Context } from '../index';
import { useAuthState } from 'react-firebase-hooks/auth';

const AppRouter = () => {
    const {auth} = useContext(Context);
    const [user, loading, error] = useAuthState(auth);

    return user ?
    (
        <Routes>
            {
                privateRoutes.map(({ path, Component }) => 
                    <Route path={path} element={Component} />
                )
            }           
           <Route path="*" element={<Chat />} />
        </Routes>
    )
    :
    (
        <Routes>
            {
                publicRoutes.map(({ path, Component }) => 
                    <Route path={path} element={Component} />
                )
            }      
            <Route path="*" element={<Login />} />   
           
        </Routes>
    )
}

export default AppRouter