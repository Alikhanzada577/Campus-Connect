import React from 'react';
import './../job.css';

const SearchBar = ({ handleClick }) => { 

  return (
    <div className='searchContainer'>
      <select id="jobRoleSelect" defaultValue="">
        <option value="" disabled hidden selected>Job Role</option>
        <option value="iOS Developer">iOS Developer</option>
        <option value="Android Developer">Android Developer</option>
        <option value="Web Developer">Web Developer</option>
      </select>
      <select id="jobTypeSelect" defaultValue="">
        <option value="" disabled hidden selected>Job Type</option>
        <option value="Full Time">Full Time</option>
        <option value="Part Time">Part Time</option>
        <option value="Contract">Contract</option>
      </select>
      <select id='locationSelect' defaultValue="">
        <option value="" disabled hidden selected>Location</option>
        <option value="Remote">Remote</option>
        <option value="Hybrid">Hybrid</option>
        <option value="In-office">In-Office</option>
      </select>
      <select id='experienceSelect' defaultValue="">
        <option value="" disabled hidden selected>Experience</option>
        <option value="Fresher">Fresher</option>
        <option value="Junior Level">Junior Level</option>
        <option value="Mid Level">Mid Level</option>
        <option value="Senior Level">Senior Level</option>
      </select>
      <button className='Searchbtn' onClick={handleClick}>Search</button> {/* Call handleClick on button click */}
    </div>
  );
};

export default SearchBar;