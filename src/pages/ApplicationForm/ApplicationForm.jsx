import React from 'react'
import "./../../style.scss";
import LeftNav from '../../components/LeftNav/LeftNav';
import FormSubmission from '../../components/Application/FormSubmission';
import Header from '../../components/Application/Header';


const ApplicationForm = () => {
  return (
    <div className='application'>
      <div className='Navigation'>
      <LeftNav/>
      </div>
      <div className='form'>
        <Header/>
        <FormSubmission/>
      </div>
    </div>
  )
}

export default ApplicationForm
