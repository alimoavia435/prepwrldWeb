import React, { useState } from "react";
import investorImage from "../../../assets/image-bg.png";
import investorImage2 from "../../../assets/investor-bg2.png";
import propertyDeveloperImage from "../../../assets/PropertyDeveloperbg.png";
import Vector from "../../../assets/Vector.svg";

import google from "../../../assets/flat-color-icons_google.svg";
import imageeye from "../../../assets/imageeye.svg";
import eyeSlash from "../../../assets/eye-slash.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";
import { signin } from "../../../services/redux/middleware/signin";
import "./signIn.css";
import { toast } from "react-toastify";
import axios from "axios";
import ScreenLoader from "../../../components/loader/ScreenLoader";
import { logoutFun } from "../../../services/redux/reducer/getLogout";
import { googlelogin } from "../../../services/redux/middleware/googlelogin";
const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const { } = useSelector((state) => state);

  const [selected, setSelected] = useState("Teacher");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [email1, setEmail1] = useState("");
  const [password1, setPassword1] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleSelect = (type) => {
    setSelected(type);
    setIsSignUpMode(false);
  };

  const handleinvesterSignIN = () => {
    if (!email) {
      toast.error("Enter Email");
      return;
    }
    if (!password) {
      toast.error("Enter Password");
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setIsLoading(true);
    const data = { email: email.toLowerCase(), password };

    dispatch(signin(data)).then((res) => {
      console.log(res, "rererre");

      if (res?.payload?.msg === "Login Successfully") {
        localStorage.setItem("token", res?.payload?.token);
        localStorage.setItem("Id", res?.payload?.user?._id);
        navigate('/subjects');
        setIsLoading(false);
      } else if (res?.payload?.status === 404) {
        setTimeout(() => {
          toast.error("User Not Found");
        }, 100);
        setIsLoading(false);
      } else if (res?.payload?.status === 401) {
        setTimeout(() => {
          toast.error("Incorrect password");
        }, 100);
        setIsLoading(false);
      }

      else {
        setIsLoading(false);
        setTimeout(() => {
          toast.error("Something went wrong,Please try later");
        }, 100);
      }
    });
  };

  const handlepropSignIN = () => {
    if (!email1) {
      toast.error("Enter Email");
      return;
    }
    if (!password1) {
      toast.error("Enter Password");
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email1)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setIsLoading(true);
    const data = {
      email: email1.toLowerCase(),
      password: password1,
    };

    dispatch(signin(data)).then((res) => {
      console.log(res, "prop");
      if (res?.payload?.msg === "Login Successfully") {
        localStorage.setItem("tokendev", res?.payload?.token);
        localStorage.setItem("Id", res?.payload?.user?._id);

        toast.success(res?.payload?.msg);
        navigate('/StudentExams')
        setIsLoading(false);
      } else if (res?.payload?.status === 404) {
        setTimeout(() => {
          toast.error("User Not Found");
        }, 100);
        setIsLoading(false);
      } else if (res?.payload?.status === 401) {
        setTimeout(() => {
          toast.error("Incorrect password");
        }, 100);
        setIsLoading(false);
      }
      else {
        setIsLoading(false);
        setTimeout(() => {
          toast.error("Something went wrong,Please try later");
        }, 100);
      }
    });
  };



  return (
    <>
      {isLoading && <ScreenLoader />}
      <div className="SignIn">
        <div className="SignIn-div1">
          <p className="SignIn-div1_pppp">
            PrepWrld
            <br />
            The Future
          </p>
          <img
            src={
              selected === "Teacher"
                ? "/Images/auth/insign.png"
                : "/Images/auth/devbg1.png"
            }
            alt=""
            className="qwere2"
          />
        </div>

        <div className="signIn__div__main">
          <div className="SignIn-div2">
            <img src={Vector} alt="Logo" />

            <div className="welcome__sigin__text_container">
              <p className="Headline800">
                {isSignUpMode ? "Create your Account" : "Welcome Back to PrepWrld"}
              </p>
              <p className="SignIn-P">
                {isSignUpMode
                  ? "Submit your Personal Information"
                  : "Sign in to your account"}
              </p>
            </div>

            <div className="buttonDivs">
              {["Teacher", "Student"].map((type) => (
                <div
                  key={type}
                  className={type.toLowerCase().replace(" ", "")}
                  onClick={() => handleSelect(type)}
                  style={{
                    borderBottom:
                      selected === type
                        ? "2px solid #000000"
                        : "2px solid #919191",
                    width: "100%",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                  }}
                >
                  <p
                    style={{
                      color: selected === type ? "#000000" : "#919191",
                      fontFamily:
                        selected === type
                          ? "Urbanist-Semibold"
                          : "Urbanist-Medium",
                      textAlign: "center",
                      paddingBottom: "10px",
                    }}
                  >
                    {type}
                  </p>
                </div>
              ))}
            </div>

            {selected === "Teacher" ? (
              <div style={{ width: "100%" }}>
                <div className="signinEmailFormContainer">
                  <div className="signinEmailFormGroup">
                    <label className="emailLabelText">Your Email</label>
                    <input
                      className="emailInput"
                      type="email"
                      placeholder="Enter Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <label className="passwordLabelText">Password</label>
                    <div className="passwordInputContainer">
                      <input
                        className="passwordInput"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <img
                        className="eyeIcon"
                        src={showPassword ? imageeye : eyeSlash}
                        alt="Toggle password visibility"
                        onClick={togglePasswordVisibility}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                    <Link
                      to="/reset-password/investor"
                      style={{ textDecoration: "none" }}
                    >
                      <p
                        className="forgotPasswordText"
                        style={{ cursor: "pointer" }}
                      >
                        Forgot password?
                      </p>
                    </Link>
                  </div>
                  <button
                    type="submit"
                    className="signInButton"
                    onClick={handleinvesterSignIN}
                  >
                    Sign in
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ width: "100%" }}>
                <div className="signinEmailFormContainer">
                  <div className="signinEmailFormGroup">
                    <label className="emailLabelText">Your Email</label>
                    <input
                      className="emailInput"
                      type="email"
                      placeholder="Enter Email Address"
                      value={email1}
                      onChange={(e) => setEmail1(e.target.value)}
                      required
                    />
                    <label className="passwordLabelText">Password</label>
                    <div className="passwordInputContainer">
                      <input
                        className="passwordInput"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter Password"
                        value={password1}
                        onChange={(e) => setPassword1(e.target.value)}
                        required
                      />
                      <img
                        className="eyeIcon"
                        src={showPassword ? imageeye : eyeSlash}
                        alt="Toggle password visibility"
                        onClick={togglePasswordVisibility}
                        style={{ cursor: "pointer" }}
                      />
                    </div>
                    <Link
                      to="/reset-password/Property Developer"
                      style={{ textDecoration: "none" }}
                    >
                      <p
                        className="forgotPasswordText"
                        style={{ cursor: "pointer" }}
                      >
                        Forgot password?
                      </p>
                    </Link>
                  </div>
                  <button
                    type="submit"
                    className="signInButton"
                    onClick={handlepropSignIN}
                  >
                    Sign in
                  </button>
                </div>
              </div>
            )}
            {!isSignUpMode && (
              <>
                <div className="ordiv">
                  <img
                    className="divider-image"
                    src="/Images/Investor/divider.svg"
                    alt="divider"
                  />
                  <p className="or-p">Or</p>
                  <img
                    className="divider-image"
                    src="/Images/Investor/divider.svg"
                    alt="divider"
                  />
                </div>
                <div className="social__button__main-container">
               

                  <p className="AccountSignUp">
                    Don't have an account already?{" "}
                    <Link className="a" to="/signup">
                      Sign Up
                    </Link>
                  </p>
                </div>
              </>
            )}
          </div>


        </div>
      </div>
    </>
  );
};

export default SignIn;
