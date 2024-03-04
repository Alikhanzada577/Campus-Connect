import React from 'react';
import MessageIcon from '@mui/icons-material/Message';
import PeopleIcon from '@mui/icons-material/People';
import CampaignOutlinedIcon from '@mui/icons-material/CampaignOutlined';
import AssuredWorkloadOutlinedIcon from '@mui/icons-material/AssuredWorkloadOutlined';
import ContactPageOutlinedIcon from '@mui/icons-material/ContactPageOutlined';
import { Link, useLocation } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';

function LeftNav() {
  const location = useLocation();

  return (
    <div className="leftnav">
        <Link to="/home">
            <Tooltip title="Messages" placement="right">
                <div className={`icons ${location.pathname === '/home' ? 'active' : ''}`}>
                    <MessageIcon style={{ color:'white',transform: "translate(0, 100%)"}} ></MessageIcon>
                </div>
            </Tooltip>
        </Link>
        <Link to="/Communities">
            <Tooltip title="Communities" placement="right">
                <div className={`icons ${location.pathname === '/Communities' ? 'active' : ''}`}>
                    <PeopleIcon 
                        fontSize='large'
                        style={{ color:'white',transform: "translate(0, 100%)"}}
                    ></PeopleIcon>
                </div>
            </Tooltip>
        </Link>
        <Link to="/Announcements">
            <Tooltip title="Announcements" placement="right">
                <div className={`icons ${location.pathname === '/Announcements' ? 'active' : ''}`}>
                    <CampaignOutlinedIcon fontSize='large' style={{ color:'white',transform: "translate(0, 100%)"}}></CampaignOutlinedIcon>
                </div>
            </Tooltip>
        </Link>
        <Link to="/JobPortal">
            <Tooltip title="Job Portal" placement="right">
                <div className={`icons ${location.pathname === '/JobPortal' ? 'active' : ''}`}>
                    <AssuredWorkloadOutlinedIcon fontSize='large' style={{ color:'white',transform: "translate(0, 100%)"}}></AssuredWorkloadOutlinedIcon>
                </div>
            </Tooltip>
        </Link>
        <Link to="/ApplicationForm">
            <Tooltip title="Application Form" placement="right">
                <div className={`icons ${location.pathname === '/ApplicationForm' ? 'active' : ''}`}>
                    <ContactPageOutlinedIcon fontSize='large' style={{ color:'white',transform: "translate(0, 100%)"}}></ContactPageOutlinedIcon>
                </div>
            </Tooltip>
        </Link>
    </div>
  )
}

export default LeftNav;