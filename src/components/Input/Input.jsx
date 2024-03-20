import React, { useContext, useState } from "react";
import ImageIcon from "@mui/icons-material/Image";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../../firebase/firebase-auth";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
  const [text, setText] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [fileUrls, setFileUrls] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    const imageUploadPromises = [];
    const fileUploadPromises = [];
    const imageDownloadURLs = [];
    const fileDownloadURLs = [];

    for (const file of imageFiles) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, file, {
        contentType: file.type,
      });

      const imageUploadPromise = new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          null,
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then((downloadURL) => {
                imageDownloadURLs.push(downloadURL);
                resolve();
              })
              .catch((error) => {
                reject(error);
              });
          }
        );
      });

      imageUploadPromises.push(imageUploadPromise);
    }

    
    for (const file of fileUrls) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, file, {
        contentType: file.type,
      });

      const fileUploadPromise = new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          null,
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then((downloadURL) => {
                fileDownloadURLs.push(downloadURL);
                resolve();
              })
              .catch((error) => {
                reject(error);
              });
          }
        );
      });

      fileUploadPromises.push(fileUploadPromise);
    }

    try {
      await Promise.all(imageUploadPromises);
      await Promise.all(fileUploadPromises);
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
          img: imageDownloadURLs,
          files: fileDownloadURLs,
        }),
      });

      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });

      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });

      setText("");
      setImageFiles([]);
      setFileUrls([]);
    } catch (error) {
      console.error("Error sending files:", error);
    }
  };

  const handleFileInputChange = (e) => {
    const fileList = e.target.files;
    setFileUrls(fileList);
  };

  const handleImageInputChange = (e) => {
    const fileList = e.target.files;
    const imageFiles = Array.from(fileList).filter((file) =>
      file.type.startsWith("image/")
    );
    setImageFiles(imageFiles);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Your message..."
        onChange={(e) => setText(e.target.value)}
        value={text}
        onKeyPress={handleKeyPress}
      />
      <div className="send">
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          multiple
          onChange={handleFileInputChange}
        />
        <label htmlFor="file">
          <AttachFileIcon />
        </label>
        <input
          type="file"
          style={{ display: "none" }}
          id="image"
          multiple
          onChange={handleImageInputChange}
          accept="image/*"
        />
        <label htmlFor="image">
          <ImageIcon />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;
