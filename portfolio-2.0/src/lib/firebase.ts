import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAxIasJw8rjS2HQ5W4uUU2uMLfbWxarErE",
  authDomain: "portfolio-website-d03b8.firebaseapp.com",
  projectId: "portfolio-website-d03b8",
  storageBucket: "portfolio-website-d03b8.firebasestorage.app",
  messagingSenderId: "674417423624",
  appId: "1:674417423624:web:58e3ad856a71b13c3428bd",
  measurementId: "G-KN65N0ESTX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };
