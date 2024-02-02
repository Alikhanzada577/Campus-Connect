import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { db, storage } from './../../firebase/firebase-auth';
import { addDoc, collection, updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

const FormSubmission = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [enrollment, setEnrollment] = useState('');
  const [applicationFor, setApplicationFor] = useState('');
  const [file, setFile] = useState(null);
  const [isInputLabelShrunk, setIsInputLabelShrunk] = useState(false);

  const handleApplicationForChange = (event) => {
    setApplicationFor(event.target.value);
    setIsInputLabelShrunk(true);
  };

  const value = collection(db, 'applications');
  let fileInputRef;
  
  const handleFileChange = (event) => {
    const selectedFile = event.target.files;
    setFile(selectedFile);
  };

  const handleCreate = async () => {
    try {
      const docRef = await addDoc(value, {
        name: fullName,
        email: email,
        enrollment: enrollment,
        applicationPurpose: applicationFor,
        fileUrl: null,
      });
      if (file) {
        const storageRef = ref(storage, `${docRef.id}_${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        await uploadTask;

        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        await updateDoc(docRef, {
          fileUrl: downloadURL,
        });

        
      }
    } catch (error) {
      console.error('Error creating application:', error);
    }
  };

  return (
    <div className='applicationForm'>
      <TextField
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        label='Full Name'
        sx={{ width: 400, marginBottom: 1, color: 'black' }}
      />
      <TextField
        value={enrollment}
        onChange={(e) => setEnrollment(e.target.value)}
        label='Enrollment'
        sx={{ width: 400, marginBottom: 1 }}
      />
      <TextField
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        label='Email'
        sx={{ width: 400, marginBottom: 1 }}
      />
      <FormControl sx={{ width: 400, marginBottom: 1 }}>
        <InputLabel shrink={isInputLabelShrunk}>Application For</InputLabel>
        <Select
          label='Application For'
          value={applicationFor}
          onChange={handleApplicationForChange}
        >
          <MenuItem sx={{ backgroundColor: 'gray' }} value='Transcript'>
            Transcript
          </MenuItem>
          <MenuItem sx={{ backgroundColor: 'gray' }} value='Degree'>
            Degree
          </MenuItem>
          <MenuItem sx={{ backgroundColor: 'gray' }} value='Course Registration'>
            Course Registration
          </MenuItem>
        </Select>
      </FormControl>

      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
        ref={(fileInput) => (fileInputRef = fileInput)}
      />
      <Button
        variant='contained'
        onClick={() => fileInputRef.click()}
        style={{ width: 300, margin: 15 }}
      >
        Choose File
      </Button>

  

      <Button
        component='label'
        variant='contained'
        style={{ width: 300, margin: 15 }}
        onClick={handleCreate}
      >
        Submit Application
      </Button>
    </div>
  );
};

export default FormSubmission;
