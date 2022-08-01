import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDIZGU53L88WdcEs7K6OxTAmUS7Ui9axY4",
  authDomain: "chat-react-504bf.firebaseapp.com",
  projectId: "chat-react-504bf",
  storageBucket: "chat-react-504bf.appspot.com",
  messagingSenderId: "893959096431",
  appId: "1:893959096431:web:5f077bb1fe379be3de659a",
  measurementId: "G-WYMCDQ4R7N"
};

const firebase = initializeApp(firebaseConfig);
const firestore = getFirestore(firebase);
const analytics = getAnalytics(firebase);

const auth = getAuth();

export const Context = createContext();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
      firebase,
      auth,
      firestore
    }}>
      <App />
    </Context.Provider>
);
