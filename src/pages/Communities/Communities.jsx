// Communities.js

import React, { useState } from 'react';
import LeftNav from '../../components/LeftNav/LeftNav';
import CommunitySidebar from '../../components/CommunityComponents/CommunitySidebar';
import CommunityChat from '../../components/CommunityComponents/CommunityChat';
import { chatRooms as initialChatRooms } from '../../components/CommunityComponents/ChatRooms';

const Communities = () => {
  const [selectedChatRoom, setSelectedChatRoom] = useState(null);
  const [chatRooms, setChatRooms] = useState(initialChatRooms);

  const handleChatRoomClick = (roomTitle) => {
    setSelectedChatRoom(roomTitle); 
  };

  const handleAddCommunity = (newCommunityTitle) => {
    // Create a new community object
    const newCommunity = {
      id: newCommunityTitle.toLowerCase().replace(/\s+/g, ''),
      title: newCommunityTitle,
    };
    // Update the chatRooms array
    setChatRooms([...chatRooms, newCommunity]);
  };

  return (
    <div className='home'>
      <div className="containerr">
        <div  className='mainNavigation'>
          <LeftNav />
        </div>
        <div className='otherContainer'>
          <CommunitySidebar 
            onChatRoomClick={handleChatRoomClick} 
            onAddCommunity={handleAddCommunity} 
          />
          {selectedChatRoom ? (
            <CommunityChat 
              selectedChatRoom={selectedChatRoom} 
              chatRooms={chatRooms} 
            />
          ) : (<div className='chat'></div>)}
        </div>
      </div>
    </div>
  );
};

export default Communities;
