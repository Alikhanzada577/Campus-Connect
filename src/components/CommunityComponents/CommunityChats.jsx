import React, { useEffect, useState } from 'react';
import { db } from './../../firebase/firebase-auth';
import { collection, getDocs, query } from 'firebase/firestore';

const CommunityChats = ({ onChatRoomClick }) => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const roomSnapshot = await getDocs(collection(db, 'room'));
        const roomList = [];
        roomSnapshot.forEach((doc) => {
          // Get the subcollections for each document
          const subcollections = doc.data();
          roomList.push({ id: doc.id, title: subcollections.title, subcollections });
        });
        setRooms(roomList);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, []);

  return (
    <div className='communityChats'>
      {rooms.map((room) => (
        <UserChat key={room.id} room={room} onChatRoomClick={onChatRoomClick} />
      ))}
    </div>
  );
}; 

const UserChat = ({ room, onChatRoomClick }) => {
  return (
    <div className="userChat" onClick={() => onChatRoomClick(room.title)}>
      <div className="userChatInfo">
        <span>{room.title}</span>
       
      </div>
    </div>
  );
};

export default CommunityChats;
