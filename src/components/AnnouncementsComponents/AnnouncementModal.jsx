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
        <div className='data-container'>
        <h2>StaY Tuned</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa esse et, odio sed labore quisquam quas. Quam officia a consequatur, facilis culpa voluptas, rerum excepturi similique inventore quis nobis fuga.
        </p>
        </div>
        <div className='image-container'>
            <img src="https://th.bing.com/th/id/OIP.iAhcp6m_91O-ClK79h8EQQHaFj?rs=1&pid=ImgDetMain" alt="" />
        </div>
        {/* <button className='modal-btn' onClick={closeModal}>Close</button> */}
        </div>
        
      </>
    )
  };
  export default AnnouncementModal;