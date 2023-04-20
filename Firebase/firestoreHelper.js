import {
  collection,
  setDoc,
  getDoc,
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

export async function getMeetings() {
  // const currentUser = auth.currentUser;
  // console.log("jGmVqzsHdWRBL73Vnj1xvPiZkte2");
  const bookingCollection = collection(firestore, "bookings");
  const q = query(
    bookingCollection,
    where("attendee_ids", "array-contains", "jGmVqzsHdWRBL73Vnj1xvPiZkte2")
  );
  const querySnapshot = await getDocs(q);
  const MeetingsList = {};

  //  [
  //    {"day": "2017-08-12", "name": "Item for 2017-08-12 #0"},
  //    {"day": "2017-08-12", "name": "Item for 2017-08-12 #1"}
  //  ]
  const getMeetingList = async (querySnapshot) => {
    try {
      for (const booking of querySnapshot.docs) {
        // console.log(typeof booking.data().start_date.);
        const time = booking
          .data()
          .start_date.toDate()
          .toISOString()
          .split("T")[1]
          .split(".")[0];

        const date = booking.data().start_date.toDate();
        const simpleDate = date.toISOString().split("T")[0];
        const usersCollection = collection(firestore, "users");
        const meetingUser1 = booking.data().attendee_ids[0];
        const meetingUser2 = booking.data().attendee_ids[1];
        const meetingUser1DocRef = doc(usersCollection, meetingUser1);
        const meetingUser2DocRef = doc(usersCollection, meetingUser2);
        const meetingUser1DocSnap = await getDoc(meetingUser1DocRef);
        const meetingUser2DocSnap = await getDoc(meetingUser2DocRef);
        const user1firstName = meetingUser1DocSnap.data().firstName;
        const user2firstName = meetingUser2DocSnap.data().firstName;
        const organizingID = booking.data().organizer_id;
        // console.log(user1firstName + " " + user2firstName);
        const location = booking.data().location;
        if (!MeetingsList[simpleDate]) {
          MeetingsList[simpleDate] = [];
        }
        MeetingsList[simpleDate].push({
          organizingID: organizingID,
          day: simpleDate,
          name:
            user1firstName +
            " and " +
            user2firstName +
            " meeting \n" +
            location +
            "\n @ " +
            time,
        });
      }
    } catch (error) {
      console.log("Error fetching mentors:", error);
    }
    return MeetingsList;
  };
  return getMeetingList(querySnapshot);
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
