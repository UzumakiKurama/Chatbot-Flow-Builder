import React, { useEffect, useState } from 'react';
import CustomTextField from '../TextField/CustomTextField';

import './style.css'

const SettingsPanel = ({selectedNode, onChange}) => {

  const [text, setText] = useState(selectedNode.data.nodeText);

  useEffect(() => {
    onChange(text);
  }, [text]);

  useEffect(() => {
    setText(selectedNode.data.nodeText);
  }, [selectedNode])

  return (
    <div>
        <h1 className='header_h1'>Settings Panel</h1>
        <CustomTextField  
            sx={{input: {color: 'white', borderColor: 'white'}}}
            label="Set node Text"
            value={text} 
            onChange={(e) => setText(e.target.value)} />
    </div>
  )
}

export default SettingsPanel;