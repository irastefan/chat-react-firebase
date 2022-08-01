import React, { useContext, useEffect, useState } from 'react'
import { Avatar, Box, Button, Container, Grid, TextField } from '@mui/material'
import { Context } from '../index'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { collection, doc, setDoc, addDoc, getDocs, onSnapshot, query, orderBy, limit, serverTimestamp } from "firebase/firestore"; 
import Loader from './Loader';

const Chat = () => {
    const { firebase, auth, firestore} = React.useContext(Context);
    const [user] = useAuthState(auth);

    const [value, setValue] = useState('');

    const messagesRef = collection(firestore, 'messages') 

    const sendMessage = async () => {
        addDoc(messagesRef , {
            uid: user.uid,
            displayName: user.displayName,
            photoUrl: user.photoURL,
            text: value,
            createdAt: serverTimestamp()
        })
        setValue('')
    }

    useEffect(async () => {
        const querySnapshot = await getDocs(messagesRef);
        querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        });
    }, [])


    const q = query(messagesRef, orderBy("createdAt", "desc"))
    const [messages] = useCollectionData(q, { idField: "uid" })
    console.log(messages)

    

  return (
    <Container>
        <Grid 
          container 
          style={{height: window.innerHeight - 50}} 
          justifyContent = {'center'}
          alignContent={'flex-start'}
        >
            <div style={{display: 'flex', flexDirection: 'column-reverse',width: '80%', height: '60vh', border: '1px solid #ccc', overflowY: 'scroll', margin: '20px 0'}}>
            {
                    messages ?
                    messages.map(message => 
                        <div style={{
                            margin: 5, padding: 10, width: 'fit-content', borderRadius: 10, 
                            background: user.uid === message.uid ? '#eee' : '#ADE2FF',
                            marginLeft: user.uid === message.uid ? 'auto' : '10px'
                        }}  >
                            <Grid container alignItems={'center'}>
                                <Avatar src={message.photoUrl} style={{marginBottom: '10px'}} />
                                <div style={{marginLeft: '10px', fontSize: '14px', color: '#333'}} >{message.displayName}</div>
                            </Grid>
                            <div>{message.text}</div>
                        </div>    
                    )
                    :
                    <Loader />
                }
            </div>
            <Grid 
            container
            alignItems={'flex-end'}
            direction={'column'}
            style={{width: '80%'}}
            >
                <TextField value={value} onChange={e  => setValue(e.target.value)} variant={'outlined'} fullWidth style={{marginBottom: '10px'}} />
                <Button onClick={sendMessage} variant={'contained'}>Send</Button>
            </Grid>
        </Grid>
    </Container>
  )
}

export default Chat