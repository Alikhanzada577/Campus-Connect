import { useEffect } from 'react';
import './application.css';
const AnnouncementModal=({closeModal,applicationPurpose,email,enrollment,name,fileUrl})=>{
    useEffect(()=>{
        document.body.style.overflowY="hidden";
        return ()=>{document.body.style.overflowY="scroll";};
    },[]);
    return(
      <>
      <div className="modal-wrapper" onClick={closeModal}></div>
      <div className="modal-container">
        <div className='data-container'>
        <h3>Application Purpose</h3>
        <h3>{applicationPurpose}</h3>
        <h3>Enrollment</h3>
        <h3>{enrollment}</h3>
        <h3>Name</h3>
        <h3>{name}</h3>
        <h3>Email</h3>
        <h3>{email}</h3>

        </div>
        <div className='image-container'>
            <img src={fileUrl}alt="" />
        </div>
        
        </div>
        
      </>
    )
  };
  export default AnnouncementModal;