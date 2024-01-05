import React from 'react';
import Navbar from './../Navbar/Navbar';
import Search from './../Search/Search';
import Chats from '../Chat/Chats';


const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Navbar/>
      <Search/>
      <Chats/>
    </div>
  )
}

export default Sidebar;

