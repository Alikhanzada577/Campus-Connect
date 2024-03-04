import React,{useState,useEffect} from 'react';
import { db } from '../../firebase/firebase-auth';
import {
    collection,
    onSnapshot,
    query,
    orderBy,
} from 'firebase/firestore';

function getMessages(roomId, callback) {
    return onSnapshot(
        query(
            collection(db, 'room', roomId, 'messages'),
            orderBy('timestamp', 'asc')
        ),
        (querySnapshot) => {
            const messages = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            console.log("Retrieved messages:", messages);
            callback(messages);
        }
    );
  }
  function useMessages(roomId) {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        if (roomId) { // Check if roomId is defined
            const unsubscribe = getMessages(roomId, setMessages);
            console.log("Subscribed to messages for roomId:", roomId); // Log roomId
            return unsubscribe;
        }
    }, [roomId]);

    return messages;
}
export { useMessages,getMessages };