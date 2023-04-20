import {
  collection,
  setDoc,
  getDoc,
  addDoc,
  doc,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { auth, firestore } from "./firebase-setup";
import * as ImagePicker from "expo-image-picker";
export async function writeToDB(userData) {
  try {
    // console.log(userData.uid);
    // await addDoc(uid, ...signUpData);
    // await addDoc(collection(...signUpData, uid)
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

export async function addBooking(info) {
  try {
    const docRef = await addDoc(collection(firestore, "bookings"), {...info, organizer_id: auth.currentUser.uid});
    console.log("New booking written with ID: ", docRef.id);
    return true;
  } catch (err) {
    console.log("Error adding new booking: ", err);
    return false;
  }
}

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

export async function findNewMentors(searchInput) {
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

    const myMentors = userDocSnap.data().mentors;

    const searchToken = searchInput.trim().toLowerCase();

    const allUsersSnap = await getDocs(usersCollection);

    const potentialMentors = [];

    allUsersSnap.forEach((doc) => {
      if (
        doc.exists() &&
        !myMentors.includes(doc.id) &&
        doc.id !== auth.currentUser.uid
      ) {
        const userData = doc.data();
        if (userData.firstName && userData.lastName) {
          const fullName = `${userData.firstName.toLowerCase()} ${userData.lastName.toLowerCase()}`;
          if (fullName.includes(searchToken)) {
            potentialMentors.push(userData);
          }
        }
      }
    });

    return potentialMentors;
  } catch (error) {
    console.log("Error finding new mentors:", error);
  }
}

export async function connectWithMentor(mentorId) {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      console.log("No user is signed in");
      return;
    }

    const usersCollection = collection(firestore, "users");

    const userDocRef = doc(usersCollection, currentUser.uid);
    const mentorDocRef = doc(usersCollection, mentorId);

    const userDocSnap = await getDoc(userDocRef);
    const mentorDocSnap = await getDoc(mentorDocRef);

    if (!userDocSnap.exists() || !mentorDocSnap.exists()) {
      console.log("User or Mentor document does not exist.");
      return;
    }

    const userData = userDocSnap.data();
    const mentorData = mentorDocSnap.data();

    if (!userData.mentors.includes(mentorId)) {
      userData.mentors.push(mentorId);
      await updateDoc(userDocRef, userData);
    }

    if (!mentorData.mentees.includes(currentUser.uid)) {
      mentorData.mentees.push(currentUser.uid);
      await updateDoc(mentorDocRef, mentorData);
    }
  } catch (error) {
    console.log("Error connecting with mentor:", error);
  }
}

export async function disconnectWithMentor(mentorId) {
  try {
    if (!auth.currentUser.uid) {
      console.log("No user is signed in");
      return null;
    }
    const usersCollection = collection(firestore, "users");
    const currentUserDocRef = doc(usersCollection, auth.currentUser.uid);
    const currentUserDocSnap = await getDoc(currentUserDocRef);
    if (!currentUserDocSnap.exists()) {
      console.log("User document does not exist.");
      return;
    }
    const currentUserData = currentUserDocSnap.data();
    const myMentors = currentUserData.mentors || [];
    const myMentees = currentUserData.mentees || [];
    const updatedMyMentors = myMentors.filter((id) => id !== mentorId);
    await updateDoc(currentUserDocRef, { mentors: updatedMyMentors });
    const mentorDocRef = doc(usersCollection, mentorId);
    const mentorDocSnap = await getDoc(mentorDocRef);
    if (!mentorDocSnap.exists()) {
      console.log("Mentor document does not exist.");
      return;
    }
    const mentorData = mentorDocSnap.data();
    const mentorMentees = mentorData.mentees || [];
    const updatedMentorMentees = mentorMentees.filter(
      (id) => id !== auth.currentUser.uid
    );
    await updateDoc(mentorDocRef, { mentees: updatedMentorMentees });
  } catch (error) {
    console.log("Error disconnecting with mentor:", error);
  }
}
