import React from 'react';
import VideocamIcon from '@mui/icons-material/Videocam';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Messages from '../Messages/Messages';
import Input from "../Input/Input"

const Chat = () => {
  return (
    <div className='chat'   >
      <div className="chat_Info">
        <span>Jane</span>
        <div className="chatIcons">
          
              <VideocamIcon></VideocamIcon>
              <PersonAddIcon></PersonAddIcon>
              <MoreHorizIcon></MoreHorizIcon>
         
        </div>       
      </div>
      <Messages/>
      <Input/>
    </div>
  )
}

export default Chat;
