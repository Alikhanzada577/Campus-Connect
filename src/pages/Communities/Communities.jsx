import React, { useState } from 'react';
import LeftNav from '../../components/LeftNav/LeftNav';
import CommunitySidebar from '../../components/CommunityComponents/CommunitySidebar';
import CommunityChat from '../../components/CommunityComponents/CommunityChat';
import { chatRooms } from '../../components/CommunityComponents/ChatRooms';

const Communities = () => {
  const [selectedChatRoom, setSelectedChatRoom] = useState(null);

  const handleChatRoomClick = (roomTitle) => {
    setSelectedChatRoom(roomTitle); 
  };

  return (
    <div className='home'>
      <div className="containerr">
        <div  className='mainNavigation'>
        <LeftNav />
        </div>
        <div className='otherContainer'>
        <CommunitySidebar onChatRoomClick={handleChatRoomClick} />
        {selectedChatRoom ? (
          <CommunityChat selectedChatRoom={selectedChatRoom} chatRooms={chatRooms} />
        ) : (<div className='chat'>
            
        </div>)}
      </div>
      </div>
    </div>
  );
};

export default Communities;
