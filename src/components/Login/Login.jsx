import React ,{useState}from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Login.css';
import { Link , useNavigate} from 'react-router-dom';
import {signInWithEmailAndPassword  } from 'firebase/auth';
import { auth } from './../../firebase/firebase-auth';


const Login = () => {
  const navigate=useNavigate();
const [values,setValues]=useState({
 email: "",
 pass: "",
});

const [errorMsg, setErrorMsg] = useState("");
const[submitButtonDisabled,setSubmitButtonDisabled]=useState(false);

const handleSubmission = () => {
  if (!values.email || !values.pass) {
    setErrorMsg("Fill All Fields");
    return;
  }
  setErrorMsg("");
  setSubmitButtonDisabled(true);
  
  signInWithEmailAndPassword(auth, values.email, values.pass)
    .then(async (res) => {
      setSubmitButtonDisabled(false);
      console.log("Login successful:", res.user);
      navigate("/Home");
    })
    .catch((err) => {
      setSubmitButtonDisabled(false);
      console.error("Login error:", err.message);
      setErrorMsg(err.message);
    });
};
  return (
    <div className='container'>
      
      <h1>Sign in to Campus Connect</h1>
      <p>We suggest using the email address you use at University</p>
      <TextField 
        onChange={event=>setValues(prev=>({...prev,email:event.target.value}))}
        sx={{width: 400, marginBottom: 1,}}
      label="XX-XXXXXX-XXX@student.bahria.edu.pk"
       />
    <TextField  onChange={event=>setValues(prev=>({...prev,pass:event.target.value}))}
        sx={{width: 400,marginBottom:1,}}
      label="Password"
       />
       <Button variant="contained" onClick={handleSubmission} disabled={submitButtonDisabled}
       sx={{width: 400, marginTop:2,}} style={{backgroundColor:"#4A154B"}}>
        
       Sign In 
       </Button>
       <b className="error">{errorMsg}</b>
       <p>
        <Link to="/forgot-password">Forgot Password?</Link>
      </p>
      <p>New to Campus Connect?<Link to="/Signup"> Signup</Link></p>

    </div>
  )
}

export default Login;
