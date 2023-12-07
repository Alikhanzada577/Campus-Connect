import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './../../firebase/firebase-auth';
import Sidebar from '../Sidebar/Sidebar';
import Chat from '../Chat/Chat';
import "./../../style.scss";

const Home = ({ name }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/'); 
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  return (
    <div className='home'>
      <div className="containerr">
      <Sidebar/>
      <Chat/>
      {/* <h1>Welcome, {name}</h1> */} 
      {/* <Button variant="contained" onClick={handleLogout}>
        Logout
      </Button> */}
     </div>
    </div>
  )
}

export default Home
