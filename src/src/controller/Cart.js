import { app, db } from "../config/firebase-config";
import { collection, doc, setDoc, getDoc, getFirestore, updateDoc, serverTimestamp, getDocs, query, where, deleteField } from "firebase/firestore"; 
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

class CartController {
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
     * @param {Array} newCustomerCart.priceList - An array of prices corresponding to the products in the cart.
     *
     * @throws Will throw an error if the update operation fails.
     */
    static async updateCustomerCart(uid, productID, newCustomerCart) {
        try {
            const userData = await CartController.getUserDocument(uid);
            console.log("Fetched user data:", userData);

            if (userData && userData.role === "Customer") {
                console.log("User is a customer. Preparing to update cart.");

                const updatedCart = {
                    cart: {
                        ProductList: [
                            ...(userData.cart?.ProductList || []),
                            productID
                        ],
                        quantityList: [
                            ...(userData.cart?.quantityList || []),
                            newCustomerCart.quantityList[0]
                        ],
                        sizeList: [
                            ...(userData.cart?.sizeList || []),
                            newCustomerCart.sizeList[0]
                        ],
                        toppingList: [
                            ...(userData.cart?.toppingList || []),
                            newCustomerCart.toppingList[0]
                        ],
                        priceList: [
                            ...(userData.cart?.priceList || []),
                            newCustomerCart.priceList[0]
                        ]
                    }
                };

                console.log("Updated cart data:", updatedCart);

                const userDocRef = doc(db, "users", uid);
                await setDoc(userDocRef, updatedCart, { merge: true });

                console.log("Customer cart updated successfully");
            } else {
                console.log("User does not exist or role is not 'Customer'. No update performed.");
            }
        } catch (error) {
            console.error("Error updating customer cart:", error);
            throw error;
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
    static async retrieveCart(uid) {
        try {
            const userData = await CartController.getUserDocument(uid);
            console.log("Fetched user data:", userData);

            if (userData && userData.role === "Customer") {
                const userDocRef = doc(db, "users", uid);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    const cartData = userDoc.data().cart || {};
                    console.log("Retrieved cart data:", cartData);
                    return cartData;
                } else {
                    console.log("No cart data found for the user.");
                    return null;
                }
            } else {
                console.log("User does not exist or role is not 'Customer'.");
                return null;
            }
        } catch (error) {
            console.error("Error retrieving customer cart:", error);
            throw error;
        }
    }

    /**
     * Removes an item from the CustomerCart for a user with the role "Customer".
     *
     * This function fetches the cart data of a user from Firestore, removes the item at the specified index,
     * and updates the cart in Firestore.
     *
     * @param {string} uid - The unique identifier of the user.
     * @param {number} index - The index of the item in the cart to be removed.
     *
     * @throws Will throw an error if the update operation fails.
     */
    static async removeItemFromCart(uid, index) {
        try {
            const userData = await CartController.getUserDocument(uid);
            console.log("Fetched user data:", userData);

            if (userData && userData.role === "Customer") {
                console.log("User is a customer. Preparing to remove item from cart.");

                if (userData.cart && userData.cart.ProductList && userData.cart.quantityList &&
                    userData.cart.sizeList && userData.cart.toppingList && userData.cart.priceList &&
                    index < userData.cart.ProductList.length) {

                    userData.cart.ProductList.splice(index, 1);
                    userData.cart.quantityList.splice(index, 1);
                    userData.cart.sizeList.splice(index, 1);
                    userData.cart.toppingList.splice(index, 1);
                    userData.cart.priceList.splice(index, 1);

                    console.log("Updated cart data after item removal:", userData.cart);

                    const userDocRef = doc(db, "users", uid);
                    await setDoc(userDocRef, { cart: userData.cart }, { merge: true });

                    console.log("Customer cart updated successfully");
                } else {
                    console.log("Cart or one of the lists does not exist, or index is out of bounds. No update performed.");
                }
            } else {
                console.log("User does not exist or role is not 'Customer'. No update performed.");
            }
        } catch (error) {
            console.error("Error removing item from cart:", error);
            throw error;
        }
    }

    /**
     * Modifies the quantity of an item in the CustomerCart for a user with the role "Customer".
     *
     * This function fetches the cart data of a user from Firestore and modifies the quantity of the item
     * at the specified index, then updates the cart in Firestore.
     *
     * @param {string} uid - The unique identifier of the user.
     * @param {number} index - The index of the item in the cart whose quantity is to be modified.
     * @param {string} option - The modification option, either "increase" or "decrease".
     *
     * @throws Will throw an error if the update operation fails.
     */
    static async modifyItemQuantity(uid, index, option) {
        try {
            const userData = await CartController.getUserDocument(uid);
            console.log("Fetched user data:", userData);

            if (userData && userData.role === "Customer") {
                console.log("User is a customer. Preparing to modify item quantity in cart.");

                if (userData.cart && userData.cart.ProductList && userData.cart.quantityList &&
                    userData.cart.sizeList && userData.cart.toppingList && userData.cart.priceList &&
                    index < userData.cart.ProductList.length) {

                    if (option === "increase") {
                        userData.cart.quantityList[index] += 1;
                    } else if (option === "decrease") {
                        userData.cart.quantityList[index] = Math.max(1, userData.cart.quantityList[index] - 1);
                    } else {
                        console.log("Invalid option. Only 'increase' or 'decrease' are allowed.");
                        return;
                    }

                    console.log("Updated cart data after quantity modification:", userData.cart);

                    const userDocRef = doc(db, "users", uid);
                    await setDoc(userDocRef, { cart: userData.cart }, { merge: true });

                    console.log("Customer cart updated successfully");
                } else {
                    console.log("Cart or one of the lists does not exist, or index is out of bounds. No update performed.");
                }
            } else {
                console.log("User does not exist or role is not 'Customer'. No update performed.");
            }
        } catch (error) {
            console.error("Error modifying item quantity in cart:", error);
            throw error;
        }
    }

    // Helper function to get user document from Firestore
    static async getUserDocument(uid) {
        const userDocRef = doc(db, "users", uid);
        const userDoc = await getDoc(userDocRef);
        return userDoc.exists() ? userDoc.data() : null;
    }

        /**
     * Deletes the entire cart for a user with the role "Customer".
     * 
     * This function removes the `cart` field from the user's document in Firestore,
     * effectively clearing the entire cart.
     *
     * @param {string} uid - The unique identifier of the user.
     * @throws Will throw an error if the delete operation fails.
     */
        static async deleteUserCart(uid) {
            try {
                const userData = await CartController.getUserDocument(uid);
                console.log("Fetched user data:", userData);
    
                if (userData && userData.role === "Customer") {
                    console.log("User is a customer. Preparing to delete cart.");
    
                    // Create an update that deletes the cart field
                    const userDocRef = doc(db, "users", uid);
                    await updateDoc(userDocRef, {
                        cart: deleteField() // Use deleteField() to remove the cart field
                    });
    
                    console.log("Customer cart deleted successfully");
                } else {
                    console.log("User does not exist or role is not 'Customer'. No deletion performed.");
                }
            } catch (error) {
                console.error("Error deleting customer cart:", error);
                throw error;
            }
        }
    
        // ... other methods
}

export default CartController;
