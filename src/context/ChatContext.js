import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect,useReducer,useState,useContext} from "react";
import { auth } from "../firebase/firebase-auth";
import { AuthContext } from "./AuthContext";

export const ChatContext=createContext()
export const ChatContextProvider=({children})=>{
    
    const {currentUser}=useContext(AuthContext);

    const INITIAL_STATE= {
        chatId:"null",
        user:{}
    }
    const chatReducer = (state,action)=>{
        switch(action.type){
            case "CHANGE_USER":
                return{
                    user: action.payLoad,
                    chatId:
                    currentUser.uid > action.payLoad.uid
                     ?currentUser.uid + action.payLoad.uid 
                    :action.payLoad.uid +currentUser.uid ,
                };
            default:
                return state;
        }
    };
     const[state,dispatch]= useReducer(chatReducer,INITIAL_STATE);
    return(
    <ChatContext.Provider value={{data:state,dispatch}}>
        {children}
    </ChatContext.Provider>
    );
};