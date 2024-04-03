// AnnouncementCard.js
import React, { useState,useContext } from 'react';
import AnnouncementModal from './AnnouncementModal';
import { db } from '../../firebase/firebase-auth';
import { doc, deleteDoc } from 'firebase/firestore';
import {AuthContext} from './../../context/AuthContext';
import './Announcements.css';

const AnnouncementCard = ({ announcement,announcementId }) => {
    const {currentUser} = useContext(AuthContext);
    const { announcementTitle, briefDescription, description, tags, fileUrl } = announcement;
    const [showModal, setShowModal] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false); 
    const closeModal = () => setShowModal(false);

    const handleDelete = async () =>{
        try{
            await deleteDoc(doc(db,'Announcements',announcementId));
            setIsDeleted(true);
            console.log('Announcement is deleted');
        }catch(error){
            console.error("Error While deleting Announcement")
        }
    };
    return (
        <>
        {isDeleted ? null :(
        <div className='AnnouncementCard'>
            <div className='AnnouncementCardMain'>
                <div className='AnnouncementCard-info'>
                    <h1>{announcementTitle}</h1>
                    <p>{briefDescription}</p>
                    <div>
                        {tags && tags.map((tag, index) => <p key={index}>{tag}</p>)}
                    </div>
                </div>
                <div className='AnnouncementCardView'>
                    <div className='AnnouncementImage'>
                        {fileUrl && <img src={fileUrl} alt='Announcement' />}
                    </div>
                    {currentUser && currentUser.role !=='admin' &&
                    <button className="Amodal-btn" onClick={() => setShowModal(true)}>View</button>}
                    {showModal && <AnnouncementModal title={announcementTitle} description={description} imageUrl={fileUrl} closeModal={closeModal} />}
                    {currentUser && currentUser.role === 'admin' &&
                    <button className='Amodal-btn' onClick={handleDelete}>Delete</button>}
                </div>
            </div>
        </div>
        )}
        </>
    );
};

export default AnnouncementCard;
