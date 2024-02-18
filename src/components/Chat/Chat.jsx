import React, { useContext,useState } from 'react';
import VideocamIcon from '@mui/icons-material/Videocam';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Messages from '../Messages/Messages';
import Input from "../Input/Input";
import { ChatContext } from '../../context/ChatContext';
import Zoom from '../Zoom/Zoom';

const Chat = () => {
  const{data}= useContext(ChatContext);
  const [showVideo, setShowVideo] = useState(false);

  const toggleVideo = () => {
    setShowVideo(!showVideo);
  };
  return (
    <div className='chat'>
      <div className="chat_Info">
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          
              <VideocamIcon onClick={toggleVideo}></VideocamIcon>
              <MoreHorizIcon></MoreHorizIcon>
         
        </div>       
      </div>
      {showVideo ? (
        
        <Zoom/>
      ) : (
       <>
          <Messages />
          <Input/>
        </>
      )}
    </div>
  )
}

export default Chat;
