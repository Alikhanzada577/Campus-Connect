import React, { useContext, useState } from 'react';
import { doc, getDoc, setDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebase-auth";
import { collection, query, where, updateDoc, serverTimestamp } from 'firebase/firestore';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

const Search = () => {
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  const handleSearch = async () => {
    if (username.trim() === "") {
      setUsers([]);
      return;
    }
  
    const q = query(
      collection(db, "users"),
      where("displayName", ">=", username.trim()),
      where("displayName", "<=", username.trim() + "\uf8ff")
    );
  
    try {
      const querySnapshot = await getDocs(q);
      const matchedUsers = [];
      querySnapshot.forEach((doc) => {
        const user = doc.data();
        if (user.uid !== currentUser.uid) {
          matchedUsers.push(user);
        }
      });
      setUsers(matchedUsers);
    } catch (err) {
      setErr(true);
    }
  };

  const handleInputChange = (e) => {
    setUsername(e.target.value);
    handleSearch();
  };

  const handleSelect = async (selectedUser) => {
    dispatch({ type: "CHANGE_USER", payLoad: selectedUser });

    const combinedId = selectedUser.uid > currentUser.uid
      ? selectedUser.uid + currentUser.uid
      : currentUser.uid + selectedUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: selectedUser.uid,
            displayName: selectedUser.displayName,
            photoURL: selectedUser.photoURL
          },
          [combinedId + ".date"]: serverTimestamp()
        });
        await updateDoc(doc(db, "userChats", selectedUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          [combinedId + ".date"]: serverTimestamp()
        });
      }
    } catch (err) {
      console.error("Error adding chat:", err);
    }

    setUsers([]);
    setUsername("");
  };

  return (
    <div className='search'>
      <div className="searchForm">
        <input
          type="text"
          placeholder='Find a User'
          onChange={handleInputChange}
          value={username}
        />
      </div>
      {err && <span>User not Found</span>}
      {users.map((user) => (
        <div key={user.uid} className="userChat" onClick={() => handleSelect(user)}>
          <img src={user.photoURL} alt='profile' />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Search;
