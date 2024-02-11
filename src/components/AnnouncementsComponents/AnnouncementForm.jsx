import React,{useState} from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { db,storage } from '../../firebase/firebase-auth';
import { collection, addDoc,updateDoc } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import './Announcements.css'
const AnnouncementForm = () => {
    const [tags, setTags] = useState([]);
    const [title, setTitle] = useState("");
    const [file, setFile] = useState(null);
    const [breifDesc, setBreifDesc] = useState("");
    const [desc, setDesc] = useState("");

    const handleTagInput = (event) => {
        const inputTags = event.target.value.split(/[ ,]+/); 
        setTags(inputTags.filter(tag => tag.trim() !== ''));
      };
      const handleFileChange = (event) => {
        const selectedFile = event.target.files;
        setFile(selectedFile);
      };
      const handleSubmit =async()=>{
        const announcementData={
          announcementTitle:title,
          briefDescription:breifDesc,
          description:desc,
          announcementTags:tags,
          fileUrl:null
        };
        try{
          const docRef=await addDoc(collection(db,'Announcements'),announcementData);
          if (file) {
            const storageRef = ref(storage, `${docRef.id}_${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);
            await uploadTask;
    
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            await updateDoc(docRef, {
              fileUrl: downloadURL,
            });
          }
          setTitle("");
          setBreifDesc("");
          setDesc("");
          setTags([]);
        }catch(error){
          console.error("Error adding new Announcement",error);
        }
      };
     
  return (
    <div className='AnnouncementForm'>
        <h2>Annoucement Form</h2>
      <TextField label='Title' sx={{ width: 400, marginBottom: 1 }}
       value={title} onChange={(e)=>setTitle(e.target.value)}/>
      <TextField
      label='Brief Description'
        multiline
        rows={2}
        maxRows={2}
        sx={{ width: 400, marginBottom: 1 }}
        value={breifDesc}
        onChange={(e)=>setBreifDesc(e.target.value)}
        />
        
        <TextField
      label='Detailed Description'
        multiline
        rows={3}
        maxRows={4}
        sx={{ width: 400, marginBottom: 1 }}
        value={desc}
        onChange={(e)=>setDesc(e.target.value)}/>
      <TextField
        label='Tags'
        sx={{ width: 400, marginBottom: 1 }}
        onChange={handleTagInput}
      />   
        <input type="file" 
        accept="image/*"
        onChange={handleFileChange} />
        <Button
        component='label'
        variant='contained'
        style={{ width: 300, margin: 15 }}
        onClick={handleSubmit}>
        Create Announcement
      </Button>
    </div>
  )
}

export default AnnouncementForm
