import React, { useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import JobCardModal from "./JobCardModal";
import "./../job.css";
import dayjs from "dayjs";
import AppliedJobs from "./AppliedJobs";
import {doc, deleteDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase-auth";

const JobCard = ({ job, jobId }) => {
  const { currentUser } = useContext(AuthContext);
  const {
    title,
    tags,
    isFulltime,
    isInOffice,
    experience,
    company,
    createdAt,
    isUniversityJob,
    otherCompanyLink,
  } = job;
  const [showModal, setShowModal] = useState(false);
  const [showAppliedModal, setShowAppliedModal] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const createdAtDate = createdAt && createdAt.toDate();
  const diffInDays = createdAtDate && dayjs().diff(dayjs(createdAtDate), "day");

  const closeModal = () => setShowModal(false);
  const closeAppliedModal = () => setShowAppliedModal(false);

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "jobs", jobId));
      setIsDeleted(true);
      alert("Job deleted successfully");
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
              <p>Posted {diffInDays} day ago</p>

              {currentUser &&
                currentUser.role !== "admin" &&
                isUniversityJob && (
                  <button onClick={() => setShowModal(true)}>Apply</button>
                )}

              {currentUser &&
                currentUser.role !== "admin" &&
                !isUniversityJob && (
                  <a
                    href={otherCompanyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button>Company Website</button>
                  </a>
                )}

              {showModal && (
                <JobCardModal
                  title={title}
                  company={company}
                  jobId={jobId}
                  closeModal={closeModal}
                  applicant={currentUser.displayName}
                />
              )}
              {currentUser && currentUser.role === "admin" && isUniversityJob && (
                <button onClick={() => setShowAppliedModal(true)}>
                  Applicants
                </button>
              )}
              {showAppliedModal && (
                <AppliedJobs closeModal={closeAppliedModal} jobId={jobId} />
              )}

              {currentUser && currentUser.role === "admin" && (
                <button onClick={handleDelete}>Delete</button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default JobCard;
