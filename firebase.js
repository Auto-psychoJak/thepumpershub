// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnziUkRX7Je40tpdM_za3K1K8dcEoLEU8",
  authDomain: "pumpershubmobile.firebaseapp.com",
  projectId: "pumpershubmobile",
  storageBucket: "pumpershubmobile.appspot.com",
  messagingSenderId: "138004036298",
  appId: "1:138004036298:web:007a5d08219e3a793c1233"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

export {app, auth, db };