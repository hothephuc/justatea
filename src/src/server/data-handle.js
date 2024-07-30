import { app } from "../config/firebase-config";
import { collection, doc, setDoc, getDoc,getFirestore,updateDoc, serverTimestamp } from "firebase/firestore"; 
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getTagType } from "./utils";

const db = getFirestore(app);
const storage = getStorage(app);

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

export async function updateUserDoc(user,uid){
    await updateDoc(doc(db,'users',uid),{
        fullname :user.name,
        dob: user.dob,
        gender:user.gender,
        phone:user.phone,
        address: user.add, 
    });
}
export async function setAdmin(uid){
    await updateDoc(doc(db,"users",uid),{
        role: "Admin"
    });
}

/**
 * Adds a user document to Firestore.
 * 
 * @param {Object} user - The user object containing user information.
 * @param {string} uid - The unique user ID.
 * @param {File} [imageFile] - The image file for the user's avatar (optional).
 * @returns {Promise<void>} - A promise that resolves when the user document is added.
 * @throws {Error} - Throws an error if the document creation fails.
 */
export async function addUserDoc(user, uid, imageFile = null) {
    try {
        // Upload avatar image and get the URL (or an empty string if no image is provided)
        const imageUrl = await upload_image_ava(imageFile, uid);

        // Set user document in Firestore
        await setDoc(doc(db, "users", uid), {
            fullname: user.name,
            dob: user.dob,
            gender: user.gender,
            email: user.email,
            phone: user.phone,
            address: user.add,
            role: "Customer",
            imageUrl: imageUrl // Add the image URL to the user document
        });

        console.log("User document added successfully");
    } catch (error) {
        console.error("Error adding user document:", error);
        throw error; // Throw the error for handling in the caller function
    }
}

/**
 * Uploads an image to Firebase Storage and returns its download URL.
 * 
 * @param {File} imageFile - The image file to be uploaded.
 * @param {string} storagePath - The path in Firebase Storage where the image will be stored.
 * @returns {Promise<string>} - A promise that resolves to the download URL of the uploaded image.
 * @throws {Error} - Throws an error if the image upload fails.
 */
async function uploadImage(imageFile, storagePath) {
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


/**
 * Uploads an avatar image to Firebase Storage and returns its download URL.
 * 
 * @param {File} imageFile - The image file to be uploaded.
 * @param {string} userId - The user ID to construct the storage path.
 * @returns {Promise<string>} - A promise that resolves to the download URL of the uploaded avatar.
 * @throws {Error} - Throws an error if the image upload fails.
 */
async function upload_image_ava(imageFile, userId) {
    if (imageFile) {
        const storagePath = `avatars/${userId}`;
        return await uploadImage(imageFile, storagePath);
    }
    return ""; // Return an empty string if no image file is provided
}

/**
 * Uploads product information and an image to Firebase.
 * 
 * @param {Object} productInfo - The product information.
 * @param {string} productInfo.name - The name of the product.
 * @param {number} productInfo.price - The price of the product.
 * @param {string} productInfo.category - The category of the product.
 * @param {string} productInfo.description - The description of the product.
 * @param {File} imageFile - The image file of the product.
 * @returns {Promise<string>} - A promise that resolves to the document ID of the uploaded product.
 * @throws {Error} - Throws an error if the product upload fails.
 */
export async function uploadProductInfo(productInfo, imageFile) {
    try {
        // Construct storage path based on category and product name
        const storagePath = `photos/${productInfo.category}/${productInfo.name}`;

        // Upload image and get the URL
        const imageUrl = await uploadImage(imageFile, storagePath);

        // Create a new document reference in the "products" collection
        const productRef = doc(collection(db, "products"));

        // Add document with product information to Firestore
        await setDoc(productRef, {
            name: productInfo.name,
            price: productInfo.price,
            tag: productInfo.category,
            description: productInfo.description,
            imageUrl: imageUrl,
            timestamp: new Date() // Add current timestamp
        });

        console.log("Product information uploaded successfully with ID:", productRef.id);
        return productRef.id; // Return the document ID if needed
    } catch (error) {
        if (error.message === "DuplicateProductName") {
            // Handle duplicate product name error on the frontend
            console.error("Error: Product name already exists");
            throw new Error("Product name already exists");
        } else {
            console.error("Error uploading product information:", error);
            throw error; // Throw the error for handling in the caller function
        }
    }
}

/**
 * Retrieves product information from Firestore.
 * 
 * @param {string} productId - The document ID of the product.
 * @returns {Promise<Object>} - A promise that resolves to the product information.
 * @throws {Error} - Throws an error if the product retrieval fails.
 */
export async function retrieveProductInfo(productId) {
    try {
        // Create a document reference for the specified product ID
        const productRef = doc(db, "products", productId);

        // Get the document
        const productDoc = await getDoc(productRef);

        if (!productDoc.exists()) {
            throw new Error("Product not found");
        }

        // Return the product data
        return productDoc.data();
    } catch (error) {
        console.error("Error retrieving product information:", error);
        throw error; // Throw the error for handling in the caller function
    }
}

/**
 * Uploads a product comment to Firestore.
 * 
 * @param {Object} comment - The comment object containing comment details.
 * @param {string} comment.ProductID - The ID of the product being reviewed.
 * @param {string} comment.CustomerID - The ID of the customer making the review.
 * @param {string} comment.Comment - The comment text.
 * @returns {Promise<void>} - A promise that resolves when the comment is uploaded.
 * @throws {Error} - Throws an error if the document creation fails.
 */
export async function uploadComment(comment) 
{
    try {
        // Create a new document reference in the "comments" collection
        const commentRef = doc(collection(db, "comments"));

        // Add document with comment information to Firestore
        await setDoc(commentRef, {
            ProductID: comment.ProductID,
            CustomerID: comment.CustomerID,
            Comment: comment.Comment,
            dateCreated: serverTimestamp() // Add current timestamp
        });

        console.log("Comment uploaded successfully with ID:", commentRef.id);
    } catch (error) {
        console.error("Error uploading comment:", error);
        throw error; // Throw the error for handling in the caller function
    }
}