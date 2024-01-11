import React from 'react'
import "./../../style.scss";
import LeftNav from '../../components/LeftNav/LeftNav';
import Sidebar from './../../components/Sidebar/Sidebar';
import Chat from './../../components/Chat/Chat';
const Communities = () => {
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

export default Communities
