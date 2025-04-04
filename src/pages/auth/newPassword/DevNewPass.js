import React, { useState } from 'react';
import Reset from "../../../assets/resetP.svg";
import Vector from "../../../assets/Vector.svg";
import imageeye from '../../../assets/imageeye.svg';
import eyeSlash from '../../../assets/eye-slash.svg';
import VerificationModal from "../../../components/modal/modal";
import "./newPassword.css";
import { toast } from 'react-toastify';
import ScreenLoader from '../../../components/loader/ScreenLoader';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { changePassword } from '../../../services/redux/middleware/changePassword';
import { devchangePassword } from '../../../services/redux/middleware/devchangePassword';


const DevNewPass = () => {

    const [confirmPassword, setConfirmPassword] = useState("");
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isModalOpen, setModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const { email } = useParams();
    const navigate = useNavigate();
    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    // Toggling confirm password visibility
    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prevState) => !prevState);
    };

    // const handleSubmit = (e) => {
    //   e.preventDefault();
    //   // Open modal on successful verification
    //   setModalOpen(true);
    // };

    const handleResetPassword = async () => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#%*?&])[A-Za-z\d@$!#%*?&]{8,}$/;


        if (!password || !confirmPassword) {
            toast.error("Please fill in all the fields");
            return;
        }


        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }


        if (!passwordRegex.test(password)) {
            toast.error(
                "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character"
            );
            return;
        }

        if (!passwordRegex.test(confirmPassword)) {
            toast.error(
                "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character"
            );
            return;
        }

        setIsLoading(true);

        const data = { email: email.toLowerCase(), newPassword: password };
        console.log("datadata", data);
        const res = await dispatch(devchangePassword(data));
        console.log(password);
        console.log(res);

        if (res?.payload?.status === 200) {
            setIsLoading(false); 
            setModalOpen(true);
            setTimeout(() => {
                setModalOpen(false); 
                navigate('/SignIn');
            }, 1000); 
        } else {
            toast.error("Error Occurred!"); 
            setIsLoading(false); 
        }
    };


    return (
        <>
            {isLoading && <ScreenLoader />}
            <div className="NewPassword">
            <div className="SignIn-div1">
          <p className="SignIn-div1_pppp">
            We craft the
            <br />
            future dwelling
          </p>
          <img
            src={"/prepwrld/Images/Investor/resetinvBg.png"}
            alt=""
            className="qwere2"
          />
        </div>

                <div className='Newdiv2__main'>
                    <div className='Newdiv2'>
                        <img src={Vector} alt='Logo' />
                        <div className='welcome__sigin__text_container'>
                            <p className='NewHeadLine'>Reset your Password</p>
                            <p className='New-P'>Reset your account password</p>
                        </div>

                        <div className="signinEmailFormContainer">
                            <div className="signinEmailFormGroup">
                                <p className="passwordLabelText">Password</p>
                                <div className="passwordInputContainer">
                                    <input
                                        className="passwordInput"
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        placeholder="Enter Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.currentTarget.value)}
                                    />
                                    <img
                                        className="eyeIcon"
                                        src={showPassword ? imageeye : eyeSlash}
                                        alt="Toggle password visibility"
                                        onClick={togglePasswordVisibility}
                                    />
                                </div>

                                <p className="passwordLabelText">Confirm Password</p>
                                <div className="passwordInputContainer">
                                    <input
                                        className="passwordInput"
                                        type={showConfirmPassword ? "text" : "password"}
                                        id="confirmPassword"
                                        placeholder="Enter Confirm Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <img
                                        className="eyeIcon"
                                        src={showConfirmPassword ? imageeye : eyeSlash}
                                        alt="Toggle confirm password visibility"
                                        onClick={toggleConfirmPasswordVisibility}
                                    />
                                </div>
                            </div>

                            <button className="signInButton" onClick={handleResetPassword}>Reset Password</button>
                        </div>
                    </div>
                </div>
                <VerificationModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} paragraph={"Password Reset Successfully"} />
            </div></>

    );
};

export default DevNewPass;
