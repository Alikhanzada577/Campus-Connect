import React, { useContext ,useEffect,useState} from 'react';
import  Message  from "../Message/Message";
import { ChatContext } from '../../context/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/firebase-auth';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const {data}=useContext(ChatContext);

  // this useeffect is used for fetching Chat data from fire store
  useEffect(()=>{
    const unSub = onSnapshot(doc(db,"chats",data.chatId),(doc)=>{
      doc.exists() && setMessages(doc.data().messages);
        });
        return ()=>{
          unSub();
        }
  },[data.chatId]);
  console.log(messages);
  return (
    <div className='messages'>
     {messages.map((m)=>(
      <Message message={m} key={m.id}/>
     )
     )} 
      
    </div>
  );
}

export default Messages
