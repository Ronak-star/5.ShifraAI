
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "ai-project-9fd99.firebaseapp.com",
  projectId: "ai-project-9fd99",
  storageBucket: "ai-project-9fd99.firebasestorage.app",
  messagingSenderId: "571191284280",
  appId: "1:571191284280:web:9224cd79b108339c8b8ccd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth, provider}



