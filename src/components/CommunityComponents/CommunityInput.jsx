import React, { useState, useContext } from 'react';
import ImageIcon from '@mui/icons-material/Image';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { AuthContext } from '../../context/AuthContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db, storage } from '../../firebase/firebase-auth';
import { v4 as uuid } from 'uuid';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const CommunityInput = ({ roomId }) => {
    const { currentUser } = useContext(AuthContext);
    const [text, setText] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [file, setFile] = useState(null);

    const handleImageChange = (event) => {
        setImageFile(event.target.files[0]);
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            let imageDownloadURL = '';
            let fileDownloadURL = '';

            if (imageFile) {
                const imageStorageRef = ref(storage, uuid());
                const imageUploadTask = uploadBytesResumable(imageStorageRef, imageFile, {
                    contentType: imageFile.type,
                });

                await imageUploadTask;

                imageDownloadURL = await getDownloadURL(imageUploadTask.snapshot.ref);
            }

            if (file) {
                const fileStorageRef = ref(storage, uuid());
                const fileUploadTask = uploadBytesResumable(fileStorageRef, file, {
                    contentType: file.type,
                });

                await fileUploadTask;

                fileDownloadURL = await getDownloadURL(fileUploadTask.snapshot.ref);
            }

            await addDoc(collection(db, 'room', roomId, 'messages'), {
                uid: currentUser.uid,
                displayName: currentUser.displayName,
                text: text.trim(),
                timestamp: serverTimestamp(),
                imageURL: imageDownloadURL,
                fileURL: fileDownloadURL,
            });

            setText('');
            setImageFile(null);
            setFile(null);
            console.log("message Sent")
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
          handleSubmit(e);
          
        }
      };

    return (
        <div className='input'>
            <input type="text" 
            value={text}
             onChange={(e) => setText(e.target.value)} 
            required minLength={1}
             onKeyPress={handleKeyPress}
             placeholder='Your message...' />
            <div className="send">
                
                <input type='file' style={{ display: "none" }} id='file' onChange={handleFileChange} />
                <label htmlFor='file'>
                <AttachFileIcon />
                </label>
                
               
                <input type='file' style={{ display: "none" }} id='image' onChange={handleImageChange} accept="image/*" />
                <label htmlFor='image'>
                <ImageIcon />
                </label>
                
                <button disabled={text.length < 1} onClick={handleSubmit}>Send</button>
            </div>
        </div>
    );
};

export default CommunityInput;