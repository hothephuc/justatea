import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './config/firebase-config'
import { signInGoogle,registerEmail,signInEmail, signOutUser } from './server/auth';

const user = {
    name: 'John Doe',
    dob: '1990-01-01',
    gender: 'male',
    email: 'john.doe@example.com',
    add: '123 Main St, Anytown, USA'
};

const useraccount ={
  email: user.email,
  password: '123456'
};

//registerEmail(useraccount.email,useraccount.password,user);
signInEmail(useraccount.email,useraccount.password);
signOutUser(); 
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
