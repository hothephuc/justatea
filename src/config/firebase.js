// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore }  from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCxEDNF88xgI37iXxBEzImyylu0yQ4w6X4",
  authDomain: "justatea-a932a.firebaseapp.com",
  projectId: "justatea-a932a",
  storageBucket: "justatea-a932a.appspot.com",
  messagingSenderId: "1086671020669",
  appId: "1:1086671020669:web:ce431c19148a0a9417c714",
  measurementId: "G-C68B7CRPJ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); 
export default db; 
