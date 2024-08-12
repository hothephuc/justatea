import { app, db } from "../config/firebase-config";
import { collection, doc, setDoc, getDoc, getFirestore, updateDoc, serverTimestamp, getDocs, query, where } from "firebase/firestore"; 
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { uploadImage } from "./Utils";
import OrderController from "./Order";
import Order from "../model/Order";
class AdminController {
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
    static async uploadProductInfo(productInfo, imageFile) {
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
     * Sets the user's role to Admin.
     * 
     * @param {string} uid - The user ID to update.
     * @returns {Promise<void>} - A promise that resolves when the role is updated.
     */
    static async setAdmin(uid) {
        await updateDoc(doc(db, "users", uid), {
            role: "Admin"
        });
    }

    static async setCustomer(uid) {
        await updateDoc(doc(db, "users", uid), {
            role: "Customer"
        });
    }
    /**
     * Uploads an avatar image to Firebase Storage and returns its download URL.
     * 
     * @param {File} imageFile - The image file to be uploaded.
     * @returns {Promise<string>} - A promise that resolves to the download URL of the uploaded avatar.
     * @throws {Error} - Throws an error if the image upload fails.
     */
    static async uploadImageSlide(imageFile) {
        if (imageFile) {
            const storagePath = 'slide';
            return await uploadImage(imageFile, storagePath);
        }
        return "";
    }

     // Fetch all users
     static async getAllUsers() {
        try {
            const usersCollection = collection(db, 'users');
            const usersSnapshot = await getDocs(usersCollection);
            const usersList = usersSnapshot.docs.map(doc => ({id: doc.id,...doc.data()}));
            return usersList;
        } catch (error) {
            console.error('Error fetching users:', error);
            throw new Error('Unable to fetch users');
        }
    }

    static async fetchAllSlideImageUrls() {
        try {
            const slideCollection = collection(db, 'slide');
            const slideSnapshot = await getDocs(slideCollection);
            const imageUrls = [];
            
            slideSnapshot.forEach((doc) => {
                const data = doc.data();
                console.log('Document data:', data);
                if (data.imageUrl) {
                    imageUrls.push(data.imageUrl);
                }
            });
            console.log('Fetched image URLs:', imageUrls); // Log all image URLs
            return imageUrls;
        } catch (error) {
            console.error('Error fetching slide image URLs:', error);
            throw error;
        }
    }

    /**
     * Sets the order status to 'Paid'.
     *
     * @param {string} orderId - The ID of the order to update.
     * @returns {Promise<void>}
     */
    static async setOrderStatusToPaid(orderId) {
        try {
            const orderDocRef = doc(db, "orders", orderId);
            await updateDoc(orderDocRef, {
                orderStatus: "Paid",
            });
            console.log(`Order ${orderId} status updated to 'Paid'.`);
        } catch (error) {
            console.error("Error setting order status to 'Paid':", error);
            throw error;
        }
    }

    /**
     * Sets the order status to 'Shipping' and updates the delivery date.
     *
     * @param {string} orderId - The ID of the order to update.
     * @param {Date} deliveryDate - The delivery date for the order.
     * @returns {Promise<void>}
     */
    static async setOrderStatusToShipping(orderId, deliveryDate) {
        try {
            const orderDocRef = doc(db, "orders", orderId);
            await updateDoc(orderDocRef, {
                orderStatus: "Shipping",
                dateshipped: deliveryDate, // Ensure deliveryDate is a Firestore Date object
            });
            console.log(`Order ${orderId} status updated to 'Shipping' with delivery date ${deliveryDate}.`);
        } catch (error) {
            console.error("Error setting order status to 'Shipping':", error);
            throw error;
        }
    }

    /**
     * Sets the order status to 'Delivered'.
     *
     * @param {string} orderId - The ID of the order to update.
     * @returns {Promise<void>}
     */
    static async setOrderStatusToDelivered(orderId) {
        try {
            const orderDocRef = doc(db, "orders", orderId);
            await updateDoc(orderDocRef, {
                orderStatus: "Delivered",
            });
            console.log(`Order ${orderId} status updated to 'Delivered'.`);
        } catch (error) {
            console.error("Error setting order status to 'Delivered':", error);
            throw error;
        }
    }


}




export default AdminController;