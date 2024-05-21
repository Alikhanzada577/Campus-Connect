import React, { useState,useContext } from "react";
import Navbar from "../Navbar/Navbar";
import { AuthContext } from "../../context/AuthContext";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CommunityChats from "./CommunityChats";
import { db } from "./../../firebase/firebase-auth";
import { collection, addDoc, doc, getDoc, setDoc } from "firebase/firestore";

const CommunitySidebar = ({ onChatRoomClick }) => {
  const { currentUser } = useContext(AuthContext);
  const [newCommunityTitle, setNewCommunityTitle] = useState("");

  const handleInputChange = (event) => {
    setNewCommunityTitle(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newCommunityTitle.trim() !== "") {
      console.log("Submitting form...");
      await addCommunityToFirebase(newCommunityTitle);
      setNewCommunityTitle("");
    }
  };

  const addCommunityToFirebase = async (title) => {
    try {
      const normalizedTitle = title.toLowerCase();
      const roomId = normalizedTitle.replace(/\s+/g, "");
      const roomRef = doc(db, "room", roomId);
      const roomSnapshot = await getDoc(roomRef);
      if (roomSnapshot.exists()) {
        console.log("Community already exists in Firestore");
        return;
      }
      await setDoc(roomRef, { title: title });
      const messagesRef = collection(db, "room", roomId, "messages");
      await addDoc(messagesRef, { placeholder: "Default message" });

      console.log("Community added to Firebase");
      onChatRoomClick(title);
    } catch (error) {
      console.error("Error adding community to Firebase:", error);
    }
  };

  return (
    <div className="sidebar">
      <Navbar />
      {currentUser && currentUser.role ==='admin' &&
      <div>
        <TextField
          hiddenLabel
          id="filled-hidden-label-small"
          placeholder="New Community Title"
          defaultValue="Small"
          variant="filled"
          value={newCommunityTitle}
          onChange={handleInputChange}
          sx={{ width: 400, marginTop: 2 }}
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          sx={{ width: 400, marginTop: 2 }}
        >
          Create
        </Button>
      </div>
       }
      <CommunityChats onChatRoomClick={onChatRoomClick} />
    </div>
  );
};

export default CommunitySidebar;
