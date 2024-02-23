import React from 'react';
import CommunityMessages from "./CommunityMessages";
import CommunityInput from './CommunityInput';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const CommunityChat = () => {
  return (
    <div className='chat'>
      <div className="chat_Info">
        <span>Community Name</span>
        <div className="chatIcons">
              <MoreHorizIcon></MoreHorizIcon>
        </div>       
      </div>
     
          <CommunityMessages />
          <CommunityInput/>
       
    </div>
  )
}

export default CommunityChat
