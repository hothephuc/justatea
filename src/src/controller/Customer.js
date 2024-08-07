import { app, db } from "../config/firebase-config";
import { collection, doc, setDoc, getDoc, getFirestore, updateDoc, serverTimestamp, getDocs, query, where } from "firebase/firestore"; 
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { uploadImage } from "./Utils";
class CustomerController {
    // Update user's phone number
    static async updateUserPhone(uid, phone) {
        const userDoc = doc(db, 'users', uid);

        await updateDoc(userDoc, {
            phone: phone
        });
    }

    // Update user's address
    static async updateUserAddress(uid, address) 
    {
        const userDoc = doc(db, 'users', uid);

        await updateDoc(userDoc, {
            address: address
        });
    }

    // Update user's image URL
    static async updateUserImgUrl(uid, imgUrl) {
        const userDoc = doc(db, 'users', uid);

        await updateDoc(userDoc, {
            imageUrl: imgUrl
        });
    }

    static async upload_image_ava(imageFile, userId) {
    if (imageFile) {
        const storagePath = `avatars/${userId}`;
        return await uploadImage(imageFile, storagePath);
    }
    return ""; // Return an empty string if no image file is provided
}

}

export default CustomerController;