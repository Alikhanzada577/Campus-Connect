import React from 'react';
import Navbar from '../Navbar/Navbar';
import CommunityChats from './CommunityChats';
const CommunitySidebar = () => {
  return (
    <div className='sidebar'>
      <Navbar/>
      <CommunityChats/>
    </div>
  )
}

export default CommunitySidebar
