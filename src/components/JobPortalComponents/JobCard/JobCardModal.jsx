import Button from "@mui/material/Button";
import React, { useContext, useState } from "react";
import { db, storage } from "../../../firebase/firebase-auth";
import { addDoc, collection, doc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import "./../job.css";

const JobCardModal = ({ closeModal, title, company, jobId,applicant}) => {
 
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    try {
      if (file) {
        const storageRef = ref(storage, `resumes/${jobId}_${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        await uploadTask;
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

        const applicationsRef = collection(db, "jobApplications");
        await addDoc(applicationsRef, {
          jobId: jobId,
          title: title,
          company: company,
          resumeUrl: downloadURL,
          applicant:applicant
        });

        setFile(null);
      }
    } catch (error) {
      console.error("Error uploading resume:", error);
    }
  };

  return (
    <>
      <div className="modal-wrapperr" onClick={closeModal}></div>
      <div className="modal-container">
        <h2>{title}</h2>
        <span>{company}</span>
        <input
          id="fileInput"
          type="file"
          accept="application/pdf"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <Button
          variant="contained"
          style={{ width: 300, margin: 15 }}
          onClick={() => document.getElementById("fileInput").click()}
        >
          Upload Resume
        </Button>
        <Button
          variant="contained"
          style={{ width: 300, margin: 15 }}
          onClick={handleUpload}
        >
          Submit
        </Button>
      </div>
    </>
  );
};

export default JobCardModal;
