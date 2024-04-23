import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, storage, db } from './../../firebase/firebase-auth';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

const Signup = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
    file: null,
  });

  const [fieldErrors, setFieldErrors] = useState({
    name: '',
    email: '',
    pass: '',
    file: ''
  });

  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = async () => {
    try {
      if (!values.name || !values.email || !values.pass || !values.file) {
        setFieldErrors({
          name: !values.name ? 'Please enter your name' : '',
          email: !values.email ? 'Please enter your email' : '',
          pass: !values.pass ? 'Please enter your password' : '',
          file: !values.file ? 'Please select a profile image' : ''
        });
        return;
      }

      
      const allowedDomains = ['@student.bahria.edu.com', '@admin.bahria.edu.com', '@teacher.bahria.edu.com', '@alumni.bahria.edu.com'];
      const isValidDomain = allowedDomains.some(domain => values.email.endsWith(domain));
      if (!isValidDomain) {
        setFieldErrors({
          ...fieldErrors,
          email: 'Invalid email domain'
        });
        return;
      }

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
          console.error(error.message);
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

            await setDoc(doc(db, "userChats", res.user.uid), {});
            setSubmitButtonDisabled(false);
            navigate('/');
          });
        }
      );
    } catch (err) {
      setSubmitButtonDisabled(false);
      console.error(err.message);
    }
  };

  return (
    <div className='container'>
      <h1>Sign Up to Campus Connect</h1>
      <p>We suggest using the email address you use at University</p>
      <TextField
        label="Full Name"
        sx={{ width: 400, marginBottom: 1 }}
        onChange={(event) =>
          setValues((prev) => ({ ...prev, name: event.target.value }))
        }
      />
      {fieldErrors.name && <span className="error">{fieldErrors.name}</span>}
      <TextField
        label="XX-XXXXXX-XXX@student.bahria.edu.pk"
        sx={{ width: 400, marginBottom: 1 }}
        onChange={(event) =>
          setValues((prev) => ({ ...prev, email: event.target.value }))
        }
      />
      {fieldErrors.email && <span className="error">{fieldErrors.email}</span>}
      <TextField
        label="Password"
        sx={{ width: 400, marginBottom: 1 }}
        onChange={(event) =>
          setValues((prev) => ({ ...prev, pass: event.target.value }))
        }
      />
      {fieldErrors.pass && <span className="error">{fieldErrors.pass}</span>}
      <input
        style={{ display: "none" }}
        type='file'
        id="file"
        onChange={(event) =>
          setValues((prev) => ({ ...prev, file: event.target.files[0] }))
        }
      />
      <label htmlFor="file" >
        <AddPhotoAlternateIcon style={{ fontSize: 30 }} />
        <span style={{ marginBottom: "500px" }}>Add your Profile Image</span>
      </label>
      {fieldErrors.file && <span className="error">{fieldErrors.file}</span>}
      <Button
        variant="contained"
        onClick={handleSubmission}
        disabled={submitButtonDisabled}
        sx={{ width: 400, marginTop: 2 }}
        style={{ backgroundColor: "#4A154B" }}
      >
        Sign Up
      </Button>
      <p>Already had an Account? <Link to="/">Sign In</Link></p>
    </div>
  );
}

export default Signup;
