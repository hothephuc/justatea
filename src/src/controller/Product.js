import { app,db,storage } from "../config/firebase-config";
import { collection, doc, setDoc, getDoc, getFirestore, updateDoc, serverTimestamp, getDocs, query, where } from "firebase/firestore"; 
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

class ProductController {
    /**
     * Retrieves product information from Firestore.
     * 
     * @param {string} productId - The document ID of the product.
     * @returns {Promise<Object>} - A promise that resolves to the product information.
     * @throws {Error} - Throws an error if the product retrieval fails.
     */
    static async retrieveProductInfo(productId) {
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
     * Fetches products from Firestore based on an optional search query.
     * 
     * @param {string} searchQuery - The search query to filter products by name.
     * @returns {Promise<Array>} - A promise that resolves to an array of product information.
     * @throws {Error} - Throws an error if the product fetch fails.
     */
    static async fetchProducts(searchQuery = "") {
        try {
            const productsCollection = collection(db, 'products');
            // Create a query to filter products based on the search query
            const q = searchQuery
                ? query(productsCollection, where('name', '>=', searchQuery), where('name', '<=', searchQuery + '\uf8ff'))
                : productsCollection;

            const productsSnapshot = await getDocs(q);
            const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return productsList;
        } catch (error) {
            console.error('Error fetching products:', error);
            return [];
        }
    }

    /**
     * Fetches product information from Firestore by product ID.
     * 
     * @param {string} productID - The document ID of the product.
     * @returns {Promise<Object>} - A promise that resolves to the product information.
     * @throws {Error} - Throws an error if the product fetch fails.
     */
    static async fetchProductByID(productID) {
        try {
            const productDoc = doc(db, 'products', productID);
            const productSnapshot = await getDoc(productDoc);
            if (productSnapshot.exists()) {
                return { id: productSnapshot.id, ...productSnapshot.data() };
            } else {
                throw new Error('Product not found');
            }
        } catch (error) {
            console.error('Error fetching product by ID:', error);
            throw error;
        }
    }
}

export default ProductController;
