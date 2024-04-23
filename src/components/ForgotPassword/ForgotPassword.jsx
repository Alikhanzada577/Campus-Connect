
import React, { useState } from 'react';
import './ForgotPassword.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link,useNavigate } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from './../../firebase/firebase-auth';


const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [resetEmailSent, setResetEmailSent] = useState(false);

  const handleResetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setResetEmailSent(true);
    } catch (error) {
      console.error('Password reset error:', error.message);
    }
  };

  return (
    <div className='container'>
      <h1>Reset Password</h1>
      {resetEmailSent ? (
        <p>Check your email for instructions to reset your password.</p>
      ) : (
        <>
          <TextField
            sx={{width: 400, marginBottom: 1,}}
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button variant="contained" sx={{width: 400, marginTop:2,}} onClick={handleResetPassword}style={{backgroundColor:"#4A154B"}}>
            Reset Password
          </Button>
        </>
      )}
      <p>
        Remember your password?<Link to="/Login"> Login</Link>
      </p>
    </div>
  );
};

export default ForgotPassword;
