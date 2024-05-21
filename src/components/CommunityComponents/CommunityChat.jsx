import React from 'react';
import CommunityMessages from "./CommunityMessages";
import CommunityInput from './CommunityInput';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useMessages } from './useMessages'; 

const CommunityChat = ({ selectedChatRoom, chatRooms }) => {
  console.log('Selected Chat Room:', selectedChatRoom);
  console.log('Chat Rooms:', chatRooms);

  const room = chatRooms.find(room => room.title === selectedChatRoom);
  console.log('Room:', room);

  const messages = useMessages(room?.id); 
  console.log('Messages:', messages);

  return (
    <div className='chat'>
      <div className="chat_Info">
        <span>{selectedChatRoom || 'Select a chat room'}</span>
        <div className="chatIcons">
          <MoreHorizIcon />
        </div>
      </div>
      <CommunityMessages roomId={selectedChatRoom} selectedChatRoom={selectedChatRoom}  />
      <CommunityInput roomId={selectedChatRoom} /> 
    </div>
  );
};

export default CommunityChat;
