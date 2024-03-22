import { useEffect } from 'react';
import './Announcements.css';
const AnnouncementModal=({ closeModal, title, description, imageUrl })=>{
    useEffect(()=>{
        document.body.style.overflowY="hidden";
        return ()=>{document.body.style.overflowY="scroll";};
    },[]);
    return(
      <>
      <div className="modal-wrapper" onClick={closeModal}></div>
      <div className="modal-container">
        <div className='data-container'>
        <h2>{title}</h2>
        <p> {description}</p> 
        </div>
        <div className='image-container'>
            <img src={imageUrl} alt="" />
        </div>
        
        </div>
         
      </>
    )
  };
  export default AnnouncementModal;