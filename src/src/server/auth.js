import { GoogleAuthProvider, getAuth, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { addUserDoc } from "./data-handle";
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
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // User successfully registered
    const user = userCredential.user;
    console.log("User registered:", user);

    // Save user information to Firestore
    await addUserDoc(userInfo,user.uid);

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

    // Example: Accessing user properties
    console.log("User UID:", user.uid);
    console.log("User email:", user.email);
    console.log("User display name:", user.displayName);

    return user; // Return the user object if needed
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("Error signing in:", errorCode, errorMessage);
    // Handle error, display error message, etc.
    throw error; // Re-throw the error if you want to handle it further up the call stack
  }
}

