import React from 'react';
import Navbar from '../Navbar/Navbar';
import CommunityChats from './CommunityChats';

const CommunitySidebar = ({ onChatRoomClick }) => {
  return (
    <div className='sidebar'>
      <Navbar />
      <CommunityChats onChatRoomClick={onChatRoomClick} />
    </div>
  );
};

export default CommunitySidebar;