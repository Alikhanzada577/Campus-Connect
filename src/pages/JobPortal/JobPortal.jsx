import React,{useState,useEffect,useContext} from 'react';
import Header from './../../components/JobPortalComponents/Header/index'
import SearchBar from '../../components/JobPortalComponents/SearchBar/index';
import JobCard from '../../components/JobPortalComponents/JobCard';
import '../../style.scss';
import LeftNav from '../../components/LeftNav/LeftNav';
import JobForm from '../../components/JobPortalComponents/JobForm/JobForm';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase-auth';
import { AuthContext } from '../../context/AuthContext';

const JobPortal = () => {
  const [jobs, setJobs] = useState([]);
  const {currentUser}=useContext(AuthContext);
  useEffect(() => {
   
    const fetchJobs = async () => {
      try {
        const colref = collection(db, 'jobs');
        const snapshot = await getDocs(colref);
        const jobsData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setJobs(jobsData);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchJobs();
  }, []); 

  return (
    <div className='jobportal'>
      <div className='Navigation'>
        <LeftNav/>
      </div>
      <div className='main'> 
        <Header/>
       <SearchBar/>
       {jobs.map(job=>(
       <JobCard key={job.id} job={job}/>
       ))}
       {currentUser && currentUser.role==='admin' &&( <JobForm/>)}
      
       </div>
       
    </div>
  )
}

export default JobPortal
