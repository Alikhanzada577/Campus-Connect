// Message.js

import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const renderMessageContent = () => {
    console.log("Rendering message content...");
    console.log("Files:", message.files);
  
    let content = null;
  
    if (message.text) {
      content = <p>{message.text}</p>;
    } else if (message.img && typeof message.img === "string") {
      content = <img src={message.img} alt="Image" />; 
    } else if (message.img && Array.isArray(message.img)) {
      content = message.img.map((image, index) => (
        <img key={index} src={image} alt={`Image ${index}`} />
      )); // Render multiple images
    }
  
    if (!message.files || message.files.length === 0) {
      return content; // Return text or image content if no files
    }
  
    const fileContent = message.files.map((file, index) => (
      <div key={index} className="file">
        <a href={file} target="_blank" rel="noopener noreferrer">
          Download File
        </a>
      </div>
    ));
  
    if (content) {
      return (
        <>
          {content}
          {fileContent}
        </>
      );
    } else {
      return fileContent; 
    }
  };
  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>just now</span>
      </div>
      <div className="messageContent">{renderMessageContent()}</div>
    </div>
  );
};

export default Message;
