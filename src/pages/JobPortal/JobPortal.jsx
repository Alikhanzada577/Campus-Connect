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
  const [filter, setFilter] = useState({}); // Added state for filters

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

  const handleClick = () => { // Assuming this is for search button in SearchBar
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
        <SearchBar handleClick={handleClick} /> {/* Pass handleClick to SearchBar */}
        {jobs
          .filter((job) => {
            let matchesFilter = true; // Assume match initially
            for (const [key, value] of Object.entries(filter)) {
              if (value) { // If a filter is applied
                if (key === "jobType" || key === "location") { // Handle jobType and location specially
                  matchesFilter = value === job[key] || (key === "jobType" && value === "Part Time" && !job.isFulltime); // OR logic for job type and location
                } else {
                  matchesFilter =
                    key === "jobRole" ? job.title.includes(value) : // Case-specific comparisons for other filters
                    key === "experience" ? job.experience === value :
                    false; // Handle unexpected cases
                }
                if (!matchesFilter) break; // Stop early if a filter doesn't match
              }
            }
            return matchesFilter;
          })
          .map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        {currentUser && currentUser.role === 'admin' && <JobForm />}

      </div>

    </div>
  );
};

export default JobPortal;
