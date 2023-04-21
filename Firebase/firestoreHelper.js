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
  or,
  onSnapshot,
} from "firebase/firestore";
import { auth, firestore } from "./firebase-setup";
import { sendPushNotification } from "../contexts/PushTokenContext";

export async function writeToDB(userData) {
  try {
    const newDoc = await setDoc(doc(firestore, "users", userData.uid), {
      ...userData,
    });
  } catch (err) {
    console.log(err);
  }
}

export async function saveUserData(data) {
  try {
    await setDoc(doc(firestore, "users", auth.currentUser.uid), data, {
      merge: true,
    });
  } catch (err) {
    console.log("Save user data error: ", err);
  }
}

export async function getCurrentUserData() {
  try {
    const docRef = doc(firestore, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function userIsMentor() {
  try {
    const docRef = doc(firestore, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    return data.isMentor;
  } catch (err) {
    console.log(err);
  }
}

export async function userIsMentee() {
  try {
    const docRef = doc(firestore, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    return data.isMentee;
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
    or(
      where("organizer_id", "==", auth.currentUser.uid),
      where("attendee_ids", "array-contains", auth.currentUser.uid)
    )
  );
  const querySnapshot = await getDocs(q);
  const MeetingsList = {};

  const getMeetingList = async (querySnapshot) => {
    try {
      for (const booking of querySnapshot.docs) {
        // console.log(typeof booking.data().start_date.);
        const time = booking.data().start_date.to; // useEffect(() => {
        //   async function fetchMyMentors() {
        //     const mentors = await getMyMentors();
        //     setMyMentors(mentors);
        //   }

        //   fetchMyMentors();
        // }, []);n = booking.data().location;
        if (!MeetingsList[simpleDate]) {
          MeetingsList[simpleDate] = [];
        }

        MeetingsList[simpleDate].push({
          organizerID: organizerID,
          day: simpleDate,
          name: namesOfAttendees + " meeting \n@" + location + " - " + time,
        });
      }
    } catch (error) {
      console.log("Error fetching mentors:", error);
    }
    return MeetingsList;
  };
  return getMeetingList(querySnapshot);
}

export async function addBooking(info) {
  try {
    const docRef = await addDoc(collection(firestore, "bookings"), {
      ...info,
      organizer_id: auth.currentUser.uid,
    });
    console.log("New booking written with ID: ", docRef.id);
    return true;
  } catch (err) {
    console.log("Error adding new booking: ", err);
    return false;
  }
}

export function getMyMentors(callback) {
  try {
    if (!auth.currentUser.uid) {
      console.log("No user is signed in");
      return null;
    }
    const usersCollection = collection(firestore, "users");
    const userDocRef = doc(usersCollection, auth.currentUser.uid);

    const unsubscribe = onSnapshot(userDocRef, async (userDocSnap) => {
      if (!userDocSnap.exists()) {
        console.log("User document does not exist.");
        return;
      }

      const userMentors = userDocSnap.data().mentors;
      const userOutboundRequests = userDocSnap.data().outboundRequests;
      const mentorDetailsList = [];

      for (const mentorID of userMentors) {
        const mentorDocRef = doc(usersCollection, mentorID);
        const mentorDocSnap = await getDoc(mentorDocRef);

        if (mentorDocSnap.exists()) {
          const mentorData = mentorDocSnap.data();
          mentorDetailsList.push({ ...mentorData, outboundRequest: false });
        }
      }
      for (const mentorID of userOutboundRequests) {
        const mentorDocRef = doc(usersCollection, mentorID);
        const mentorDocSnap = await getDoc(mentorDocRef);

        if (mentorDocSnap.exists()) {
          const mentorData = mentorDocSnap.data();
          mentorDetailsList.push({ ...mentorData, outboundRequest: true });
        }
      }
      callback(mentorDetailsList);
    });

    return unsubscribe;
  } catch (error) {
    console.log("Error fetching mentors:", error);
  }
}

export function getMyMentees(callback) {
  try {
    if (!auth.currentUser.uid) {
      console.log("No user is signed in");
      return null;
    }
    const usersCollection = collection(firestore, "users");
    const userDocRef = doc(usersCollection, auth.currentUser.uid);

    const unsubscribe = onSnapshot(userDocRef, async (userDocSnap) => {
      if (!userDocSnap.exists()) {
        console.log("User document does not exist.");
        return;
      }

      const userMentees = userDocSnap.data().mentees;
      const menteeDetailsList = [];

      for (const menteeID of userMentees) {
        const menteeDocRef = doc(usersCollection, menteeID);
        const menteeDocSnap = await getDoc(menteeDocRef);

        if (menteeDocSnap.exists()) {
          const menteeData = menteeDocSnap.data();
          menteeDetailsList.push(menteeData);
        }
      }
      callback(menteeDetailsList);
    });

    return unsubscribe;
  } catch (error) {
    console.log("Error fetching mentees:", error);
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

    const myOutboundRequests = userDocSnap.data().outboundRequests;

    const searchToken = searchInput.trim().toLowerCase();

    const allUsersSnap = await getDocs(usersCollection);

    const potentialMentors = [];

    allUsersSnap.forEach((doc) => {
      if (
        doc.exists() &&
        !myMentors.includes(doc.id) &&
        !myOutboundRequests.includes(doc.id) &&
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

    // Send a connection request to the mentor
    if (!mentorData.inboundRequests?.includes(currentUser.uid)) {
      mentorData.inboundRequests = mentorData.inboundRequests || [];
      mentorData.inboundRequests.push(currentUser.uid);
      await updateDoc(mentorDocRef, mentorData);
      sendPushNotification(
        mentorData.pushToken,
        "New Connection Request",
        `${userData.firstName} ${userData.lastName} wants to connect with you!`
      );
    }
    if (!userData.outboundRequests?.includes(mentorId)) {
      userData.outboundRequests = userData.outboundRequests || [];
      userData.outboundRequests.push(mentorId);
      await updateDoc(userDocRef, userData);
      sendPushNotification(
        userData.pushToken,
        "Connection Request Sent",
        `You sent a connection request to ${mentorData.firstName} ${mentorData.lastName}!`
      );
    }
  } catch (error) {
    console.log("Error connecting with mentor:", error);
  }
}

export async function acceptConnectionRequest(menteeId) {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      console.log("No user is signed in");
      return;
    }

    const usersCollection = collection(firestore, "users");

    const userDocRef = doc(usersCollection, currentUser.uid);
    const menteeDocRef = doc(usersCollection, menteeId);

    const userDocSnap = await getDoc(userDocRef);
    const menteeDocSnap = await getDoc(menteeDocRef);

    if (!userDocSnap.exists() || !menteeDocSnap.exists()) {
      console.log("User or Mentee document does not exist.");
      return;
    }

    const userData = userDocSnap.data();
    const menteeData = menteeDocSnap.data();

    // Remove the connection request from the mentor's list
    userData.inboundRequests = userData.inboundRequests.filter(
      (uid) => uid !== menteeId
    );

    // Remove the connection request from the mentee's list
    menteeData.outboundRequests = menteeData.outboundRequests.filter(
      (uid) => uid !== currentUser.uid
    );

    // Add the mentee to the mentor's list of mentees
    if (!userData.mentees.includes(menteeId)) {
      userData.mentees.push(menteeId);
    }

    // Add the mentor to the mentee's list of mentors
    if (!menteeData.mentors.includes(currentUser.uid)) {
      menteeData.mentors.push(currentUser.uid);
    }

    // Update the documents
    await updateDoc(userDocRef, userData);
    await updateDoc(menteeDocRef, menteeData);
    sendPushNotification(
      menteeData.pushToken,
      "Connection Request Accepted",
      `${userData.firstName} ${userData.lastName} has accepted your connection request!`
    );
  } catch (error) {
    console.log("Error accepting connection request:", error);
  }
}

export async function declineConnection(menteeId) {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      console.log("No user is signed in");
      return;
    }

    const usersCollection = collection(firestore, "users");

    const userDocRef = doc(usersCollection, currentUser.uid);
    const menteeDocRef = doc(usersCollection, menteeId);

    const userDocSnap = await getDoc(userDocRef);
    const menteeDocSnap = await getDoc(menteeDocRef);

    if (!userDocSnap.exists() || !menteeDocSnap.exists()) {
      console.log("User or Mentee document does not exist.");
      return;
    }

    const userData = userDocSnap.data();
    const menteeData = menteeDocSnap.data();

    // Remove the connection request from the mentor's list
    userData.inboundRequests = userData.inboundRequests.filter(
      (uid) => uid !== menteeId
    );

    // Remove the connection request from the mentee's list
    menteeData.outboundRequests = menteeData.outboundRequests.filter(
      (uid) => uid !== currentUser.uid
    );

    // Update the documents
    await updateDoc(userDocRef, userData);
    await updateDoc(menteeDocRef, menteeData);
    sendPushNotification(
      menteeData.pushToken,
      "Connection Request Denied",
      `${userData.firstName} ${userData.lastName} has denied your connection request.`
    );
  } catch (error) {
    console.log("Error denying connection request:", error);
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
    const myOutboundRequests = currentUserData.outboundRequests || [];
    const updatedMentorOutboundRequests = myOutboundRequests.filter(
      (id) => id !== mentorId
    );
    await updateDoc(currentUserDocRef, {
      outboundRequests: updatedMentorOutboundRequests,
    });
    const mentorInboundRequests = mentorData.inboundRequests || [];
    const updatedMentorInboundRequests = mentorInboundRequests.filter(
      (id) => id !== auth.currentUser.uid
    );
    await updateDoc(mentorDocRef, {
      inboundRequests: updatedMentorInboundRequests,
    });
    sendPushNotification(
      mentorData.pushToken,
      "Connection Disconnected",
      `${currentUserData.firstName} ${currentUserData.lastName} has disconnected from you.`
    );
  } catch (error) {
    console.log("Error disconnecting with mentor:", error);
  }
}

export async function disconnectWithMentee(menteeId) {
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
    const myMentees = currentUserData.mentees || [];
    const updatedMyMentees = myMentees.filter((id) => id !== menteeId);
    await updateDoc(currentUserDocRef, { mentees: updatedMyMentees });
    const menteeDocRef = doc(usersCollection, menteeId);
    const menteeDocSnap = await getDoc(menteeDocRef);
    if (!menteeDocSnap.exists()) {
      console.log("Mentee document does not exist.");
      return;
    }
    const menteeData = menteeDocSnap.data();
    const menteeMentors = menteeData.mentors || [];
    const updatedMenteeMentors = menteeMentors.filter(
      (id) => id !== auth.currentUser.uid
    );
    await updateDoc(menteeDocRef, { mentors: updatedMenteeMentors });
    sendPushNotification(
      menteeData.pushToken,
      "Connection Disconnected",
      `${currentUserData.firstName} ${currentUserData.lastName} has disconnected from you.`
    );
  } catch (error) {
    console.log("Error disconnecting with mentee:", error);
  }
}

export async function getInboundRequests() {
  try {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      console.log("No user is signed in");
      return [];
    }

    const userDocRef = doc(collection(firestore, "users"), currentUser.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      console.log("User document does not exist.");
      return [];
    }

    const userData = userDocSnap.data();
    const inboundRequests = userData.inboundRequests || [];

    const requestDocs = await Promise.all(
      inboundRequests.map((uid) =>
        getDoc(doc(collection(firestore, "users"), uid))
      )
    );

    return requestDocs.map((docSnap) => ({
      uid: docSnap.id,
      ...docSnap.data(),
    }));
  } catch (error) {
    console.log("Error fetching inbound requests:", error);
    return [];
  }
}
