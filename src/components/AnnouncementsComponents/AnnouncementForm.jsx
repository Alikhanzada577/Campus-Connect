import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Announcements.css'
const AnnouncementForm = () => {
  return (
    <div className='AnnouncementForm'>
        <h2>Annoucement Form</h2>
      <TextField label='Title' sx={{ width: 400, marginBottom: 1 }}/>
      <TextField
      label='Description'
        placeholder="MultiLine with rows: 2 and rowsMax: 4"
        multiline
        rows={2}
        maxRows={4}
        sx={{ width: 400, marginBottom: 1 }}/>
        <TextField label='Tags'
            sx={{ width: 400, marginBottom: 1 }}
             />
        <input type="file" />
        <Button
        component='label'
        variant='contained'
        style={{ width: 300, margin: 15 }}>
        Create Announcement
      </Button>
    </div>
  )
}

export default AnnouncementForm
