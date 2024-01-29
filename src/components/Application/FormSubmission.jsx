import React from 'react';
import TextField from'@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';


const FormSubmission = () => {
  return (
    <div className='applicationForm'>
      <TextField  label="Full Name"sx={{width: 400,marginBottom:1,}} />
      <TextField label="Enrollment" sx={{width: 400,marginBottom:1,}} />
      <TextField label="Email" sx={{width: 400,marginBottom:1,}}/>
      <FormControl sx={{width: 400,marginBottom:1,}}>
      <InputLabel >Application For</InputLabel>
            <Select label="Application For">
                <MenuItem>Ten</MenuItem>
                <MenuItem>Twenty</MenuItem>
                <MenuItem>Thirty</MenuItem>
            </Select>
      </FormControl>
      
      <Button component="label" style={{ backgroundColor: 'transparent', color: 'Black',border:'1px solid black',width: 400,marginBottom:1, }} startIcon={<CloudUploadIcon />}>
        Upload Documents
      </Button>
      <Button component="label" variant="contained"  style={{width: 600,margintop:4, }} >
        Submit Application
      </Button>
    </div>
  )
}

export default FormSubmission
