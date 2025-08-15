import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCEVYDMEZPeznp3oGksc8eqAtRy67lxlz8",
    authDomain: "agriverse-bcdea.firebaseapp.com",
    projectId: "agriverse-bcdea",
    storageBucket: "agriverse-bcdea.firebasestorage.app",
    messagingSenderId: "146221403488",
    appId: "1:146221403488:web:4a54147ef74f82352ee205",
    measurementId: "G-ZMX99XWVVL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

export { auth, provider, signInWithPopup };
