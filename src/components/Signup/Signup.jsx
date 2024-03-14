import React ,{useState} from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link , useNavigate} from 'react-router-dom';
import {createUserWithEmailAndPassword,updateProfile} from 'firebase/auth';
import { auth,storage,db } from './../../firebase/firebase-auth';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 


const Signup = () => {
  const navigate=useNavigate();
  const [values,setValues]=useState({
    name: "",
    email: "",
    pass: "",
    file:null,
  });

  const [errorMsg, setErrorMsg] = useState("");
  const[submitButtonDisabled,setSubmitButtonDisabled]=useState(false);

  const handleSubmission = async () => {
    try {
      if (!values.name || !values.email || !values.pass || !values.file) {
        setErrorMsg('Fill All Fields');
        return;
      }

      setErrorMsg('');
      setSubmitButtonDisabled(true);

      const res = await createUserWithEmailAndPassword(auth, values.email, values.pass);
      const user = res.user;

      
      let role = '';
      if (values.email.endsWith('@admin.bahria.edu.com')) {
        role = 'admin';
      } else if (values.email.endsWith('@teacher.bahria.edu.com')) {
        role = 'teacher';
      } else if (values.email.endsWith('@student.bahria.edu.com')) {
        role = 'student';
      } else if (values.email.endsWith('@alumni.bahria.edu.com')) {
        role = 'alumni';
      } else {
        role = 'user';
      }

      const storageRef = ref(storage, `${values.name}_${Date.now()}`);
      const uploadTask = uploadBytesResumable(storageRef, values.file);

      uploadTask.on(
        'state_changed',
        null,
        (error) => {
          setSubmitButtonDisabled(false);
          setErrorMsg(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(user, {
              displayName: values.name,
              emailid: values.email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, 'users', res.user.uid), {
              uid: res.user.uid,
              displayName: values.name,
              emailid: values.email,
              photoURL: downloadURL,
              role: role, 
            });

            await setDoc(doc(db,"userChats",res.user.uid),{});
            setSubmitButtonDisabled(false);
            navigate('/');
          });
        }
      );
    } catch (err) {
      setSubmitButtonDisabled(false);
      setErrorMsg(err.message);
    }
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
       <input style={{display:"none"}} type='file'  id="file"
             onChange={(event)=>
              setValues((prev)=>({...prev,file: event.target.files[0]}))
            }
       />
       <label htmlFor="file" >
          <AddPhotoAlternateIcon style={{ fontSize: 30 }}
          ></AddPhotoAlternateIcon>
          <span style={{marginBottom:"500px"}}>Add your Profile Image</span>
       </label>
       <Button variant="contained"  onClick={handleSubmission} disabled={submitButtonDisabled}
       sx={{width: 400, marginTop:2,}} style={{backgroundColor:"#4A154B" }} >
        
       Sign Up
       </Button>
       <b className="error">{errorMsg}</b>
      <p>Already had an Account? <Link to="/">Sign In</Link></p>
    </div>
  )
}

export default Signup;
