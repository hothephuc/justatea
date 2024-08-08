// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
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
const analytics = getAnalytics(app); // Optional, only if you use analytics
const db = getFirestore(app); // Initialize Firestore

export { app, analytics, db, collection, addDoc };
