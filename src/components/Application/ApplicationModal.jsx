import { useEffect } from "react";
import "./application.css";
import Button from '@mui/material/Button';

const ApplicationModal = ({
  closeModal,
  applicationPurpose,
  email,
  enrollment,
  name,
  fileUrl,
}) => {
  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  const handleDownload = () => {
    // Create a temporary anchor element
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = "application.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="modal-wrapper" onClick={closeModal}></div>
      <div className="modalApplication-container">
        <div className="data-container">
          <h3>
            <b>Name:</b>
            {name}
          </h3>
          <h3>
            <b>Enrollment:</b>
            {enrollment}
          </h3>
          <h3>
            <b>Application Purpose:</b>
            {applicationPurpose}
          </h3>
          <h3>
            <b>Email:</b>
            {email}
          </h3>
        </div>
        <div className="applicationImage-container">
          <iframe src={fileUrl}/>
          <Button variant="contained" onClick={handleDownload}>Download</Button>
         
        </div>
      </div>
    </>
  );
};

export default ApplicationModal;
