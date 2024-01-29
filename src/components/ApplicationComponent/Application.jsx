import React from 'react';
import TextField from '@mui/material/TextField';
import "./../../style.scss";
const Application = () => {
  return (
    <div className='applicationForm'>   
         
         <TextField sx={{width: 400, marginBottom: 1,}} label="Full Name"  />
        <TextField sx={{width: 400, marginBottom: 1,}} label="Enrollment"  />
        <TextField sx={{width: 400, marginBottom: 1,}} label="Email"  />
      
    </div>
  )
}

export default Application;
