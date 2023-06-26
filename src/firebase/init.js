// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkRDkra5i6cniayHtM-TMAVoO1gSKrCa0",
  authDomain: "fir-practise-40c3c.firebaseapp.com",
  projectId: "fir-practise-40c3c",
  storageBucket: "fir-practise-40c3c.appspot.com",
  messagingSenderId: "807182199992",
  appId: "1:807182199992:web:e5fe3e1e3253e0e882584d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
