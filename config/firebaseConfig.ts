import { getStorage } from "@firebase/storage";
import { initializeApp } from "firebase/app";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  getAuth,
} from "firebase/auth";
import { getFirestore, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: 'blogging-b4080',
  storageBucket: 'blogging-b4080.appspot.com',
  messagingSenderId: '1088680197806',
  appId: '1:1088680197806:web:cd43e043b2802bcf83373f',
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const facebookAuth = new FacebookAuthProvider();

export { db, storage, serverTimestamp, auth, provider, facebookAuth };
