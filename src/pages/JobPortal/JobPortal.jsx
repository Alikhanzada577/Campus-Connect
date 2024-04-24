import React, { useState, useEffect, useContext } from 'react';
import Header from './../../components/JobPortalComponents/Header/index';
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
  const { currentUser } = useContext(AuthContext);
  const [filter, setFilter] = useState({}); 
 
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

  const handleClick = () => { 
    const selectedFilters = {
      jobRole: document.getElementById("jobRoleSelect").value,
      jobType: document.getElementById("jobTypeSelect").value,
      location: document.getElementById("locationSelect").value,
      experience: document.getElementById("experienceSelect").value,
    };
    setFilter(selectedFilters);
  };

  return (
    <div className='jobportal'>
      <div className='Navigation'>
        <LeftNav />
      </div>
      <div className='main'>
        <Header />
        <SearchBar handleClick={handleClick} /> 
        {jobs
  .filter((job) => {
    console.log("Filtering Job:", job.title);
    let matchesFilter = true;
    for (const [key, value] of Object.entries(filter)) {
      console.log("Filter Key:", key, "Filter Value:", value);
      if (value) {
        if (key === "jobType") {
          if (value !== (job.isFulltime ? "Full Time" : "Part Time")) {
            matchesFilter = false;
          }
        }
        if (key === "location") {
          if (value !== (job.isInOffice ? "In-office" : "Remote")) {
            matchesFilter = false;
          }
        }
        if (key === "jobRole" && !job.title.includes(value)) {
          matchesFilter = false;
        }
        if (key === "experience" && job.experience !== value) {
          matchesFilter = false;
        }
      }
    }
    console.log("Matches Filter:", matchesFilter);
    return matchesFilter;
  })
  .map((job) => (
    <JobCard key={job.id} job={job} jobId={job.id} />
  ))}
        {currentUser && currentUser.role === 'admin' && <JobForm />}
 
      </div>

    </div>
  );
};

export default JobPortal;
