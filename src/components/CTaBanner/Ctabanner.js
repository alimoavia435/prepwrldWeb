import React from 'react';
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload'; // Assuming you're using MUI icons
import './Ctabanner.css'

const Ctabanner = () => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles); // Handle the uploaded file
    }
  });

  return (
    <div className="banner-container-CtaBanner">
    
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <img src='/Images/CmsIMages/CmsBanner.svg' className="upload-icon-img_cta" />
        <p className="upload-text">Upload Your Image Here</p>
      </div>
    </div>
  );
};

export default Ctabanner;
