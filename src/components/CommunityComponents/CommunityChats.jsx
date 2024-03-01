// CommunityChats.js
import React from 'react';
import { chatRooms } from './ChatRooms';

const CommunityChats = ({ onChatRoomClick }) => {
  return (
    <div className='chats'>
      {chatRooms.map((room) => (
        <div className="userChat" key={room.id} onClick={() => onChatRoomClick(room.title)}>
          <div className="userChatInfo">
            <span>{room.title}</span>
            <p>Last Message</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommunityChats;
