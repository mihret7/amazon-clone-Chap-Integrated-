import { setDoc, doc, getDoc} from "firebase/firestore";
import { db } from "./firebase"; 

export const saveCartToFirebase = async (uid, basket) => {
  try {
    console.log("Saving basket to Firestore:", basket); // Log before saving
    await setDoc(doc(db, "basket", uid), {
      items: basket,
    });
  } catch (err) {
    console.error("Error saving cart to Firestore:", err);
  }
};


export const fetchCartFromFirebase = async (uid) => {
  const basketDoc = await getDoc(doc(db, "basket", uid));
  if (basketDoc.exists()) {
    return basketDoc.data().items || [];
  }
  return [];
};
