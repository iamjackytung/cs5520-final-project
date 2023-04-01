import { collection, setDoc, doc } from "firebase/firestore";
import { firestore } from "./firebase-setup";
export async function writeToDB(userData) {
  console.log(userData);
  try {
    // await addDoc(uid, ...signUpData);
    // await addDoc(collection(...signUpData, uid)
    console.log(userData.uid);
    const newDoc = await setDoc(doc(firestore, "users", userData.uid), {
      userData,
    });
  } catch (err) {
    console.log(err);
  }
}

// export async function writeToDB(uid, signUpData) {
//   firestore()
//     .collection("users")
//     .doc(uid)
//     .set({
//       name: "Ada Lovelace",
//       age: 30,
//     })
//     .then(() => {
//       console.log("User added!");
//     });
// }
