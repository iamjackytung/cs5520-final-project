import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // To import a Firebase service, use this pattern: import {} from 'firebase/<service>'
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import React from "react";
import { getStorage } from "firebase/storage";
import {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
} from "@env";

// import { getAnalytics } from "firebase/analytics";
//Your web app's Firebase configuration. // Copy this object from Firebase console
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
};
const myApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const firestore = getFirestore(myApp);
export const auth = initializeAuth(myApp, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const storage = getStorage(myApp);
