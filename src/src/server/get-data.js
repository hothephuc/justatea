import { app } from "../config/firebase-config";
import { collection, doc, setDoc, getDoc,getFirestore } from "firebase/firestore"; 

const db = getFirestore(app);
export async function get_user_document(uid){
    const docref = doc(db,'users',uid);
    const docsnap = await getDoc(docref);

    if (docsnap.exists()) {
    return docsnap.data();
    } else {
    // docSnap.data() will be undefined in this case
    return -1
    }
}
