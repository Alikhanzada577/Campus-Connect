import React, { useContext } from 'react';
import { useState } from 'react';
import{doc,getDoc,setDoc,getDocs} from "firebase/firestore";
import {db} from "../../firebase/firebase-auth";
import { collection,query,where,updateDoc, serverTimestamp } from 'firebase/firestore';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const {currentUser}=useContext(AuthContext);
  const {dispatch}=useContext(ChatContext);

//   const handleSelectUser=(u)=>{
//   dispatch({type:"CHANGE_USER",payLoad:u})
//  }
  const handleSearch=async ()=>{
    const q = query(
      collection(db,"users"),
      where("displayName","==",username)
      );
 try{
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        setUser(doc.data());
    });
  }catch(err){
    setErr(true);
  }
  };

  const handleKey =(e)=>{
    e.code === "Enter" && handleSearch();
  };
  const handleSelect =async()=>{
    //checks whether is their any previous chat of them exist or not (in firestore),if not then it will create new chat 
    const combinedId =
     currentUser.uid > user.uid
      ?currentUser.uid + user.uid 
     :user.uid +currentUser.uid ;
    console.log("Combine id " + combinedId)
 try{
    const res =await getDoc(doc(db,"chats",combinedId));
    console.log(res.data);
    if(!res.exists()){
      //create a chat in chat collection
      await setDoc(doc (db,"chats",combinedId),{messages:[]})
       
      //create user chats
      await updateDoc(doc(db,"userChats",currentUser.uid),{
        [combinedId + ".userInfo"]:{
          uid:user.uid,
          displayName:user.displayName,
          photoURL:user.photoURL
        },
        [combinedId+".date"]:serverTimestamp()
      });
      await updateDoc(doc(db,"userChats",user.uid),{
        [combinedId + ".userInfo"]:{
          uid:currentUser.uid,
          displayName:currentUser.displayName,
          photoURL:currentUser.photoURL
        },
        [combinedId+".date"]:serverTimestamp()
      });
    }
  }catch(err){} 
          setUser(null);
          setUsername("");
  }
  return (
    <div className='search'>
        <div className="searchForm" >
            <input type="text" placeholder='Find a User'
             onKeyDown={handleKey}
             onChange={(e) => setUsername(e.target.value)}
             />
             {/* //onClick={()=>handleSelectUser(chat[1].userInfo)} */}
        </div>
        {err && <span>User not Found</span>}
        {user && <div className="userChat" onClick={handleSelect} value={username}>
                  <img src={user.photoURL} alt='profile'/>
                    <div className="userChatInfo">
                        <span>{user.displayName}</span>
                    </div>
                </div>
                
        }
      
    </div>
  )
}

export default Search
