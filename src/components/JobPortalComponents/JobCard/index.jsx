import React from 'react'
import './../job.css';
import dayjs from 'dayjs';

const JobCard = () => {
    const skills = ["JavaScript","React","Nodejs"];
    const date1=dayjs(Date.now());
    const diffInDays=date1.diff('2023-10-6','day');
  return (
    <div className='Card-main'>
      <div className='Card'>
            <div className='Card-left'>
                <h1>FrontEnd Developer - Amazon</h1>
                <p>Full Time &#x2022; Fresher &#x2022; In-Office</p>
                        <div>
                            {skills.map((skill,index)=>(
                                    <p key={index}>{skill}</p>
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
