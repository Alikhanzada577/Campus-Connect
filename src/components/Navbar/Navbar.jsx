import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {signOut} from "firebase/auth";
import { auth } from "../../firebase/firebase-auth";
import { AuthContext } from '../../context/AuthContext';



const Navbar = () => {
  const {currentUser}=useContext(AuthContext);
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
    <div className='navbar'>
        <span className="logo">Campus Connect</span>
        <div className="user">
          <img src={currentUser.photoURL} alt=''/>
            <span>{currentUser.displayName}</span>
            <button onClick={handleLogout}>Logout</button>
        </div>
      
    </div>
  )
}

export default Navbar
