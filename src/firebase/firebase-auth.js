// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAd_Ze-eYEMLp5DURicjLLiTOXT-NcMFiY",
  authDomain: "campus-connect-c520b.firebaseapp.com",
  projectId: "campus-connect-c520b",
  storageBucket: "campus-connect-c520b.appspot.com",
  messagingSenderId: "632273828622",
  appId: "1:632273828622:web:75e265a886ecc542c7f55f",
  measurementId: "G-354TBWF03W"
};

const app = initializeApp(firebaseConfig);
const auth  = getAuth();

export  { app , auth };