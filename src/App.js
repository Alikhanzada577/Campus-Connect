// App.js
import React, { useEffect,useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword"; 
import Home from "./components/Home/Home";
import {auth} from "./firebase/firebase-auth";

function App() {

  const [userName,setUserName] = useState("");
  useEffect(()=>{
    auth.onAuthStateChanged((user) =>{
      if(user){
        setUserName(user.displayName);
      }else setUserName("");
      
    });
  },[]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/Home" element={<Home name={userName}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
