import { app, db, storage } from "../config/firebase-config";
import { collection, doc, setDoc, serverTimestamp,getDoc,updateDoc } from "firebase/firestore"; 
import { convertToDateWithNoon } from "./Utils";
import Voucher from "../model/Voucher";
class VoucherController {
    /**
     * Creates a new voucher in the Firestore database.
     * 
     * @param {Voucher} voucher - The voucher object containing all necessary fields.
     * @returns {Promise<void>} - A promise that resolves when the voucher is successfully created.
     * @throws {Error} - Throws an error if the voucher creation fails.
     */
    static async createVoucher(voucher) {
        try {
            // Reference to the "vouchers" collection
            const voucherRef = doc(collection(db, "vouchers"), voucher.VoucherID);
            
            // Create the voucher document in Firestore
            await setDoc(voucherRef, {
                VoucherID: voucher.VoucherID,
                Content: voucher.Content,
                Discount: voucher.Discount,
                IsExpired: voucher.IsExpired,
                IsActive: voucher.IsActive,
                DateExpired: voucher.DateExpired// Use the provided date or the current timestamp
            });

            console.log("Voucher created successfully with ID:", voucher.VoucherID);
        } catch (error) {
            console.error("Error creating voucher:", error);
            throw error; // Throw the error for handling in the caller function
        }
    }
    /**
     * Fetches a voucher from the Firestore database by its VoucherID.
     * 
     * @param {string} voucherID - The ID of the voucher to retrieve.
     * @returns {Promise<Voucher>} - A promise that resolves to the voucher object if found.
     * @throws {Error} - Throws an error if the voucher retrieval fails or the voucher is not found.
     */
    static async fetchVoucherById(voucherID) {
        try {
            // Reference to the specific voucher document
            const voucherRef = doc(db, "vouchers", voucherID);

            // Fetch the document
            const voucherDoc = await getDoc(voucherRef);

            if (!voucherDoc.exists()) {
                console.log("Voucher is not found")
                return null; // Return null if voucher not found
            }
            // Return the data as a Voucher object
            const voucherData = voucherDoc.data();
            return new Voucher(
                voucherData.VoucherID,
                voucherData.Content,
                voucherData.Discount,
                voucherData.IsExpired,
                voucherData.IsActive,
                voucherData.DateExpired
            );
        } catch (error) {
            console.error("Error fetching voucher:", error);
            throw error;
        }
    }

    /**
     * Checks if a voucher is expired and updates the IsExpired field if necessary.
     * 
     * @param {string} voucherID - The ID of the voucher to check.
     * @returns {Promise<boolean>} - A promise that resolves to true if the voucher is still valid, or false if it is expired.
     * @throws {Error} - Throws an error if the voucher retrieval or update fails.
     */
    static async checkVoucherExpiration(voucherID) {
        try {
            // Fetch the voucher
            const voucher = await this.fetchVoucherById(voucherID);

            if (!voucher) {
                throw new Error(`Voucher with ID ${voucherID} not found`);
            }

            // Check if the voucher is already marked as expired
            if (voucher.IsExpired) {
                return false; // Return false if the voucher is already expired
            }

            const currentDate = new Date();
            const expirationDate = new Date(voucher.DateExpired);

            // Ensure expirationDate is a valid Date object
            if (isNaN(expirationDate.getTime())) {
                throw new Error(`Invalid expiration date for voucher ${voucherID}`);
            }
            console.log(currentDate)
            console.log(expirationDate)

            if (currentDate > expirationDate) {
                // If expired, update the IsExpired field to true
                const voucherRef = doc(db, "vouchers", voucherID);
                await updateDoc(voucherRef, {
                    IsExpired: true
                });

                console.log(`Voucher with ID ${voucherID} has been updated to expired.`);
                return false; // Return false as the voucher is now expired
            }
            if (currentDate < expirationDate){
                console.log(`Voucher with ID ${voucherID} is still valid.`);
                return true
            }
             else {
                console.log(`Voucher with ID ${voucherID} is something wrong`);
                return true; // Return true as the voucher is still valid
            }
        } catch (error) {
            console.error("Error checking or updating voucher expiration:", error);
            throw error;
        }
    }
}

export default VoucherController;
