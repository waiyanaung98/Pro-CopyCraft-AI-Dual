import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Using the configuration provided by the user
const firebaseConfig = {
  apiKey: "AIzaSyAp8PU5aZWa8nh_ATt9ZJcxrBL4njMA1aw",
  authDomain: "copycraft---launched.firebaseapp.com",
  projectId: "copycraft---launched",
  storageBucket: "copycraft---launched.firebasestorage.app",
  messagingSenderId: "1070830093352",
  appId: "1:1070830093352:web:123d7d52dca78fba4d611d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);