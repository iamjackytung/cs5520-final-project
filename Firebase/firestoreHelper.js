import { collection, addDoc } from "firebase/firestore";
export async function writeToDB(goal) {
  try {
    await addDoc();
  } catch (err) {
    console.log(err);
  }
}
