import { app } from "../config/firebase-config";
import { collection, doc, setDoc, getDoc, getFirestore, updateDoc, serverTimestamp, getDocs, query, where } from "firebase/firestore"; 
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

export const fetchProducts = async () => {
    const productsCollection = collection(db, 'products');
    const productsSnapshot = await getDocs(productsCollection);
    const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return productsList;
  };

  export const fetchProductByID = async (productID) => {
    const productDoc = doc(db, 'products', productID);
    const productSnapshot = await getDoc(productDoc);
    if (productSnapshot.exists()) {
      return { id: productSnapshot.id, ...productSnapshot.data() };
    } else {
      throw new Error('Product not found');
    }
  };
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

export const fetchUserByID = async (userID) => {
    const userDoc = doc(db, 'users', userID);
    const userSnapshot = await getDoc(userDoc);
    if (userSnapshot.exists()) {
      return { id: userSnapshot.id, ...userSnapshot.data() };
    } else {
      throw new Error('User not found');
    }
};

export const fetchComments = async () => {
    try {
        const commentsCollection = collection(db, 'comments');
        const commentsSnapshot = await getDocs(commentsCollection);
        const commentsList = commentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        return commentsList;
    } catch (error) {
        console.error('Error fetching comments:', error);
        throw error;
    }
};

export const fetchCommentsByProductID = async (productID) => {
    try {
        const collectionRef = collection(db, 'comments'); // Tạo tham chiếu tới bộ sưu tập
        const q = query(collectionRef, where('productID', '==', productID)); // Tạo truy vấn để lọc tài liệu
        const snapshot = await getDocs(q); // Lấy các tài liệu từ bộ sưu tập với truy vấn
        const documentsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Ánh xạ các tài liệu thành một mảng các đối tượng
        return documentsList; // Trả về mảng các đối tượng tài liệu
    } catch (error) {
        console.error('Error fetching documents:', error); // Ghi nhật ký lỗi
        throw error; // Ném lỗi để xử lý bởi hàm gọi
    }
};


/**
 * Updates the CustomerCart fields for a user with the role "Customer".
 *
 * This function updates the `CustomerCart` field of a user document in Firestore.
 * It ensures that only users with the role "Customer" have their cart fields updated.
 *
 * @param {string} uid - The unique identifier of the user.
 * @param {string} productID - The ID of the product to be added/updated in the cart.
 * @param {Object} newCustomerCart - The new cart data to be updated.
 * @param {Array} newCustomerCart.ProductList - An array of product IDs corresponding to products in the cart.
 * @param {Array} newCustomerCart.quantityList - An array of quantities corresponding to the products in the cart.
 * @param {Array} newCustomerCart.sizeList - An array of sizes representing sizes corresponding to the products in the cart.
 * @param {Array} newCustomerCart.toppingList - An array of toppings, each containing toppings for the corresponding product in the cart.
 *
 * @throws Will throw an error if the update operation fails.
 */
export async function updateCustomerCart(uid, productID, newCustomerCart) {
    try {
        // Fetch the user data using uid
        const userData = await getUserDocument(uid);
        console.log("Fetched user data:", userData);
        
        // Check if the user exists and extract the role
        if (userData && userData.role === "Customer") {
            console.log("User is a customer. Preparing to update cart.");
            
            // Prepare the updated cart data, initializing fields if necessary
            const updatedCart = {
                cart: {
                    ProductList: [
                        ...(userData.cart?.ProductList || []), // Use existing ProductList or initialize to empty array
                        productID // Append new productID
                    ],
                    quantityList: [
                        ...(userData.cart?.quantityList || []), // Use existing quantityList or initialize to empty array
                        newCustomerCart.quantityList[0] // Append new quantity
                    ],
                    sizeList: [
                        ...(userData.cart?.sizeList || []), // Use existing sizeList or initialize to empty array
                        newCustomerCart.sizeList[0] // Append new size
                    ],
                    toppingList: [
                        ...(userData.cart?.toppingList || []), // Use existing toppingList or initialize to empty array
                        newCustomerCart.toppingList[0] // Append new topping array
                    ]
                }
            };

            console.log("Updated cart data:", updatedCart);

            // Update user document in Firestore with merged data
            const userDocRef = doc(db, "users", uid);
            await setDoc(userDocRef, updatedCart, { merge: true });

            console.log("Customer cart updated successfully");
        } else {
            console.log("User does not exist or role is not 'Customer'. No update performed.");
        }
    } catch (error) {
        console.error("Error updating customer cart:", error);
        throw error; // Throw the error for handling in the caller function
    }
}

/**
 * Retrieves the CustomerCart fields for a user with the role "Customer".
 *
 * This function fetches the cart data of a user from Firestore and returns it if the user has the role "Customer".
 *
 * @param {string} uid - The unique identifier of the user.
 * @returns {Promise<Object|null>} The cart data if the user is a customer, otherwise null.
 *
 * @throws Will throw an error if the retrieval operation fails.
 */
export async function retrieveCart(uid) {
    try {
        // Fetch the user data using uid
        const userData = await getUserDocument(uid);
        console.log("Fetched user data:", userData);
        
        // Check if the user exists and has the role "Customer"
        if (userData && userData.role === "Customer") {
            const userDocRef = doc(db, "users", uid);
            const userDoc = await getDoc(userDocRef);
            
            if (userDoc.exists()) {
                const cartData = userDoc.data().cart || {};
                console.log("Retrieved cart data:", cartData);
                return cartData; // Return the cart data
            } else {
                console.log("No cart data found for the user.");
                return null; // No cart data found
            }
        } else {
            console.log("User does not exist or role is not 'Customer'.");
            return null; // User is not a customer
        }
    } catch (error) {
        console.error("Error retrieving customer cart:", error);
        throw error; // Throw the error for handling in the caller function
    }
}