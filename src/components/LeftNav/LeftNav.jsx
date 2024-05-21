import React, { useContext, useState } from "react";
import MessageIcon from "@mui/icons-material/Message";
import PeopleIcon from "@mui/icons-material/People";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import AssuredWorkloadOutlinedIcon from "@mui/icons-material/AssuredWorkloadOutlined";
import NotificationsIcon from '@mui/icons-material/Notifications';
import ContactPageOutlinedIcon from "@mui/icons-material/ContactPageOutlined";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";
import { AuthContext } from "../../context/AuthContext";
import Popover from "@mui/material/Popover";
import "./../../style.scss";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase-auth";

function LeftNav() {
  const { currentUser } = useContext(AuthContext);
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  return (
    <div className="leftnav">
      <Link to="/home">
        <Tooltip title="Messages" placement="right">
          <div
            className={`icons ${location.pathname === "/home" ? "active" : ""}`}
          >
            <MessageIcon
              style={{ color: "white", transform: "translate(0, 100%)" }}
            ></MessageIcon>
          </div>
        </Tooltip>
      </Link>
      <Link to="/Communities">
        <Tooltip title="Communities" placement="right">
          <div
            className={`icons ${
              location.pathname === "/Communities" ? "active" : ""
            }`}
          >
            <PeopleIcon
              fontSize="large"
              style={{ color: "white", transform: "translate(0, 100%)" }}
            ></PeopleIcon>
          </div>
        </Tooltip>
      </Link>
      <Link to="/Announcements">
        <Tooltip title="Announcements" placement="right">
          <div
            className={`icons ${
              location.pathname === "/Announcements" ? "active" : ""
            }`}
          >
            <CampaignOutlinedIcon
              fontSize="large"
              style={{ color: "white", transform: "translate(0, 100%)" }}
            ></CampaignOutlinedIcon>
          </div>
        </Tooltip>
      </Link>
      <Link to="/JobPortal">
        <Tooltip title="Job Portal" placement="right">
          <div
            className={`icons ${
              location.pathname === "/JobPortal" ? "active" : ""
            }`}
          >
            <AssuredWorkloadOutlinedIcon
              fontSize="large"
              style={{ color: "white", transform: "translate(0, 100%)" }}
            ></AssuredWorkloadOutlinedIcon>
          </div>
        </Tooltip>
      </Link>
      <Link to="/ApplicationForm">
        <Tooltip title="Application Form" placement="right">
          <div
            className={`icons ${
              location.pathname === "/ApplicationForm" ? "active" : ""
            }`}
          >
            <ContactPageOutlinedIcon
              fontSize="large"
              style={{ color: "white", transform: "translate(0, 100%)" }}
            ></ContactPageOutlinedIcon>
          </div>
        </Tooltip>
      </Link>
      <Link to="/Notifications">
        <Tooltip title="Application Form" placement="right">
          <div
            className={`icons ${
              location.pathname === "/Notifications" ? "active" : ""
            }`}
          >
            <NotificationsIcon
              fontSize="large"
              style={{ color: "white", transform: "translate(0, 100%)" }}
            ></NotificationsIcon>
          </div>
        </Tooltip>
      </Link>
      <div
        className="user"
        aria-describedby={open ? "user-popover" : undefined}
        onClick={handlePopoverOpen}
      >
        <img src={currentUser.photoURL} alt="" />
      </div>
      <Popover
        id="user-popover"
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        PaperProps={{
            style: {
              backgroundColor: "#001835", 
              width: "150px", 
              padding: "10px", 
              border:"2px solid white",
            },
          }}
      >
       
          <button style={{color:"white"}}onClick={handleLogout}>Logout</button>
       
      </Popover>
    </div>
  );
}

export default LeftNav;
