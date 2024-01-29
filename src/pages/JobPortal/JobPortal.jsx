import React from 'react';
import Header from './../../components/JobPortalComponents/Header/index'
import SearchBar from '../../components/JobPortalComponents/SearchBar/index';
import JobCard from '../../components/JobPortalComponents/JobCard';
import '../../style.scss';
import LeftNav from '../../components/LeftNav/LeftNav';

const JobPortal = () => {
  return (
    <div className='jobportal'>
      <div className='Navigation'>
        <LeftNav/>
      </div>
      <div className='main'>
        <Header/>
       <SearchBar/>
       <JobCard/>
       <JobCard/>
       
       </div>
    </div>
  )
}

export default JobPortal
