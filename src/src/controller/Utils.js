import { app,storage } from "../config/firebase-config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
