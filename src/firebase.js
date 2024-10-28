// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Import getAuth


const firebaseConfig = {
    apiKey: "AIzaSyAaFI-IhyfHwuRsyfN_ZQz3ji0nbJ8emCA",
    authDomain: "chat-apppp-c388d.firebaseapp.com",
    projectId: "chat-apppp-c388d",
    storageBucket: "chat-apppp-c388d.appspot.com",
    messagingSenderId: "1001600396443",
    appId: "1:1001600396443:web:def768bfd2d2acd9682a3e",
    measurementId: "G-6S455E6SGS"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialize auth




export { auth };
