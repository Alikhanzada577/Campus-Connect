import React from 'react'
import "./../../style.scss";
import AnnouncementCard from '../../components/AnnouncementsComponents/AnnouncementCard';
import AnnouncementHeader from '../../components/AnnouncementsComponents/AnnouncementHeader';
import LeftNav from '../../components/LeftNav/LeftNav';
import AnnouncementForm from '../../components/AnnouncementsComponents/AnnouncementForm';

const Announcements = () => {
  return (
    <div className='AnnouncementSection'>
      <div className='Navigation'>
      <LeftNav/>
      </div>
      <div className='main'>
      <AnnouncementHeader/>
       <AnnouncementCard/>
      <AnnouncementForm/>
       </div>
    </div>
  )
}

export default Announcements
