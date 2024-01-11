import React from 'react'
import "./../../style.scss";
import AnnouncementCard from '../../components/AnnouncementsComponents/AnnouncementCard';
import AnnouncementHeader from '../../components/AnnouncementsComponents/AnnouncementHeader';

const Announcements = () => {
  return (
    <div>
      <AnnouncementHeader/>
       <AnnouncementCard/>
       <AnnouncementCard/>
       <AnnouncementCard/>
       <AnnouncementCard/>

    </div>
  )
}

export default Announcements
