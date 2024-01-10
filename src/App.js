import React, { useContext,Navigate } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword"; 
import Home from "./components/Home/Home";
import Announcements from './pages/Announcements/Announcements';
import ApplicationForm from './pages/ApplicationForm/ApplicationForm';
import JobPortal from './pages/JobPortal/JobPortal';
import Communities from './pages/Communities/Communities';
import { AuthContext } from './context/AuthContext';

function App() {

  
const {currentUser}=useContext(AuthContext);
//protected route made so that no user can directly access our app without Authentication
const ProtectRoute = ({children})=>{
  if(!currentUser){
    return <Navigate to="/"/>
  }else{
    return children;
  }
}
  return (
    <Router>
      <div className="App">
        <Routes> 
          <Route path="/" element={<Login/>} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/Home" 
              element={
                <ProtectRoute>
                <Home/>
                </ProtectRoute>} /> 
          <Route path="/Announcements" 
              element={
                <ProtectRoute>
                <Announcements/>
                </ProtectRoute>} /> 
          <Route path="/ApplicationForm" 
              element={
                <ProtectRoute>
                <ApplicationForm/>
                </ProtectRoute>} /> 
          <Route path="/Communities" 
              element={
                <ProtectRoute>
                <Communities/>
                </ProtectRoute>} /> 
          <Route path="/JobPortal" 
              element={
                <ProtectRoute>
                <JobPortal/>
                </ProtectRoute>} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
