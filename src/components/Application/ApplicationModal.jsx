import { useEffect } from "react";
import "./application.css";
const AnnouncementModal = ({
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
          <img src={fileUrl} alt="" />
        </div>
      </div>
    </>
  );
};
export default AnnouncementModal;
