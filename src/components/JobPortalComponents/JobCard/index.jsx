import React from 'react'
import './../job.css';
import dayjs from 'dayjs';

const JobCard = ({job}) => {
  const{title,tags,isFulltime,isInOffice,experience,company}=job;
    const date1=dayjs(Date.now());
    const diffInDays=date1.diff('2023-10-9','day');
  return (
    <div className='Card-main'> 
      <div className='Card'>
            <div className='Card-left'>
                <h1>{title} - {company}</h1>
                <p>{isFulltime ? "Full Time" : "Part Time"} &#x2022; {experience} &#x2022; {isInOffice ? "In Office" : "Remote"}</p>
                        <div>
                        {tags && tags.map((tag, index) => (
                            <p key={index}>{tag}</p>
                        ))}
                        </div>
                </div>
             <div className='Card-right'>
                <p>Posted {diffInDays} days ago</p>
                <button>Apply</button>
            </div>
      </div>
    </div>
  )
}

export default JobCard
