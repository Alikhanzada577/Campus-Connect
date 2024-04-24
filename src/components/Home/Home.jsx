import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Chat from '../Chat/Chat';
import LeftNav from '../LeftNav/LeftNav';
import "./../../style.scss";

const Home = () => {
  return (
    <div className='home'>
      <div className="containerr">
        <div className='mainNavigation'>
      <LeftNav/>
      </div>
      <div className='otherContainer'>
      <Sidebar/>
      <Chat/>
      </div>
     </div>
    </div>
  )
}

export default Home;
