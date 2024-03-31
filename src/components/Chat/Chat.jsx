import React, { useContext, useState } from 'react';
import VideocamIcon from '@mui/icons-material/Videocam';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Messages from '../Messages/Messages';
import Input from "../Input/Input";
import { ChatContext } from '../../context/ChatContext';
import Zoom from '../Zoom/Zoom';
import { db } from "../../firebase/firebase-auth";
import { doc,getDoc,setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { AuthContext } from '../../context/AuthContext';
const payload = {
  meetingNumber: '89137851126',
  role: 0,
  sdkKey: '_SOZ3WQsSUSkOdhDyHdH6g',
  sdkSecret: '4OnvbEd9u6dZavXOCOx1ru9gdgD3O3o6',
  passWord: 'vWDB56',
  userName: 'Ali',
  userEmail: 'muhammadali94200@gmail.com',
  leaveUrl: 'http://localhost:3000/home'
};

const Chat = () => {
  const { data, dispatch } = useContext(ChatContext);
  const [showVideo, setShowVideo] = useState(false);
  const {currentUser}=useContext(AuthContext);
  const toggleVideo = () => {
    setShowVideo(!showVideo);
  };

  const handleSelect = async () => {
    // Add the selected user's chat to ChatContext
    dispatch({ type: "CHANGE_USER", payLoad: data.user });

    // Add the selected user's chat to chats list
    const combinedId = data.user.uid > currentUser.uid
      ? data.user.uid + currentUser.uid
      : currentUser.uid + data.user.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: data.user.uid,
            displayName: data.user.displayName,
            photoURL: data.user.photoURL
          },
          [combinedId + ".date"]: serverTimestamp()
        });
        await updateDoc(doc(db, "userChats", data.user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          [combinedId + ".date"]: serverTimestamp()
        });
      }
    } catch (err) {
      console.error("Error adding chat:", err);
    }
  };

  if (!data.user?.displayName) {
    return <div className='chat'></div>; 
  }

  return (
    <div className='chat'>
      <div className="chat_Info">
        <span>{data.user.displayName}</span>
        <div className="chatIcons">
          <VideocamIcon onClick={toggleVideo}></VideocamIcon>
          <MoreHorizIcon></MoreHorizIcon>
        </div>
      </div>
      {showVideo ? (
        <Zoom payload={payload} />
      ) : (
        <>
          <Messages />
          <Input />
        </>
      )}
    </div>
  );
};

export default Chat;
