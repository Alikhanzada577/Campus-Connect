import React from 'react';

const CommunityMessage = ({ message, isOwnMessage }) => {
  const { displayName, text } = message;

  return (
    <div className={`message ${isOwnMessage ? 'owner' : ''}`}>
      <div className='messageInfo'>
        <img src="" alt=''/>
        <span>{displayName}</span>
      </div> 
      <div className='messageContent'>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default CommunityMessage;