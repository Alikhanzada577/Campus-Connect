import React,{ useState, useEffect }  from 'react'
import "./../../style.scss";
import LeftNav from '../../components/LeftNav/LeftNav';
import FormSubmission from '../../components/Application/FormSubmission';
import Header from '../../components/Application/Header';
import ApplicationCard from '../../components/Application/ApplicationCard';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase-auth';

const ApplicationForm = () => {

  const [applications, setApplications] = useState([]); 

  useEffect(() => {
   
    const fetchApplications = async () => {
      try {
        const colref = collection(db, 'applications');
        const snapshot = await getDocs(colref);
        const applicationsData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        setApplications(applicationsData);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchApplications();
  }, []); 

  return (
    <div className='application'>
      <div className='Navigation'>
      <LeftNav/>
      </div>
      <div className='form'>
        <Header/>
        <FormSubmission/> 
        {applications.map(application => (
          <ApplicationCard key={application.id} application={application} />
        ))}
       
      </div> 
    </div>
  )
}

export default ApplicationForm
