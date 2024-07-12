import { GoogleAuthProvider, getAuth, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth";
import { addUserDoc, getUserDocument } from "./data-handle";
import {validateEmail, validatePassword} from "./utils"
const auth = getAuth();
const ggProvider = new GoogleAuthProvider();

export async function signInGoogle(){
    signInWithPopup(auth, ggProvider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        //console.log(user.uid) test userid
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      })
}


export async function registerEmail(email, password, userInfo) {
  // Validate email and password
  if (!validateEmail(email)) {
    console.error("Invalid email format");
    throw new Error("Invalid email format");
  }

  if (!validatePassword(password)) {
    console.error("Password does not meet criteria");
    throw new Error("Password must be at least 6 characters long, contain a number, an uppercase letter");
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);

    // User successfully registered
    const user = userCredential.user;
    console.log("User registered:", user);

    // Save user information to Firestore
    await addUserDoc(userInfo, user.uid);

    console.log("User information saved to Firestore");
    return user; // Return the user object if needed
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("Error registering user:", errorCode, errorMessage);
    // Handle different error codes here to provide more specific feedback to the user
    throw error; // Re-throw the error if you want to handle it further up the call stack
  }
}


export async function signInEmail(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Signed in
    const user = userCredential.user;
    console.log("User signed in:", user);

    // Retrieve user document from Firestore
    const userData = await getUserDocument(user.uid);
    console.log("User data from Firestore:", userData);

    // Example: Accessing user data properties
    if (userData) {
      console.log("User full name:", userData.fullname);
      console.log("User date of birth:", userData.dob);
      console.log("User gender:", userData.gender);
      console.log("User email:", userData.email);
      console.log("User address:", userData.address);
    } else {
      console.log("No user data found for UID:", user.uid);
    }

    return { user, userData }; // Return the user object and user data if needed
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("Error signing in:", errorCode, errorMessage);
    // Handle error, display error message, etc.
    throw error; // Re-throw the error if you want to handle it further up the call stack
  }
}

export async function signOutUser() {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Error signing out:", error);
    throw error; // Re-throw the error if you want to handle it further up the call stack
  }
}

// Need to verify new password using validate password function 
export async function resetPassword(email) {
  // Validate email
  if (!validateEmail(email)) {
    console.error("Invalid email format");
    throw new Error("Invalid email format");
  }

  try {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent successfully");
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("Error sending password reset email:", errorCode, errorMessage);
    throw error; // Re-throw the error if you want to handle it further up the call stack
  }
}
