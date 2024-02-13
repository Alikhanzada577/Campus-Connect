import React, { useState } from 'react';
import ApplicationModal from "./ApplicationModal";
import "./application.css";

const ApplicationCard = ({application}) => {
    const {applicationPurpose,email,enrollment,fileUrl,name}=application;


    const [showModal, setShowModal] = useState(false);
    const closeModal = () => setShowModal(false);
  return (
    <div className='applicationCard'>
            <div className='CardMain'>
                <div className='Card-info'>
                    <h1>{applicationPurpose}</h1>
                    <h2>{enrollment}</h2>
                </div>
                <div className='CardView'>
                    <div className='applicationImage'>
                        <img src={fileUrl} alt='Application' />
                        
                    </div>
                   
                    <button className="modal-btn" onClick={() => setShowModal(true)} >view</button>
                    {showModal && <ApplicationModal
                    applicationPurpose={applicationPurpose}
                    enrollment={enrollment}
                    email={email}
                    name={name}
                    closeModal={closeModal} />}
                </div>
            </div>
        </div>
  )
}

export default ApplicationCard
