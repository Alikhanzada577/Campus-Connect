import React from 'react';
import ImageIcon from '@mui/icons-material/Image';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const Input = () => {
  return (
    <div className='input'>
      <input type="text" placeholder='typesomething ...'/>
      <div className="send">
        <AttachFileIcon></AttachFileIcon>
        <input type='file' style={{display:"none"}} id='file'/>
        <label htmlFor='file'>
        <ImageIcon></ImageIcon>
        </label>
        <button>send</button>
      </div>
    </div>
  )
}

export default Input;
