import React, { useState, useContext } from 'react';
import ImageIcon from '@mui/icons-material/Image';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { AuthContext } from '../../context/AuthContext';
import {collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/firebase-auth';

async function sendMessage(roomId, user, text) {
    try {
        await addDoc(collection(db, 'room', roomId, 'messages'), {
            uid: user.uid,
            displayName: user.displayName,
            text: text.trim(),
            timestamp: serverTimestamp(),
        });
    } catch (error) {
        console.error(error);
    }
}

const CommunityInput = ({ roomId }) => {
    const { currentUser } = useContext(AuthContext); // Use useContext hook to access context
    const [value, setValue] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        sendMessage(roomId, currentUser, value); // Pass currentUser instead of user
        setValue('');
    };

    return (
        <div className='input'>
            <input type="text" value={value} onChange={handleChange} required minLength={1} placeholder='your message...' />
            <div className="send">
                <AttachFileIcon></AttachFileIcon>
                <input type='file' style={{ display: "none" }} id='file' />
                <label htmlFor='file'>
                    <ImageIcon></ImageIcon>
                </label>
                <button disabled={value < 1} onClick={handleSubmit}>send</button> {/* Added onClick handler */}
            </div>
        </div>
    );
};

export default CommunityInput;
