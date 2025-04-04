import  react  from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import Button from '@mui/material/Button';
import "./index.css"
import { useEffect, useState } from 'react';

export default function DeleteModal({ open, setOpen, deleteCurrentItem, itemId }) {
    const handleClose = () => setOpen(false);
  
    return (
      <Modal
        style={{ backdropFilter: 'blur(10px)', display: "flex", alignItems: "center", justifyContent: "center", padding: "25px" }}
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box className='modal-box-style' style={{background:"#ffffff"}}>
          <div className="delete-modal-header">
            <IconButton color="primary" sx={{ position: "absolute", top: "2%", right: "2%" }} onClick={handleClose}>
              <img src="https://nclextc.com/Images/Admin/close.svg" alt="cancel" style={{ width: "30px", height: "30px" }} />
            </IconButton>
          </div>
          <img src='https://nclextc.com/Images/delete.png'  style={{height:"70px", width:"70px"}}alt="ww"/>
          <div className='delete-modal-body'>
            <h1 style={{ fontFamily: 'Urbanist-Bold', color: '#000000', fontSize: '30px', fontWeight: '800', fontStyle: 'italic', margin: "0px" }}>
              Delete Question
            </h1>
            <p style={{ fontFamily: 'Urbanist', color: '#000000', marginTop: '1px', fontWeight: '600', fontSize: '16px', lineHeight: '24px', position: 'relative', top: '-10px', textAlign: "center" }}>
              Are you sure you want to delete this Question?
            </p>
          </div>
          <div className='delete-modal-footer'>
            <button className='cancel-button' onClick={handleClose}>
              Cancel
            </button>
            <button
              className='cancel-button1'
              onClick={() => {
                deleteCurrentItem(itemId);  // Pass the itemId here
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
  
