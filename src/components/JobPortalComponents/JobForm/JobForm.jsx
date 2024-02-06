import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { FormControlLabel, Checkbox, FormGroup } from '@mui/material';

const JobForm = () => {
  return (
    <div className='applicationForm'>
        <h2>Create Job</h2>
    <TextField label='Job Title'
      sx={{ width: 400, marginBottom: 1, color: 'black' }}
    />
    <TextField label='Company Name'
      sx={{ width: 400, marginBottom: 1 }}
    />
   <TextField label='Experience'
      sx={{ width: 400, marginBottom: 1 }}
    />
    <TextField label='Job Tags'
      sx={{ width: 400, marginBottom: 1 }}
    />
     <FormGroup>
     <h4>Timings</h4>
        <div  className='check-boxes'>
        <FormControlLabel
            control={<Checkbox/>}
            label="Full Time"
        />
        <FormControlLabel
            control={<Checkbox/>}
            label="Part Time"
        />
        </div>
    </FormGroup>
    <FormGroup>
    <h4>Location</h4>
        <div  className='check-boxes'>
           
        <FormControlLabel
            control={<Checkbox/>}
            label="In Office"
        />
        <FormControlLabel
            control={<Checkbox/>}
            label="Remote"
        />
        </div>
    </FormGroup>
   
    <Button
      component='label'
      variant='contained'
      style={{ width: 300, margin: 15 }}
    >
      Create
    </Button>
  </div>
  )
}

export default JobForm
