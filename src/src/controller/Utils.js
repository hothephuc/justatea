import { app,storage,db } from "../config/firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, doc, setDoc, getDoc, getFirestore, updateDoc, serverTimestamp, getDocs, query, where } from "firebase/firestore"; 


    /**
     * Uploads an image to Firebase Storage and returns its download URL.
     * 
     * @param {File} imageFile - The image file to be uploaded.
     * @param {string} storagePath - The path in Firebase Storage where the image will be stored.
     * @returns {Promise<string>} - A promise that resolves to the download URL of the uploaded image.
     * @throws {Error} - Throws an error if the image upload fails.
     */
    export async function  uploadImage(imageFile, storagePath) {
        try {
            // Upload image file to Firebase Storage
            const storageRef = ref(storage, storagePath);
            const snapshot = await uploadBytes(storageRef, imageFile);

            // Get download URL of the uploaded image
            const imageUrl = await getDownloadURL(snapshot.ref);

            return imageUrl;
        } catch (error) {
            console.error("Error uploading image:", error);
            throw error;
        }
    }

    export async function getUserDocument(uid){
        const docref = doc(db,'users',uid);
        const docsnap = await getDoc(docref);
    
        if (docsnap.exists()) {
        return docsnap.data();
        } else {
        // docSnap.data() will be undefined in this case
        return null
        }
    }

    export async function addUserDoc(user, uid) {
        try {
            // Upload avatar image and get the URL (or an empty string if no image is provided)
            // const imageUrl = await upload_image_ava(imageFile, uid);
    
            // Set user document in Firestore
            await setDoc(doc(db, "users", uid), {
                fullname: user.name,
                dob: user.dob,
                gender: user.gender,
                email: user.email,
                phone: user.phone,
                address: user.add,
                role: "Customer",
                imageUrl: "" 
            });
    
            console.log("User document added successfully");
        } catch (error) {
            console.error("Error adding user document:", error);
            throw error; // Throw the error for handling in the caller function
        }
    }
