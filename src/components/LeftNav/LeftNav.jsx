import React from 'react';
import MessageIcon from '@mui/icons-material/Message';
import PeopleIcon from '@mui/icons-material/People';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import AssuredWorkloadOutlinedIcon from '@mui/icons-material/AssuredWorkloadOutlined';
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined';

function LeftNav() {
  return (
    <div className="leftnav">
        <div className='icons'>
            <MessageIcon style={{ color:'white'}} ></MessageIcon>
        </div>
        <div className='icons'>
            <PeopleIcon 
            fontSize='large'
            style={{ color:'white'}}
            ></PeopleIcon>
        </div>
        <div className='icons'>
            <CampaignOutlinedIcon fontSize='large' style={{ color:'white'}}></CampaignOutlinedIcon>
        </div>
        <div className='icons'>
            <AssuredWorkloadOutlinedIcon fontSize='large' style={{ color:'white'}}></AssuredWorkloadOutlinedIcon>
        </div>
        <div className='icons'>
            <ContactPageOutlinedIcon fontSize='large' style={{ color:'white'}}></ContactPageOutlinedIcon>
        </div>
    </div>
  )
}

export default LeftNav