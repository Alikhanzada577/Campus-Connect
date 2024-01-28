import React from 'react';
import Header from './../../components/JobPortalComponents/Header/index'
import SearchBar from '../../components/JobPortalComponents/SearchBar/index';
import JobCard from '../../components/JobPortalComponents/JobCard';
import '../../style.scss';
import LeftNav from '../../components/LeftNav/LeftNav';

const JobPortal = () => {
  return (
    <div className='Jobportal'  style={{ backgroundColor: '#45454C',height:'100%'}}>
      <div>
        <LeftNav/>
      </div>
      <div>
        <Header/>
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
