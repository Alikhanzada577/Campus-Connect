import React, { useState, useEffect } from 'react'
import './../../style.scss'
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ZoomMtg } from '@zoom/meetingsdk'


ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();


const Zoom = () => {

  const [meetingCode, setMeetingCode] = useState("");
  const [passCode, setPassCode] = useState('');
  var authEndpoint = 'https://zoom.us/oauth/authorize?client_id=_SOZ3WQsSUSkOdhDyHdH6g&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F'
  var sdkKey = '_SOZ3WQsSUSkOdhDyHdH6g'
  var meetingNumber = meetingCode
  var passWord = passCode
  var role = 1
  var userName = 'Ali'
  var userEmail = 'muhammadali94200@gmail.com'
  var registrantToken = ''
  var zakToken = ''
  var leaveUrl = 'http://localhost:3000/home'

  function getSignature(e) {
    e.preventDefault();

    fetch("http://localhost:4000", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:3000', 'Access-Control-Allow-Credentials': 'true' },
      body: JSON.stringify({
        meetingNumber: meetingNumber,
        role: role
      })
    }).then(res =>{ 
      console.log("res", res)
      return res.json();
    })
    .then(response => {
      startMeeting(response.signature)
    }).catch(error => {
      console.error(error)
    })
  }

  function startMeeting(signature) {
    document.getElementById('zmmtg-root').style.display = 'block'

    ZoomMtg.init({
      leaveUrl: leaveUrl,
      patchJsMedia: true,
      success: (success) => {
        console.log(success)

        ZoomMtg.join({
          signature: signature,
          sdkKey: sdkKey,
          meetingNumber: meetingNumber,
          passWord: passWord,
          userName: userName,
          userEmail: userEmail,
          tk: registrantToken,
          zak: zakToken,
          success: (success) => {
            console.log(success)
          },
          error: (error) => {
            console.log(error)
          }
        })

      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  const zoomMeetingSDK = document.getElementById('zmmtg-root');

  useEffect(() => {

    if(zoomMeetingSDK.style.display === "block") {
      zoomMeetingSDK.style.display = 'none';
    }
    
  }, [zoomMeetingSDK])
  

  return (
    
    <div className='zoom'>
     
      
      <TextField sx={{width: 400,marginBottom:1,}}
      label="Meeting Code"
      value={meetingCode}
      onChange={(e) => setMeetingCode(e.target.value)}       />
         <TextField sx={{width: 400,marginBottom:1,}}
      label="PassCode"
      value={passCode}
      onChange={(e) => setPassCode(e.target.value)}       />
       <Button variant="contained" 
       sx={{width: 400, marginTop:2,}} onClick={getSignature}>
      Join Meeting 
       </Button>
       <p>OR</p>
       <Link to='https://zoom.us/meeting/schedule' target="_blank" rel="noopener noreferrer">
      <Button variant="contained" 
       sx={{width: 400, marginTop:2,}}>
      Create Meeting 
       </Button>
       </Link>
      
    </div>
  )
}

export default Zoom
