import { app, db } from "../config/firebase-config";
import { collection, doc, addDoc, setDoc, getDoc, updateDoc, serverTimestamp, getDocs, query, where } from "firebase/firestore"; 
import Order from "../model/Order";
import { arrayUnion } from "firebase/firestore";
import Voucher from "../model/Voucher";
import VoucherController from "../controller/Voucher";
class OrderController 
{
       /**
     * Creates a new order in the "orders" collection and updates the user's order list in the "users" collection.
     *
     * @param {string} uid - The unique identifier of the user.
     * @param {Object} cart - The cart data to be included in the order.
     * @param {Object} paymentInfo - Payment-related information.
     * @param {Object} contactInfo - Contact details for the order, such as shipping address and phone number.
     * @param {number} totalPrice - The total price of the order.
     * 
     * @throws Will throw an error if the creation or update operation fails.
     */
    static async createOrder(uid, cart, paymentInfo, contactInfo, totalPrice) 
    {
        try 
        {
            console.log("Total price in order: " + totalPrice)
            // Prepare the order data
            const orderList = cart.ProductList.map((productID, index) => ({
                ProductID: productID,
                Quantity: cart.quantityList[index],
                Size: cart.sizeList[index],
                Toppings: cart.toppingList[index],
                Price: cart.priceList[index]
            }));

            // Create an instance of the Order class with the provided total price
            const newOrderInstance = new Order(null, orderList, "Pending", new Date(), null,  paymentInfo, contactInfo, totalPrice);
            console.log("New Order Instance:", newOrderInstance);

            // Add a new order to the "orders" collection with Firestore-generated ID
            const orderDocRef = await addDoc(collection(db, "orders"), { 
                ...newOrderInstance, 
            });

            // Update the user's order array with the new OrderID directly
            const userDocRef = doc(db, "users", uid);
            
            // Update the user's orders in Firestore using the orderDocRef.id
            await updateDoc(userDocRef, 
            {
                Order: arrayUnion(orderDocRef.id) // Use arrayUnion to add the new order ID
            });

            console.log("Order created and user order list updated successfully:", orderDocRef.id);
        } catch (error) 
        {
            console.error("Error creating order and updating user order list:", error);
            throw error;
        }
    }

/**
 * Hàm này trả về mảng class Order 
 * Retrieves the user's order array from the "users" collection and returns an array of Order objects.
 *
 * @param {string} uid - The unique identifier of the user.
 * @returns {Promise<Order[]>} An array of Order objects, or an empty array if not found.
 */
static async getUserOrders(uid) 
{
    try {
        const userDocRef = doc(db, "users", uid);
        const userDoc = await getDoc(userDocRef);
        
        // Check if user document exists and contains Order IDs
        if (userDoc.exists() && userDoc.data().Order) {
            const orderIDs = userDoc.data().Order;
            const orders = await Promise.all(orderIDs.map(async (orderId) => {
                const orderDocRef = doc(db, "orders", orderId);
                const orderDoc = await getDoc(orderDocRef);
                
                // If order document exists, create an Order instance
                if (orderDoc.exists()) {
                    const orderData = orderDoc.data();
                    
                    return new Order(
                        orderId, // Pass the Firestore-generated OrderID
                        orderData['orderList'], // Use bracket notation
                        orderData['orderStatus'], // Use bracket notation
                        orderData['dateCreated'].toDate(), // Use bracket notation
                        orderData['dateShipped'] ? orderData['dateShipped'].toDate() : null, // Check if dateShipped exists
                        orderData['paymentInfo'], // Use bracket notation
                        orderData['contactInfo'], // Use bracket notation
                        orderData['totalPrice'] // Use bracket notation
                    );
                }
                return null; // Return null if the order doesn't exist
            }));
            
            // Filter out any null values from the orders array
            return orders.filter(order => order !== null);
        }
        
        return []; // Return an empty array if no orders found
    } catch (error) {
        console.error("Error retrieving user orders:", error);
        throw error;
    }
}


    
        /**
     * Dùng hàm này để cập nhật contact address field trong user, đồng thời cập nhật bên order. 
     * Updates the contact address information for a user in the "users" collection and optionally in the orders.
     *
     * @param {string} uid - The unique identifier of the user.
     * @param {Object} contactAddress - The contact address information to be updated.
     * @param {string} contactAddress.Name - The name of the contact person.
     * @param {string} contactAddress.Email - The email address for communication.
     * @param {number} contactAddress.PhoneNumber - The phone number for contact.
     * @param {string} contactAddress.Address - The shipping or billing address.
     * @param {string} orderId - ID of the order to update with the new contact information.
     * 
     * @throws Will throw an error if the update operation fails.
     */
    static async EnterContactInfo(uid, contactAddress, orderId) 
    {
        try {
            const userDocRef = doc(db, "users", uid);

            // Update the user's contact information
            await updateDoc(userDocRef, {
                ContactInfo: arrayUnion(contactAddress) // Adds new contact info to the array
            });

            console.log("User contact address updated successfully");

            // If an order ID is provided, update the contact information in the order as well
            if (orderId) {
                const orderDocRef = doc(db, "orders", orderId);
                await updateDoc(orderDocRef, {
                    contactInfo: contactAddress // Update order with the specific contact info
                });

                console.log("Order contact information updated successfully");
            }
        } catch (error) {
            console.error("Error updating contact address:", error);
            throw error;
        }
    }

//     /**
//      * Allows the user to select or enter a shipping address.
//      *
//      * @param {string} uid - The unique identifier of the user.
//      * @param {Object} newAddress - Optional. The new address entered by the user.
//      * 
//      * @returns {Promise<Object>} - Returns the selected or newly entered address.
//      * 
//      * @throws Will throw an error if the retrieval or update operation fails.
//      */
//     static async chooseAddress(uid, newAddress = null) {
//         try {
//             const userDocRef = doc(db, "users", uid);
//             const userDoc = await getDoc(userDocRef);

//             if (!userDoc.exists()) {
//                 throw new Error("User not found");
//             }

//             const userData = userDoc.data();
//             const savedAddresses = userData.SavedAddresses || []; // Assume you have a SavedAddresses field in your user data

//             if (newAddress) {
//                 // If a new address is provided, update the user's saved addresses
//                 savedAddresses.push(newAddress);
//                 await updateDoc(userDocRef, {
//                     SavedAddresses: savedAddresses
//                 });
//                 return newAddress; // Return the newly entered address
//             }

//             // If no new address is provided, allow the user to select from saved addresses
//             // Here you can implement logic to prompt the user to select an address
//             // For simplicity, let's just return the first saved address as an example
//             return savedAddresses.length > 0 ? savedAddresses[0] : null; // Return the first saved address or null if none exist
//         } catch (error) {
//             console.error("Error choosing address:", error);
//             throw error;
//         }
//     }


