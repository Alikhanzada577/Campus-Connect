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
  const [files, setFiles] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    const uploadPromises = [];
    const fileDownloadURLs = [];

    for (const file of files) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, file.rawFile, {
        contentType: file.rawFile.type,
      });

      const uploadPromise = new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          null,
          (error) => {
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then((downloadURL) => {
                fileDownloadURLs.push({ url: downloadURL, name: file.name });
                resolve();
              })
              .catch((error) => {
                reject(error);
              });
          }
        );
      });

      uploadPromises.push(uploadPromise);
    }

    try {
      await Promise.all(uploadPromises);
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
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
      setFiles([]);
    } catch (error) {
      console.error("Error sending files:", error);
    }
  };

  const handleFileInputChange = (e) => {
    const fileList = e.target.files;
    const selectedFiles = Array.from(fileList).map((file) => ({
      rawFile: file,
      name: file.name,
    }));
    setFiles(selectedFiles);
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
        <button disabled={text.length < 1} onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Input;
