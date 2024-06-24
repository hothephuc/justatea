import {registerUser, signInUser} from './auth/auth.js'

const email = "newuser@example.com";
const password = "password123";
const fullname = "John Doe";
console.log("Hello world"); 
signInUser(email, password); 
//registerUser(fullname, email, password);
