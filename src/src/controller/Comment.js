import { app, db } from "../config/firebase-config";
import { collection, doc, setDoc, getDoc, getFirestore, updateDoc, serverTimestamp, getDocs, query, where } from "firebase/firestore"; 
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

class CommentController {
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
    static async uploadComment(comment) {
        try {
            // Create a new document reference in the "comments" collection
            const commentRef = doc(collection(db, "comments"));

            // Add document with comment information to Firestore
            await setDoc(commentRef, {
                productID: comment.productID,
                userID: comment.userID,
                text: comment.text,
                dateCreated: serverTimestamp() // Add current timestamp
            });

            console.log("Comment uploaded successfully with ID:", commentRef.id);
        } catch (error) {
            console.error("Error uploading comment:", error);
            throw error; // Throw the error for handling in the caller function
        }
    }

    /**
     * Fetches all comments from Firestore.
     * 
     * @returns {Promise<Array>} - A promise that resolves to an array of comment objects.
     * @throws {Error} - Throws an error if the fetch operation fails.
     */
    static async fetchComments() {
        try {
            const commentsCollection = collection(db, 'comments');
            const commentsSnapshot = await getDocs(commentsCollection);
            const commentsList = commentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            return commentsList;
        } catch (error) {
            console.error('Error fetching comments:', error);
            throw error;
        }
    }

    /**
     * Fetches comments for a specific product from Firestore.
     * 
     * @param {string} productID - The ID of the product.
     * @returns {Promise<Array>} - A promise that resolves to an array of comment objects for the specified product.
     * @throws {Error} - Throws an error if the fetch operation fails.
     */
    static async fetchCommentsByProductID(productID) {
        try {
            const collectionRef = collection(db, 'comments'); // Create a reference to the collection
            const q = query(collectionRef, where('productID', '==', productID)); // Create a query to filter documents
            const snapshot = await getDocs(q); // Get the documents from the collection with the query
            const documentsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Map the documents to an array of objects
            return documentsList; // Return the array of document objects
        } catch (error) {
            console.error('Error fetching documents:', error); // Log the error
            throw error; // Throw the error for handling in the caller function
        }
    }
}

export default CommentController;
