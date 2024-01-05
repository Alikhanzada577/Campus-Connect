import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Chat from '../Chat/Chat';
import "./../../style.scss";

const Home = () => {
  return (
    <div className='home'>
      <div className="containerr">
      <Sidebar/>
      <Chat/>
     </div>
    </div>
  )
}

export default Home
