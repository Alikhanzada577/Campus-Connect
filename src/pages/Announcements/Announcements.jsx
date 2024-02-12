import React, { useState, useEffect } from 'react';
import "./../../style.scss";
import { db } from '../../firebase/firebase-auth';
import AnnouncementCard from '../../components/AnnouncementsComponents/AnnouncementCard';
import AnnouncementHeader from '../../components/AnnouncementsComponents/AnnouncementHeader';
import LeftNav from '../../components/LeftNav/LeftNav';
import AnnouncementForm from '../../components/AnnouncementsComponents/AnnouncementForm';
import { collection, getDocs } from 'firebase/firestore';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]); 

  useEffect(() => {
   
    const fetchAnnouncements = async () => {
      try {
        const colref = collection(db, 'Announcements');
        const snapshot = await getDocs(colref);
        const announcementsData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setAnnouncements(announcementsData);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchAnnouncements();
  }, []); 

  return (
    <div className='AnnouncementSection'>
      <div className='Navigation'>
        <LeftNav />
      </div>
      <div className='main'>
        <AnnouncementHeader />
        {announcements.map(announcement => (
          <AnnouncementCard key={announcement.id} announcement={announcement} />
        ))}
        <AnnouncementForm />
      </div>
    </div>
  );
}

export default Announcements;
