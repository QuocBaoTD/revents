import { initializeApp } from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { ReCaptchaV3Provider, initializeAppCheck } from "firebase/app-check";

declare global {
  //eslint-disable-next-line no-var
  var FIREBASE_APPCHECK_DEBUG_TOKEN: boolean | string | undefined;
}

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "re-events-e6b55.firebaseapp.com",
  projectId: "re-events-e6b55",
  databaseURL:
    "https://re-events-e6b55-default-rtdb.asia-southeast1.firebasedatabase.app",
  storageBucket: "re-events-e6b55.appspot.com",
  messagingSenderId: "698081827147",
  appId: "1:698081827147:web:ffb345f8349d802229b0ce",
};
//add the debug token to allow us to use the app over
if (import.meta.env.DEV) {
  self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("6Lf0FVwpAAAAAOIu75vYxZ15hlSB8p1DHB6fxFUo"),
  isTokenAutoRefreshEnabled: true,
});

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const fb = getDatabase(app);
