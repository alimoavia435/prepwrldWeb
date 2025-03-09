import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import verifyAccountImage from "../../../assets/verifyAccountImage.svg";
import Vector from "../../../assets/Vector.svg";
import { Link } from 'react-router-dom';
import "./resetPasswordVerification.css";
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import ScreenLoader from '../../../components/loader/ScreenLoader';
import { devVerifyEmail } from '../../../services/redux/middleware/devVerifyEmail';
import { devresendVerification } from '../../../services/redux/middleware/devresendVerification';
const DevResetVerifyAccount = () => {
    const navigate = useNavigate();
    const [code, setCode] = useState(['', '', '', '']);
    const [error, setError] = useState('');
    const [resendError, setResendError] = useState('');
    const location = useLocation();
    const userEmail = location.state?.email || '';
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();



    const handleChange = (e, index) => {
        const { value } = e.target;

        if (value.length <= 1) {
            const updatedCode = [...code];
            updatedCode[index] = value;
            setCode(updatedCode);

         
            if (value !== '' && index < code.length - 1) {
                document.getElementById(`input-${index + 1}`).focus();
            }
        }
    };

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace') {
            const updatedCode = [...code];

            if (code[index] === '') {
               
                if (index > 0) {
                    document.getElementById(`input-${index - 1}`).focus();
                }
            } else {
           
                updatedCode[index] = '';
                setCode(updatedCode);
            }
        }
    };





    const { email } = useParams();
    console.log(email)


    const handleVerify = async () => {
        const joinedCode = code.join('');

        if (joinedCode.length < 4 || code.includes("")) {
            toast.error("Enter the Verification code");
            return;
        }

        const data = { email, code: joinedCode };
        console.log("code", data);
        setIsLoading(true);
        try {
          const result = await dispatch(devVerifyEmail(data));
          console.log(result);
    
          if (result?.payload?.status === 200) {
            setIsLoading(false);
            setTimeout(() => {
              toast.success("Verification successful!");
            }, 100);
            navigate(`/devnewPassword/${email}`);
          } else {
            setIsLoading(false);
            setTimeout(() => {
              toast.error("Verification failed, please try again.");
            }, 100)
    
          }
        } catch (error) {
            setIsLoading(false);
          console.error(error);
        }
    };




    const handleResendCode = async () => {
        try {
            setCode(["", "", "", ""])
          const data = { email: email.toLowerCase() };
          const result = await dispatch(devresendVerification(data));
          toast.success("Email Resend Successfully");
          console.log(result);
        } catch (error) {
          console.error("Error resending email:", error);
        }
      };


      const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").slice(0, 4); // Get first 4 characters
        if (pastedData.length > 0) {
          const updatedCode = pastedData.split("");
          while (updatedCode.length < 4) {
            updatedCode.push(""); // Fill remaining spaces if less than 4 characters
          }
          setCode(updatedCode);
      
          // Move focus to the next empty input field
          setTimeout(() => {
            document.getElementById(`input-${pastedData.length - 1}`).focus();
          }, 10);
        }
      };
      
      return (
        <div className="input-group">
          {code.map((value, index) => (
            <input
              key={index}
              id={`input-${index}`}
              type="text"
              maxLength="1"
              value={value}
              className="code-input"
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={index === 0 ? handlePaste : undefined} // Attach paste event only to the first input
            />
          ))}
        </div>
      );
      
    return (
        <>
            {isLoading && <ScreenLoader />}
            <div className='verifyAccount'>
                <div className='Verify-Account-Div1'>
                    <img src={verifyAccountImage} alt='Verify Account' />
                </div>
                <div className='verify__div__main'>
                    <div className='Verify-Account-Div2'>
                        <img src={Vector} alt='Logo' />
                        <div className='welcome__sigin__text_container'>
                            <p className='Headline800'>Reset your Password</p>
                            <p className='Verify-P'>A 4-Digit verification code has been sent to your email.</p>
                        </div>
                        <div

                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "24px",
                                marginTop: "10px ",
                                width: "100%",
                            }}
                        >
                            <div className="input-group">
                                {code.map((value, index) => (
                                    <input
                                        key={index}
                                        id={`input-${index}`}
                                        type="text"
                                        maxLength="1"
                                        value={value}
                                        className="code-input"
                                        onChange={(e) => handleChange(e, index)}
                                        onKeyDown={(e) => handleKeyDown(e, index)}
                                        onPaste={index === 0 ? handlePaste : undefined} 
                                    />
                                ))}
                            </div>
                            {error && <p className="errorText">{error}</p>}
                            <p style={{cursor:'pointer'}} className="verify-button" onClick={handleVerify}>Reset Password</p>
                        </div>
                        <span className='VerifyAccountLink'>
                            <p>Didn’t receive the code?  <span onClick={handleResendCode}>Request Again</span></p>
                        </span>
                        {resendError && <p className="errorText">{resendError}</p>}
                    </div>
                </div>
            </div></>

    );
};

export default DevResetVerifyAccount;
