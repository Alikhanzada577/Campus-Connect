import React from 'react';
import MessageIcon from '@mui/icons-material/Message';
import PeopleIcon from '@mui/icons-material/People';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import AssuredWorkloadOutlinedIcon from '@mui/icons-material/AssuredWorkloadOutlined';
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined';
import { Link } from 'react-router-dom';

function LeftNav() {
  return (
    <div className="leftnav">
        <Link to="/home"><div className='icons'>
            <MessageIcon style={{ color:'white'}} ></MessageIcon>
        </div>
        </Link>
        <Link   to="/Communities"> <div className='icons'>
                <PeopleIcon 
                fontSize='large'
                style={{ color:'white'}}
                ></PeopleIcon>
            </div>
        </Link>
        <Link to="/Announcements"><div className='icons'>
            <CampaignOutlinedIcon fontSize='large' style={{ color:'white'}}></CampaignOutlinedIcon>
        </div>
        </Link>
        <Link to="/JobPortal"><div className='icons'>
            <AssuredWorkloadOutlinedIcon fontSize='large' style={{ color:'white'}}></AssuredWorkloadOutlinedIcon>
        </div>
        </Link>
        <Link to="/ApplicationForm"><div className='icons'>
            <ContactPageOutlinedIcon fontSize='large' style={{ color:'white'}}></ContactPageOutlinedIcon>
        </div>
        </Link>
    </div>
  )
}

export default LeftNav