    /**
         * Lets the user apply a discount voucher to their order.
         * Validates the voucher code and applies the discount if valid.
         *
         * @param {string} uid - The unique identifier of the user.
         * @param {string} orderId - The unique identifier of the order.
         * @param {string} voucherCode - The discount voucher code to apply.
         * @throws Will throw an error if the voucher code is invalid or the update operation fails.
         */
    static async applyVoucher(uid, orderId, voucherCode) 
    {
        try {
            // Fetch the voucher by ID
            const voucher = await VoucherController.fetchVoucherById(voucherCode);
            
            if (!voucher) {
                throw new Error("Invalid voucher code");
            }

            // Check if the voucher is expired
            const isValid = await VoucherController.checkVoucherExpiration(voucher.VoucherID);
            if (!isValid) {
                throw new Error("Voucher is expired");
            }

            // Fetch the order document to update the total price
            const orderDocRef = doc(db, "orders", orderId);
            const orderDoc = await getDoc(orderDocRef);

            if (!orderDoc.exists()) {
                throw new Error("Order not found");
            }

            const orderData = orderDoc.data();

            // Calculate the discount amount
            const discountAmount = (orderData.totalPrice * voucher.Discount) / 100;
            const newTotalPrice = orderData.totalPrice - discountAmount;

            // Update the order with the new total price and applied voucher code
            await updateDoc(orderDocRef, {
                totalPrice: newTotalPrice,
                AppliedVoucher: voucher.VoucherID // Optionally store the applied voucher code
            });

            console.log(`Voucher ${voucherCode} applied successfully. New total price: $${newTotalPrice.toFixed(2)}`);
        } catch (error) {
            console.error("Error applying voucher:", error);
            throw error;
        }
    }

}

export default OrderController;
