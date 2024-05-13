import React, { useContext } from 'react'
import {AuthContext} from './../../context/AuthContext';
const Header = () => {
  const {currentUser}=useContext(AuthContext);
  return (
    <div className='applicationHeader'>
      {currentUser && currentUser.role !== 'admin' &&
      <h1>Application Form</h1>}
      {currentUser && currentUser.role === 'admin' &&
      <h1>Applications</h1>}
    </div>
  );
};

export default Header;
