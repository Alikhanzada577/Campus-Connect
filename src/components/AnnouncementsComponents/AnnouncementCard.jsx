import React, { useState } from 'react';
import AnnouncementModal from './AnnouncementModal';
import "./Announcements.css";

const AnnouncementCard = ({ announcement }) => {
    const { announcementTitle, briefDescription,description, tags, fileUrl } = announcement;

    const [showModal, setShowModal] = useState(false);
    const closeModal = () => setShowModal(false);
  
    return (
        <div className='AnnouncementCard'>
            <div className='CardMain'>
                <div className='Card-info'>
                    <h1>{announcementTitle}</h1>
                    <p>{briefDescription}</p>
                    <div>
                        {tags && tags.map((tag, index) => (
                            <p key={index}>{tag}</p>
                        ))}
                    </div>
                </div>
                <div className='CardView'>
                    <div className='AnnouncementImage'>
                        <img src={fileUrl} alt='Annoucement' />
                    </div>
                    <button className="modal-btn" onClick={() => setShowModal(true)}>view</button>
                    {showModal && <AnnouncementModal title={announcementTitle}
                      description={description}
                      imageUrl={fileUrl}
                      closeModal={closeModal} />}
                </div>
            </div>
        </div> 
    )
}

export default AnnouncementCard;
