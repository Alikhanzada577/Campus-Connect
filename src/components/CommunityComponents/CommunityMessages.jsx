import React, { useContext,useLayoutEffect, useRef} from 'react'
import CommunityMessage from './CommunityMessage'
import { AuthContext } from '../../context/AuthContext';
import { useMessages } from './useMessages';

const CommunityMessages = ({roomId, selectedChatRoom}) => {
  const containerRef=useRef(null);
  const {currentUser}=useContext(AuthContext);
  const messages = useMessages(roomId)
 
  useLayoutEffect(() => {
    if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
});
  return (
    <div className='messages' ref={containerRef}>
      {messages.map((x) => (
                    <CommunityMessage
                        key={x.id}
                        message={x}
                        isOwnMessage={x.uid === currentUser.uid}
                    />
      ))}
   </div>
  )
}

export default CommunityMessages;
 