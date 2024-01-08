import React,{useContext,useState} from 'react';
import ImageIcon from '@mui/icons-material/Image';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../firebase/firebase-auth';
import {v4 as uuid} from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const Input = () => {

  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const {currentUser} =useContext(AuthContext);
  const {data} =useContext(ChatContext);

  const handleSend= async()=>{
      if(img){
        const storageRef = ref(storage, uuid());
        const uploadTask = uploadBytesResumable(storageRef, img);
        uploadTask.on(
          'state_changed',
          null,
          (error) => {
            // setErrorMsg(error.message);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              await updateDoc(doc(db,"chats",data.chatId),{
                messages:arrayUnion({
                  id:uuid(),
                  text,
                  senderId:currentUser.uid,
                  date:Timestamp.now(),
                  img:downloadURL
                }),
              });
            });
    
           
          }
        );
      }else{
        await updateDoc(doc(db,"chats",data.chatId),{
          messages:arrayUnion({
            id:uuid(),
            text,
            senderId:currentUser.uid,
            date:Timestamp.now(),
          }),
        });
      }
        //updating last message in userchats and date for current user 
      await updateDoc(doc(db,"userChats",currentUser.uid),{
        [data.chatId + ".lastMessage"]:{
          text
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
      //updating last message in userchats and date for other user
      await updateDoc(doc(db,"userChats",data.user.uid),{
        [data.chatId + ".lastMessage"]:{
          text
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });

      setText("");
      setImg(null);
  };
  return (
    <div className='input'>
      <input type="text" placeholder='your message...'onChange={(e)=>setText(e.target.value)} value={text}/>
      <div className="send">
        <AttachFileIcon></AttachFileIcon>
        <input type='file' style={{display:"none"}} id='file' onChange={(e)=>setImg(e.target.files[0])}/>
        <label htmlFor='file'>
        <ImageIcon></ImageIcon>
        </label>
        <button onClick={handleSend}>send</button>
      </div>
    </div>
  )
}

export default Input;
