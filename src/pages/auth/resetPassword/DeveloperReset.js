import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Reset from "../../../assets/resetP.svg";
import Vector from "../../../assets/Vector.svg";
import "./resetPassword.css";
import { toast } from 'react-toastify';
import ScreenLoader from '../../../components/loader/ScreenLoader';
import { devforgetPassword } from '../../../services/redux/middleware/devforgetPassword';



const DeveloperReset = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    console.log("email", email);
    if (!email) {
      toast.error("Enter Email");
      return;
    }
    // if (email !== email.toLowerCase()) {
    //   toast.error("Please enter a email address in lowercase");
    //   return;
    // }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    const data = { email: email };
    const result = await dispatch(devforgetPassword(data));
    console.log(result)
    if (result?.payload?.status === 200) {
      navigate(`/DevresetPasswordVerify/${email}`);

    } else if (result?.payload?.status === 404) {
      setIsLoading(false);
      setTimeout(() => {
        toast.error("User Not Found");
      }, 100)
    } else {
      setIsLoading(false);
      setTimeout(() => {
        toast.error("Error");
      }, 100)
    }



  };




  return (

    <>
      {isLoading && <ScreenLoader />}
      <div className='ResetPassword'>
        <div className='div1'>
          <img src={Reset} alt='ResetPassword' />
        </div>
        <div className='div2'>
          <div className='ResetPasswordDiv2'>
            <img src={Vector} alt='Logo' />
            <div className='welcome__sigin__text_container'>
              <p className='resetHeadLine'>Reset your Password</p>
              <p className='reset-P'>
                Don’t worry! It happens. Please enter the email address associated with your account.
              </p>
            </div>
            <div className="signinEmailFormContainer">
              <div className="signinEmailFormGroup">
                <p className="emailLabelText">Your Email</p>
                <input
                  className="emailInput"
                  type="email"
                  placeholder="Enter Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {error && <p className="errorText">{error}</p>}
              <button
                type="submit"
                onClick={handleSubmit}
                className="signInButton"
              >
                Reset Password
              </button>
            </div>
          </div>
        </div>
      </div></>

  );
};

export default DeveloperReset;
