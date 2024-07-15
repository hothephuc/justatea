import { app } from "../config/firebase-config";
import { collection, doc, setDoc, getDoc,getFirestore } from "firebase/firestore"; 
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

// the user pass into the addUserDoc function need to have all the attributes. Example: 
// const user = {
//     name: 'John Doe',
//     dob: '1990-01-01',
//     gender: 'male',
//     email: 'john.doe@example.com',
//     add: '123 Main St, Anytown, USA'
// };

export async function addUserDoc(user, uid){
    await setDoc(doc(db,"users",uid),{
        fullname: user.name,
        dob: user.dob,
        gender:user.gender,
        email: user.email,
        phone: user.phone,
        address: user.add
    });
}



// Function to upload product information and image (dont accept duplicate product name)
export async function uploadProductInfo(productInfo, imageFile) {
    try {
        // Determine tag type
        const tagType = getTagType(productInfo.category);

        console.log("tag type: " + tagType);
        // Construct storage path based on tag type and product name
        const storagePath = `photos/${tagType}/${productInfo.name}`;

        // Upload image file to Firebase Storage
        const storageRef = ref(storage, storagePath);
        const snapshot = await uploadBytes(storageRef, imageFile);

        // Get download URL of the uploaded image
        const imageUrl = await getDownloadURL(snapshot.ref);

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