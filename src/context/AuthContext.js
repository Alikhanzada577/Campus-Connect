import {getDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect,useState } from "react";
import { auth, db } from "../firebase/firebase-auth";

export  const AuthContext=createContext()
export const AuthContextProvider=({children})=>{
  const[currentUser,setCurrentUser]=useState({});
 
  useEffect(()=>{
    const unsub=onAuthStateChanged(auth, async (user)=>{
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        const userData = userDoc.data();
        setCurrentUser({ ...user, ...userData }); // Merge user object with data from Firestore
      } else {
        setCurrentUser(null);
      }
    });
    return ()=>{
      unsub();
    };
  },[]);
  console.log(currentUser)
  return(
    <AuthContext.Provider value={{currentUser}}>
      {children}
    </AuthContext.Provider>
  );
};
