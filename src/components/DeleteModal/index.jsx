import  react  from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import Button from '@mui/material/Button';
// import { useState, useEffect } from 'react';
import cancelIcon from '../../assets/closeIcon.svg'
import "./index.css"

// import BinImage from "../../assets/bin.png"
import { useEffect, useState } from 'react';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: '400px',
//   bgcolor: 'background.paper',
//   boxShadow: 24,
//   borderRadius:5,
//   p: 2,
// };

export default function DeleteModal({open, setOpen, deleteCurrentItem}) {
  const handleClose = () => setOpen(false);

  return (
    <Modal style={{backdropFilter:'blur(10px)',display:"flex",alignItems:"center",justifyContent:"center",padding:"25px"}}
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
    >
        <Box className='modal-box-style'>
            <div className = "delete-modal-header">
                <div>
                 
                </div>
                <IconButton color="primary" sx={{position:"absolute",top:"2%",right:"2%"}} onClick={handleClose}>
                <img
                        src={cancelIcon}
                        alt="cancel"
                        style={{ width: "30px", height: "30px" }}
                      />
                </IconButton>
            </div>
            <div className='delete-modal-body'>
                <div className='delete-modal-body-img'>

                </div>
               
                {/* <img src={BinImage} alt="alt" /> */}
                
                <h1 style={{fontFamily:'InterBold',color:'#FFFFFF',fontSize:'36px',fontWeight:'800',fontStyle:'italic',margin:"0px"}}>Delete Task</h1>
               
                <p style={{fontFamily:'Inter',color:'#FFFFFF',marginTop:'1px',fontWeight:'600',fontSize:'16px',lineHeight:'24px',position:'relative',top:'-10px',textAlign:"center"}}>Are you sure you want to delete this task?</p>
              
            </div>
            <div className='delete-modal-footer'>
            <button className='cancel-button' onClick={handleClose}>
            Cancel
        </button>
        <button
            className='cancel-button1'
            onClick={() => {
                deleteCurrentItem();
                handleClose();
            }}
        >
            Delete
        </button>
        </div>
        </Box>
    </Modal>
  );
}
