import React from 'react';
import { Handle, Position } from 'reactflow';
import ChatIcon from '@mui/icons-material/Chat';

import './style.css';
import 'reactflow/dist/style.css';

const MessageNode = ({data}) => {
  // Creating a Message Node that will have both a source handle and a target handle

  return (
    <div className='div_container'>
      <Handle type="source" position={Position.Left} id="leftSource" />
      <div>
        <div className="div_title"> 
          <span>Send message</span>
          <ChatIcon sx={{fontSize: '16px', marginLeft: '10px'}} />
        </div>
        <div className='div_text'>{data.nodeText}</div>
      </div>
      <Handle type="target" position={Position.Right} id="rightTarget" />
    </div>
  )
}

export default MessageNode