import React from 'react';

const CommunityMessage = ({ message, isOwnMessage }) => {
  const { displayName, text, imageURL, fileURL } = message;

  const renderMessageContent = () => {
    let content = null;

    if (text) {
      content = <p>{text}</p>;
    }

    if (imageURL) {
      content = <img src={imageURL} alt="Image" />;
    }

    if (fileURL) {
      content = (
        <div className="file">
          <a href={fileURL} target="_blank" rel="noopener noreferrer">
            Download File
          </a>
        </div>
      );
    }

    return content;
  };

  return (
    <div className={`message ${isOwnMessage ? 'owner' : ''}`}>
      <div className='messageInfo'>
        <img src="" alt=''/>
        <span>{displayName}</span>
      </div> 
      <div className='messageContent'>
        {renderMessageContent()}
      </div>
    </div>
  );
}

export default CommunityMessage;