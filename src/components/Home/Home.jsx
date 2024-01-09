import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Chat from '../Chat/Chat';
import LeftNav from '../LeftNav/LeftNav';
import "./../../style.scss";

const Home = () => {
  return (
    <div className='home'>
      <div className="containerr">
      <LeftNav/>
      <Sidebar/>
      <Chat/>
     </div>
    </div>
  )
}

export default Home
