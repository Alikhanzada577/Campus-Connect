import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase/firebase-auth';
import { collection,query,where,getDocs } from 'firebase/firestore';

const AppliedJobs = ({ jobId,closeModal}) => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchApplicants = async () => {
      const applicantsRef = collection(db, 'jobApplications');
      const applicantsQuery = query(applicantsRef, where('jobId', '==', jobId));
      const applicantsSnapshot = await getDocs(applicantsQuery);
      const applicantsData = applicantsSnapshot.docs.map((doc) => doc.data());
      setApplicants(applicantsData);
      setLoading(false);
    };

    fetchApplicants();
  }, [jobId]);

  return (
    <>
    <div className="modal-wrapper" onClick={closeModal}></div>
    <div className="modal-container">
      <h2>Applicants</h2>
     {loading ? (
          <div className="loading-indicator">
            <p>Loading...</p>
          </div>
        ) : (
          <ul>
            {applicants.map((applicant) => (
              <li key={applicant.id} className='applicant'>
                <p>{applicant.applicant}</p>
                <p><a href={applicant.resumeUrl}>View Resume</a></p>
              </li>
            ))}
          </ul>
        )}
    </div>
    </>
  );
};

export default AppliedJobs;