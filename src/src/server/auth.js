import { GoogleAuthProvider, getAuth, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail,onAuthStateChanged } from "firebase/auth";
import { addUserDoc, getUserDocument } from "../controller/Utils.js";
import {validateEmail, validatePassword} from "./utils"
const auth = getAuth();
const ggProvider = new GoogleAuthProvider();

export function getCurrentUserUID() {
    const auth = getAuth(); // Lấy instance của Firebase Authentication
    const user = auth.currentUser; // Lấy người dùng hiện tại

    if (user) {
        return user.uid; // Trả về uid của người dùng hiện tại
    } else {
        console.error('No user is currently signed in');
        return null;
    }
}
export async function signInGoogle() {
  return new Promise((resolve, reject) => {
      signInWithPopup(auth, ggProvider)
      .then(async (result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          const userdoc = await getUserDocument(user.uid);

          // Extract user details
          if (userdoc) {
              // User exists in the database, return existing data
              resolve(userdoc);
          } 
          else {
              // User does not exist in the database, return new user details
              const userDetails = {
                  email: user.email,
                  uid: user.uid,
                  name: user.displayName
              };
              resolve(userDetails);
          }
      }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);

          reject({ errorCode, errorMessage, email });
      });
  });
}

/**
 * Registers a new user with email and password, and saves additional user information to Firestore.
 * 
 * @param {string} email - The email address of the user to be registered.
 * @param {string} password - The password for the new user account.
 * @param {Object} userInfo - Additional information about the user.
 * @returns {Promise<Object>} - A promise that resolves to the user object if registration is successful.
 * @throws {Error} - Throws an error if registration fails or if the email/password is invalid.
 */
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

/**
 * Signs in a user with email and password, and retrieves the user data from Firestore.
 * 
 * @param {string} email - The email address of the user attempting to sign in.
 * @param {string} password - The password of the user attempting to sign in.
 * @returns {Promise<Object>} - A promise that resolves to an object containing the user and user data if sign-in is successful.
 * @throws {Error} - Throws an error if sign-in fails.
 */
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
      console.log("User phonenumber:",userData.phone);
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

/**
 * Signs out the currently authenticated user.
 * 
 * @returns {Promise<void>} - A promise that resolves when the user is successfully signed out.
 * @throws {Error} - Throws an error if sign-out fails.
 */
export async function signOutUser() {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Error signing out:", error);
    throw error; // Re-throw the error if you want to handle it further up the call stack
  }
}

/**
 * Sends a password reset email to the user.
 * 
 * @param {string} email - The email address of the user requesting a password reset.
 * @returns {Promise<void>} - A promise that resolves when the password reset email is successfully sent.
 * @throws {Error} - Throws an error if the email format is invalid or if sending the password reset email fails.
 */
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

export function checkAuthState() {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          console.log('Người dùng đã đăng nhập:', user);

          let userData = await getUserDocument(user.uid);
          if (!userData) {
            console.log('Dữ liệu người dùng không tồn tại.');
            resolve({ user, userData: null });
          } else {
            resolve({ user, userData });
          }
        } else {
          console.log('Không có người dùng nào đăng nhập.');
          resolve(null);
        }
      } catch (error) {
        console.error('Lỗi khi kiểm tra trạng thái xác thực:', error);
        reject(error); // Từ chối promise nếu có lỗi
      }
    });
  });
}