import { initializeApp } from "firebase/app";
import 'firebase/firestore';
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "re-events-e6b55.firebaseapp.com",
  projectId: "re-events-e6b55",
  storageBucket: "re-events-e6b55.appspot.com",
  messagingSenderId: "698081827147",
  appId: "1:698081827147:web:ffb345f8349d802229b0ce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)