import db from '../config/firebase.js'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

import { getFirestore, doc, setDoc } from 'firebase/firestore';

const auth = getAuth();

function validate_email(email)
{
    expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true)
        {
            return true; 
        }
    else return false; 
}

function validate_password(password)
{
    // Length must be >= 6
    if (password < 6)
        return false;
    else return true; 
}

export function registerUser(fullname, email, password) 
{
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // User successfully registered
        const user = userCredential.user;
        console.log("User registered:", user);

        // Save user information to Firestore
        const userRef = doc(db, 'users', user.uid); // Create a document reference
        return setDoc(userRef, {
            fullname: fullname,
            email: email,
            password: password, 
            createdAt: new Date(),
            // Add more user information as needed
            });
    })
    .then(() => {
        console.log("User information saved to Firestore");
        // Redirect or perform additional actions as needed
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error registering user:", errorCode, errorMessage);
        // Handle different error codes here to provide more specific feedback to the user
    });
}

export function signInUser(email, password) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log("User signed up:", user);
  
        // Example: Accessing user properties
        console.log("User UID:", user.uid);
        console.log("User email:", user.email);
        console.log("User display name:", user.displayName);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error signing up:", errorCode, errorMessage);
        // Handle error, display error message, etc.
      });
  }
