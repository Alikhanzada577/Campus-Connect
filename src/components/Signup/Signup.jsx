import React ,{useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link , useNavigate} from 'react-router-dom';
import {createUserWithEmailAndPassword,updateProfile} from 'firebase/auth';
import { auth } from './../../firebase/firebase-auth';

const Signup = () => {
  const navigate=useNavigate();
const [values,setValues]=useState({
 name: "",
 email: "",
 pass: "",
});

const [errorMsg, setErrorMsg] = useState("");
const[submitButtonDisabled,setSubmitButtonDisabled]=useState(false);

const handleSubmission = () => {
  if (!values.name || !values.email || !values.pass) {
    setErrorMsg("Fill All Fields");
    return;
  }
  setErrorMsg("");
  setSubmitButtonDisabled(true);
  createUserWithEmailAndPassword(auth, values.email, values.pass)
    .then(async(res) => {
      setSubmitButtonDisabled(false);
      const user = res.user;
      await updateProfile(user,{
        displayName:values.name,
      });
     navigate("/");
    })
    .catch((err) => {
      setSubmitButtonDisabled(false);
      setErrorMsg(err.message);
    });
    
};
  
  return (
    <div className='container'>
      
      <h1>Sign Up to Campus Connect</h1>
      <p>We suggest using the email address you use at University</p>
      <TextField label="Full Name"  sx={{width: 400, marginBottom: 1,}}
        onChange={(event)=>
                  setValues((prev)=>({...prev,name: event.target.value}))
                }
       />
       <TextField label="XX-XXXXXX-XXX@student.bahria.edu.pk" sx={{width: 400, marginBottom: 1,}}
         onChange={(event)=>
          setValues((prev)=>({...prev,email: event.target.value}))
        }
       />
       <TextField label="Password"   sx={{width: 400,marginBottom:1,}}
          onChange={(event)=>
            setValues((prev)=>({...prev,pass: event.target.value}))
          }
        />
       
       <Button variant="contained"  onClick={handleSubmission} disabled={submitButtonDisabled}
       sx={{width: 400, marginTop:2,}} style={{backgroundColor:"#4A154B" }} >
        
       Sign Up
       </Button>
       <b className="error">{errorMsg}</b>
      <p>Already had an Account? <Link to="/Login">Sign In</Link></p>
    </div>
  )
}

export default Signup;
