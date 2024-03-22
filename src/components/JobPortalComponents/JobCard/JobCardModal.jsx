import Button from "@mui/material/Button";
import React, { useEffect } from "react";
import "./../job.css";
const JobCardModal = ({ closeModal, title, company }) => {
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  return (
    <>
      <div className="modal-wrapper" onClick={closeModal}></div>
      <div className="modal-container">
        <h2>{title}</h2>
        <span>{company}</span>
        <input type="file" accept="image/*" style={{ display: "none" }} />
        <Button variant="contained" style={{ width: 300, margin: 15 }}>
          Upload Resume
        </Button>
        <Button
          component="label"
          variant="contained"
          style={{ width: 300, margin: 15 }}
        >
          Submit
        </Button>
      </div>
    </>
  );
};

export default JobCardModal;
