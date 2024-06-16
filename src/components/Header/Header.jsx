import React from 'react'
import { Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';

import './style.css';
import 'react-toastify/dist/ReactToastify.css';

const Header = ({edges, nodes}) => {

  const onClickSaveHandler = () => {
    const targets = new Set();
    const totalNodes = nodes.length;
    edges.map(edge => targets.add(edge.target));

    if(targets.size < totalNodes - 1){
        toast.error("More than one node has empty target handles", {
            position : "top-center",
        });
    } else {
        toast.success("Flow saved", {
            position: "top-center",

        })
    }
  }

  return (
    <header className='header_content'>
        <h1>Chatbot-Flow-Builder</h1>
        <ToastContainer autoClose={2000} theme='colored' />
        <Button variant='contained' onClick={onClickSaveHandler} > Save Changes </Button>
    </header>
  )
}

export default Header