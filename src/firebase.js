// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCGcCPID7VJ0b4yy7z6h_UYf4-k_7eH5rw",
  authDomain: "studytimer-7b0e7.firebaseapp.com",
  projectId: "studytimer-7b0e7",
  storageBucket: "studytimer-7b0e7.appspot.com",
  messagingSenderId: "608135715604",
  appId: "1:608135715604:web:example_app_id"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
