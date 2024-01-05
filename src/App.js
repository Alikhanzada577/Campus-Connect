// App.js
import React, { useContext,Navigate } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword"; 
import Home from "./components/Home/Home";
import { AuthContext } from './context/AuthContext';

function App() {

  
const {currentUser}=useContext(AuthContext);
console.log(currentUser)
//protected route made so that no user can directly access our app
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
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
