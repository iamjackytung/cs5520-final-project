import { collection, setDoc, getDoc, doc } from "firebase/firestore";
import { auth, firestore } from "./firebase-setup";
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

export async function getMyMentors() {
  try {
    if (!auth.currentUser.uid) {
      console.log("No user is signed in");
      return null;
    }
    const usersCollection = collection(firestore, "users");
    const userDocRef = doc(usersCollection, auth.currentUser.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      console.log("User document does not exist.");
      return;
    }

    const userMentors = userDocSnap.data().mentors;
    const mentorDetailsList = [];

    for (const mentorID of userMentors) {
      const mentorDocRef = doc(usersCollection, mentorID);
      const mentorDocSnap = await getDoc(mentorDocRef);

      if (mentorDocSnap.exists()) {
        const mentorData = mentorDocSnap.data();
        mentorDetailsList.push({
          id: mentorDocSnap.id,
          firstName: mentorData.firstName,
          lastName: mentorData.lastName,
          profilePictureUrl: mentorData.profilePictureUrl,
          jobTitle: mentorData.jobTitle,
        });
      }
    }
    return mentorDetailsList;
  } catch (error) {
    console.log("Error fetching mentors:", error);
  }
}
