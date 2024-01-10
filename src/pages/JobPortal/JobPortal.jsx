import React from 'react';
import SearchBar from '../../components/JobPortalComponents/SearchBar/index';
import JobCard from '../../components/JobPortalComponents/JobCard';
import '../../style.scss';

const JobPortal = () => {
  return (
    <div >
      <div style={{ backgroundColor: '#45454C',height:'100%'}}>
       <SearchBar/>
       <JobCard/>
       <JobCard/>
       <JobCard/>
       <JobCard/>
       </div>
    </div>
  )
}

export default JobPortal
