import React, { useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import JobCardModal from "./JobCardModal";
import "./../job.css";
import dayjs from "dayjs";
import AppliedJobs from "./AppliedJobs";
import { collection, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase-auth';

const JobCard = ({ job, jobId }) => {
  const { currentUser } = useContext(AuthContext);
  const { title, tags, isFulltime, isInOffice, experience, company } = job;
  const [showModal, setShowModal] = useState(false);
  const [showAppliedModal, setShowAppliedModal] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false); 
  const date1 = dayjs(Date.now());
  const diffInDays = date1.diff("2023-10-9", "day");

  const closeModal = () => setShowModal(false);
  const closeAppliedModal = () => setShowAppliedModal(false);

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, 'jobs', jobId));
      setIsDeleted(true); 
      console.log("Job card deleted successfully");
    } catch (error) {
      console.error("Error deleting job card:", error);
    }
  };

  return (
    <>
      {isDeleted ? null : ( 
        <div className="Card-main">
          <div className="Card">
            <div className="Card-left">
              <h1>
                {title} - {company}
              </h1>
              <p>
                {isFulltime ? "Full Time" : "Part Time"} &#x2022; {experience}{" "}
                &#x2022; {isInOffice ? "In Office" : "Remote"}
              </p> 
              <div>
                {tags && tags.map((tag, index) => <p key={index}>{tag}</p>)}
              </div>
            </div>
            <div className="Card-right">
              <p>Posted {diffInDays} days ago</p>

              {currentUser && currentUser.role !== 'admin' && 
              <button onClick={() => setShowModal(true)}>Apply</button>}
              {showModal && (
                <JobCardModal
                  title={title}
                  company={company}
                  jobId={jobId} 
                  closeModal={closeModal}
                  applicant={currentUser.displayName}
                />
              )}
              {currentUser && currentUser.role === 'admin' && 
              <button onClick={() => setShowAppliedModal(true)}>Applicants</button>}
              {showAppliedModal && (
                <AppliedJobs
                  closeModal={closeAppliedModal}
                  jobId={jobId}
                />
              )}

              {currentUser && currentUser.role === 'admin' && 
              <button onClick={handleDelete}>Delete</button>}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JobCard;