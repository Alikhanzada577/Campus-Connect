// ApplicationCard.js
import React, { useState,useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { db } from '../../firebase/firebase-auth';
import { doc, deleteDoc } from 'firebase/firestore';
import ApplicationModal from "./ApplicationModal";
import "./application.css";

const ApplicationCard = ({ application,applicationId }) => {
    const { applicationPurpose, email, enrollment, fileUrl, name } = application;
    const [isDeleted, setIsDeleted] = useState(false); 
    const [showModal, setShowModal] = useState(false);
    const closeModal = () => setShowModal(false);
    const handleDelete = async () =>{
        try{
            await deleteDoc(doc(db,'applications',applicationId));
            setIsDeleted(true);
            console.log('Application is deleted');
        }catch(error){
            console.error("Error While deleting Application")
        }
    };

    return (
        <>
        {isDeleted ? null :(
        <div className='applicationCard'>
            <div className='CardMain'>
                <div className='Card-info'>
                    <h1>{applicationPurpose}</h1>
                    <h2>{enrollment}</h2>
                </div>
                <div className='CardView'>
                    <div className='applicationImage'>
                        
                        {fileUrl && <img src={fileUrl} alt='Application' />}
                    </div>
                    <div className='btn-control'>
                    <button className='modal-btn' onClick={handleDelete}>Delete</button>
                    <button className="modal-btn" onClick={() => setShowModal(true)}>View</button>
                    </div>
                    {showModal && <ApplicationModal
                        applicationPurpose={applicationPurpose}
                        enrollment={enrollment}
                        email={email}
                        name={name}
                        closeModal={closeModal} />}
                </div>
            </div>
        </div>
        )}
        </>
    );
}

export default ApplicationCard;
