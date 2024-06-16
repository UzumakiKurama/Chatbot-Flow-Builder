import React from 'react';
import ChatIcon from '@mui/icons-material/Chat';
import './style.css';

const NodesPanel = () => {
  
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/chatbot-flow', nodeType);
    event.dataTransfer.effectAllowed = 'move';        
  }

  return (
    <div>
        <header className='header_h1'>
            <h1>Nodes Panel</h1>
        </header>
        <div className='div_CustomNodes'>
          <div 
            className='div_node' 
            onDragStart={() => onDragStart(event, 'message')} 
            draggable >
            <ChatIcon />    
              Message
          </div>
          <div className='div_node'>
            Another Custom Node
          </div>
        </div>
    </div>
  )
}

export default NodesPanel