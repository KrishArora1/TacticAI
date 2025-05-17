// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAtvQBltBZHxEaNRSHM6AXOXCS_N096aew",
  authDomain: "pharmdash-7d83e.firebaseapp.com",
  projectId: "pharmdash-7d83e",
  storageBucket: "pharmdash-7d83e.firebasestorage.app",
  messagingSenderId: "927805705816",
  appId: "1:927805705816:web:7737062dfe79d7f6eac42d",
  measurementId: "G-7MD1VWTXNV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, app };
