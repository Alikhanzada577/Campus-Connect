import React from 'react'
import "./../../style.scss";
import AnnouncementCard from '../../components/AnnouncementsComponents/AnnouncementCard';
import AnnouncementHeader from '../../components/AnnouncementsComponents/AnnouncementHeader';
import LeftNav from '../../components/LeftNav/LeftNav';

const Announcements = () => {
  return (
    <div className='AnnouncementSection'>
      <div className='Navigation'>
      <LeftNav/>
      </div>
      <div className='main'>
      <AnnouncementHeader/>
       <AnnouncementCard/>
       <AnnouncementCard/>
       <AnnouncementCard/>
       </div>
    </div>
  )
}

export default Announcements
