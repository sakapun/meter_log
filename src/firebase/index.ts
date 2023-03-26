// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import {getFirestore} from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyADR9Za7h5tpgne0bQ0JU7mWiH8NaJ1w5g",
  authDomain: "meter-log.firebaseapp.com",
  projectId: "meter-log",
  storageBucket: "meter-log.appspot.com",
  messagingSenderId: "885256576095",
  appId: "1:885256576095:web:e84c05b4b36b62e9f00fea",
  measurementId: "G-EV8B81Y94J"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(firebaseApp);
}

export {firebaseApp, analytics, auth, db}

