import React,{useState} from 'react';
import AnnouncementModal from './AnnouncementModal';
import "./Announcements.css";


const AnnouncementCard = () => {
    const tags = ["Media Fest","Musical Night","Food Stalls"];

    const [showModal, setShowModal] = useState(false);
    const closeModal=()=> setShowModal(false);

  return (
    <div className='AnnouncementCard'>
      <div className='CardMain'>
        <div className='Card-info'>
             <h1>Media Fest</h1>
             <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem nulla quo deserunt dicta alias nobis modi placeat laudantium, rerum, nemo ipsa esse eius quibusdam porro velit sequi, incidunt fuga doloremque!</p>
            <div>
                {tags.map((tag,index)=>(
                                        <p key={index}>{tag}</p>
                ))}
            </div>
        </div>
        <div className='CardView'>
                  <div className='AnnouncementImage'>
                  <img src='https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w1200/2023/10/free-images.jpg' alt=''/>
                  </div>
                  <button className="modal-btn" onClick={()=>setShowModal(true)}>view</button>
                  {showModal &&  <AnnouncementModal closeModal={closeModal}/>}
                 
        </div>
      </div>
    </div>
  )
}

export default AnnouncementCard
