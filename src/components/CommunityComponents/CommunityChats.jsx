// CommunityChats.js
import React from 'react';
import { chatRooms } from './ChatRooms';
import { useLastMessage } from './useLastMessage';

const CommunityChats = ({ onChatRoomClick }) => {
  return (
    <div className='chats'>
      {chatRooms.map((room) => (
        <UserChat key={room.id} room={room} onChatRoomClick={onChatRoomClick} />
      ))}
    </div>
  );
};

const UserChat = ({ room, onChatRoomClick }) => {
  const lastMessage = useLastMessage(room.id);

  return (
    <div className="userChat" onClick={() => onChatRoomClick(room.title)}>
      <div className="userChatInfo">
        <span>{room.title}</span>
        <p>{lastMessage}</p>
      </div>
    </div>
  );
};

export default CommunityChats;
