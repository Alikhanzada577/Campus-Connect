import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAd_Ze-eYEMLp5DURicjLLiTOXT-NcMFiY",
  authDomain: "campus-connect-c520b.firebaseapp.com",
  projectId: "campus-connect-c520b",
  storageBucket: "campus-connect-c520b.appspot.com",
  messagingSenderId: "632273828622",
  appId: "1:632273828622:web:75e265a886ecc542c7f55f",
  measurementId: "G-354TBWF03W"
};

export const app = initializeApp(firebaseConfig);
export const auth  = getAuth();
export const storage = getStorage();
export const db = getFirestore(app);