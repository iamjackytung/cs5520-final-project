import { collection, setDoc, getDoc, updateDoc, doc } from "firebase/firestore";
import { auth, firestore } from "./firebase-setup";
import * as ImagePicker from "expo-image-picker";
export async function writeToDB(userData) {
  console.log(userData);
  try {
    // console.log(userData.uid);
    const newDoc = await setDoc(doc(firestore, "users", userData.uid), {
      ...userData,
    });
  } catch (err) {
    console.log(err);
  }
}

export async function updateProfilePic(profilePicUrl) {
  console.log(profilePicUrl);
  try {
    const newDoc = doc(firestore, "users", auth.currentUser.uid);

    await updateDoc(newDoc, {
      profilePictureUrl: profilePicUrl,
    });
  } catch (err) {
    console.log(err);
  }
}

// export async function getImageFromLibrary() {
//   let mediaPermStatus = await ImagePicker.getMediaLibraryPermissionsAsync();
//   // console.log(mediaPermStatus);
//   if (mediaPermStatus.granted) {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.All,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });
//     if (!result.canceled) return result.assets[0].uri;
//     else {
//       console.log("failure. Empty Avatar used instead.");
//       return "https://i0.wp.com/rouelibrenmaine.fr/wp-content/uploads/2018/10/empty-avatar.png?ssl=1";
//     }
//   } else
//     mediaPermStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
//   return "https://i0.wp.com/rouelibrenmaine.fr/wp-content/uploads/2018/10/empty-avatar.png?ssl=1";
// }

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
        mentorDetailsList.push(mentorData);
      }
    }
    return mentorDetailsList;
  } catch (error) {
    console.log("Error fetching mentors:", error);
  }
}
