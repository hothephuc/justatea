import { app } from "../config/firebase-config";
import { collection, doc, setDoc, getDoc,getFirestore } from "firebase/firestore"; 

const db = getFirestore(app);

export async function getUserDocument(uid){
    const docref = doc(db,'users',uid);
    const docsnap = await getDoc(docref);

    if (docsnap.exists()) {
    return docsnap.data();
    } else {
    // docSnap.data() will be undefined in this case
    return -1
    }
}

// the user pass into the addUserDoc function need to have all the attributes. Example: 
// const user = {
//     name: 'John Doe',
//     dob: '1990-01-01',
//     gender: 'male',
//     email: 'john.doe@example.com',
//     add: '123 Main St, Anytown, USA'
// };

export async function addUserDoc(user, uid){
    await setDoc(doc(db,"users",uid),{
        fullname: user.name,
        dob: user.dob,
        gender:user.gender,
        email: user.email,
        address: user.add
    });
}

export function validateEmail(email) 
{
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function validatePassword(password) 
{
    const minLength = 6;
    const hasNumber = /\d/;
    const hasUpperCase = /[A-Z]/;
    const hasLowerCase = /[a-z]/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;
  
    return (
      password.length >= minLength &&
      hasNumber.test(password) &&
      hasUpperCase.test(password) &&
      hasLowerCase.test(password) &&
      hasSpecialChar.test(password)
    );
}
  