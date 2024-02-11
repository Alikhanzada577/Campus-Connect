import React, {useState } from 'react';
import { db } from '../../../firebase/firebase-auth';
import { collection, addDoc } from 'firebase/firestore';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControlLabel, Checkbox, FormGroup } from '@mui/material';

const JobForm = () => {
    const [tags, setTags] = useState([]);
    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [experience, setExperience] = useState("");
    const [isFullTime, setIsFullTime] = useState(false);
    const [isInOffice, setIsInOffice] = useState(false);

    const handleTagInput = (event) => {
        const inputTags = event.target.value.split(/[ ,]+/); 
        setTags(inputTags.filter(tag => tag.trim() !== ''));
    };

    const handleTimingChange = (isFullTimeSelected) => {
      setIsFullTime(isFullTimeSelected);
      if (isFullTimeSelected) {
        setIsFullTime(true); // Ensure only one option is selected for location
      } else {
        setIsFullTime(false);
      }
  };
  
  const handleLocationChange = (isInOfficeSelected) => {
      setIsInOffice(isInOfficeSelected);
      if (isInOfficeSelected) {
        setIsInOffice(true);// Ensure only one option is selected for timing
      } else {
        setIsInOffice(false);
      }
  };
  

    const handleSubmit = async () => {
        // Only allow submission if one option is selected from each group
        if ((isFullTime || !isFullTime) && (isInOffice || !isInOffice)) {
            // Prepare data to be stored
            const jobData = {
                title: title,
                company: company,
                experience: experience,
                tags: tags,
                isFullTime: isFullTime,
                isInOffice: isInOffice,
            };

            try {
                const docRef = await addDoc(collection(db, 'jobs'), jobData);
                setTitle("");
                setCompany("");
                setExperience("");
                setTags([]);
                setIsFullTime(false);
                setIsInOffice(false);
            } catch (error) {
                console.error("Error adding job: ", error);
            }
        } else {
            console.error("Please select one option from each group.");
        }
    };
     
    return (
        <div className='applicationForm'>
            <h2>Create Job</h2>
            <TextField 
              label='Job Title'
              sx={{ width: 400, marginBottom: 1, color: 'black' }}
              onChange={(e) => setTitle(e.target.value)}
              value={title} // Use title state directly as value
          />
          <TextField 
              label='Company Name'
              sx={{ width: 400, marginBottom: 1 }}
              onChange={(e) => setCompany(e.target.value)}
              value={company} // Use company state directly as value
          />
          <TextField 
              label='Experience'
              sx={{ width: 400, marginBottom: 1 }}
              onChange={(e) => setExperience(e.target.value)}
              value={experience} // Use experience state directly as value
          />
          <TextField 
              label='Job Tags'
              sx={{ width: 400, marginBottom: 1 }}
              onChange={handleTagInput}
              
          />

<FormGroup>
    <h4>Timings</h4>
    <div className='check-boxes'>
        <FormControlLabel
            control={<Checkbox checked={isFullTime} onChange={() => handleTimingChange(true)} />}
            label="Full Time"
        />
        <FormControlLabel
            control={<Checkbox checked={!isFullTime} onChange={() => handleTimingChange(false)} />}
            label="Part Time"
        />
    </div>
</FormGroup>
<FormGroup>
    <h4>Location</h4>
    <div className='check-boxes'>
        <FormControlLabel
            control={<Checkbox checked={isInOffice} onChange={() => handleLocationChange(true)} />}
            label="In Office"
        />
        <FormControlLabel
            control={<Checkbox checked={!isInOffice} onChange={() => handleLocationChange(false)} />}
            label="Remote"
        />
    </div>
</FormGroup>
            <Button
                component='label'
                variant='contained'
                style={{ width: 300, margin: 15 }}
                onClick={handleSubmit}
            >
                Create
            </Button>
        </div>
    );
}

export default JobForm;