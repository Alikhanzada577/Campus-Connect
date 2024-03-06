import React, { useContext,useState } from 'react';
import VideocamIcon from '@mui/icons-material/Videocam';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Messages from '../Messages/Messages';
import Input from "../Input/Input";
import { ChatContext } from '../../context/ChatContext';
import Zoom from '../Zoom/Zoom';


let payload={
  meetingNumber:'89137851126',
  role:0,
  sdkKey:'_SOZ3WQsSUSkOdhDyHdH6g',
  sdkSecret:'4OnvbEd9u6dZavXOCOx1ru9gdgD3O3o6',
  passWord:'vWDB56',
  userName:'Ali',
  userEmail:'muhammadali94200@gmail.com',
  leaveUrl:'http://localhost:3000/home'
}

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
        
        <Zoom payload={payload}/>
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
