import React from 'react';
import CommunityMessages from "./CommunityMessages";
import CommunityInput from './CommunityInput';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useMessages } from './useMessages'; // Import the custom hook

const CommunityChat = ({ selectedChatRoom, chatRooms }) => {
  const room = chatRooms.find(room => room.title === selectedChatRoom);
  const messages = useMessages(room?.id); // Call useMessages with roomId

  return (
    <div className='chat'>
      <div className="chat_Info">
        <span>{selectedChatRoom || 'Select a chat room'}</span>
        <div className="chatIcons">
          <MoreHorizIcon />
        </div>
      </div>
      {room && <CommunityMessages roomId={room.id} selectedChatRoom={selectedChatRoom}  />} {/* Pass messages data */}
      {room && <CommunityInput roomId={room.id} />}
    </div>
  );
};

export default CommunityChat;