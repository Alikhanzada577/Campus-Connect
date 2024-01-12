import { useEffect } from 'react';
import './Announcements.css';
const AnnouncementModal=({closeModal})=>{
    useEffect(()=>{
        document.body.style.overflowY="hidden";
        return ()=>{document.body.style.overflowY="scroll";};
    },[]);
    return(
      <>
      <div className="modal-wrapper" onClick={closeModal}></div>
      <div className="modal-container">
        <h2>StaY Tuned</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa esse et, odio sed labore quisquam quas. Quam officia a consequatur, facilis culpa voluptas, rerum excepturi similique inventore quis nobis fuga.
        </p>
        <button className='modal-btn' onClick={closeModal}>Close</button>
        </div>
      </>
    )
  };
  export default AnnouncementModal;