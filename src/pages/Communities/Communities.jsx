import React from 'react'
import "./../../style.scss";
import LeftNav from '../../components/LeftNav/LeftNav';
import CommunitySidebar from '../../components/CommunityComponents/CommunitySidebar';
import CommunityChat from '../../components/CommunityComponents/CommunityChat';
const Communities = () => {
  return (
    <div className='home'>
      <div className="containerr">
      <LeftNav/>
      <CommunitySidebar/>
      <CommunityChat/>
     </div>
    </div>
  )
}

export default Communities
