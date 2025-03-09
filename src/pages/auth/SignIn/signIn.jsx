import React, { useState } from "react";
import investorImage from "../../../assets/image-bg.png";
import investorImage2 from "../../../assets/investor-bg2.png";
import propertyDeveloperImage from "../../../assets/PropertyDeveloperbg.png";
import Vector from "../../../assets/Vector.svg";
import facebook from "../../../assets/gg_facebook.svg";
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

  const [selected, setSelected] = useState("Investor");
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
    const userType = "investor";
    const data = { email: email.toLowerCase(), password, userType };

    dispatch(signin(data)).then((res) => {
      console.log(res, "rererre");

      if (res?.payload?.msg === "Login Successfully") {
        localStorage.setItem("token", res?.payload?.token);
        localStorage.setItem("Id", res?.payload?.user?._id);
        const profileImageDeveloper = res?.payload?.user?.profileImage;
        console.log("pasha bharosay vala", profileImageDeveloper);
        if (profileImageDeveloper) {
          localStorage.setItem("profileImageDeveloper", profileImageDeveloper);
        }

        toast.success(res?.payload?.msg);

        if (res?.payload?.user?.isVerified) {
          navigate("/explore");
        } else {
          navigate(`/verifyaccount/${email}`);
        }
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
      else if (res?.payload?.status === 403) {
        setTimeout(() => {
          toast.success("please Verify ,Code sent to email");
        }, 100);
        const logintype = "inlogin";
        navigate(`/verifyaccount/${email}`, { state: { logintype } });
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
      userType: "Property Developer",
    };

    dispatch(signin(data)).then((res) => {
      console.log(res, "prop");
      if (res?.payload?.msg === "Login Successfully") {
        localStorage.setItem("tokendev", res?.payload?.token);
        localStorage.setItem("Id", res?.payload?.user?._id);
        localStorage.setItem("kycapproval", res?.payload?.user?.developerKYC);
        const profileImageDeveloper = res?.payload?.user?.profileImage;
        if (profileImageDeveloper) {
          localStorage.setItem("profileImage", profileImageDeveloper);
        }
        toast.success(res?.payload?.msg);
        if (res?.payload?.user?.isDeveloperVerified) {
          if (res?.payload?.user?.developerKYC === "accepted") {
            navigate("/property-developer-profile");

          }
          else {
            navigate("/property-developer-profile");
            localStorage.setItem('selectedItemIndex', 3);
            localStorage.setItem('selectedItemText', "KYC & Profile");
          }
        } else {
          navigate(`/verifyaccountdeveloper/${email1}`);
        }
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
      else if (res?.payload?.status === 403) {
        setTimeout(() => {
          toast.success("please Verify ,Code sent to email");
        }, 100);
        const logintype = "devlogin";
        navigate(`/verifyaccountdeveloper/${email1}`, { state: { logintype } });
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

  const logingoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const datas = await axios.get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse.access_token}`
      );

      try {
        const data = {
          googleIdToken: "",
        };
        dispatch(googlelogin(data)).then((res) => {
          console.log(res, "loginResponse");
        });
        // dispatch(signin(data)).then((res) => {
        //   if (res?.payload?.status === 200) {
        //     setIsLoading(false);
        //     localStorage.setItem("_id", res?.payload?.data?._id);
        //     localStorage.setItem("token", res?.payload?.token);
        //     localStorage.setItem(
        //       "profileupdate",
        //       res?.payload?.data?.profileUpdate
        //     );
        //     dispatch(logoutFun(true));

        //     toast.success("Sign In Successfully");
        //     if (res?.payload?.data?.profileUpdate) {
        //       navigate("/");
        //     }
        //     // else {
        //     //   navigate("/Dashboard/Profile-Detail");
        //     // }
        //   } else {
        //     setIsLoading(false);
        //     toast.error(res?.payload?.message);
        //   }
        // });
      } catch (error) {
        console.error("Error:", error);
      }
    },
  });

  // import React from 'react';
  // import FacebookLogin from 'react-facebook-login';

  // const LoginForm = () => {
  //   const handleFacebookCallback = (response) => {
  //     if (response?.status === "unknown") {
  //       console.error('Login failed:', 'Something went wrong with Facebook login.');
  //       return;
  //     }

  //     // Log the response (contains name, email, picture, and tokens)
  //     console.log('Facebook Response:', response);

  //     // Example: Send response to the backend for verification or storing
  //     fetch('http://localhost:5000/api/auth/facebook', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         userID: response.userID,
  //         accessToken: response.accessToken,
  //         name: response.name,
  //         email: response.email,
  //         picture: response.picture.data.url,
  //       }),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => console.log('Backend Response:', data))
  //       .catch((err) => console.error('Error sending data to backend:', err));
  //   };

  //   return (
  //     <FacebookLogin
  //       buttonStyle={{ padding: '6px', backgroundColor: '#1877F2', color: '#fff', border: 'none', borderRadius: '5px' }}
  //       appId="946726573608245" // Replace with your Facebook App ID
  //       autoLoad={false}
  //       fields="name,email,picture"
  //       callback={handleFacebookCallback}
  //       textButton="Login with Facebook"
  //     />
  //   );
  // };

  // export default LoginForm;

  return (
    <>
      {isLoading && <ScreenLoader />}
      <div className="SignIn">
        <div className="SignIn-div1">
          <p className="SignIn-div1_pppp">
            We craft the
            <br />
            future dwelling
          </p>
          <img
            src={
              selected === "Investor"
                ? "/Images/Investor/witoutbgin.png"
                : "/Images/Investor/devbg1.png"
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
                {isSignUpMode ? "Create your Account" : "Welcome Back to Evox!"}
              </p>
              <p className="SignIn-P">
                {isSignUpMode
                  ? "Submit your Personal Information"
                  : "Sign in to your account"}
              </p>
            </div>

            <div className="buttonDivs">
              {["Investor", "Property Developer"].map((type) => (
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

            {selected === "Investor" ? (
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
                  {/* <div className="facebook">
                    <img src={facebook} alt="facebook" />
                    <p>Sign in with Facebook</p>
                  </div> */}
                  <div
                    className="facebook"
                    onClick={() => {
                      logingoogle();
                    }}
                  >
                    <img src={google} alt="google" />
                    <p>Sign in with Google</p>
                  </div>
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
          {/* 
          {selected === "Investor" ?
            <div style={{ width: '100%' }} >
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
                    />
                  </div>
                  <Link to="/reset-password" style={{ textDecoration: "none" }}>
                    <p className="forgotPasswordText" style={{ cursor: "pointer" }}>
                      Forgot password?
                    </p>
                  </Link>
                </div>
                <button type="submit" className="signInButton" onClick={handleinvesterSignIN}>
                  Sign in
                </button>
              </div>
            </div>
          ) : (
            <div style={{ width: "100%" }}>
              <div className="signinEmailFormContainer">
                <div className="signinEmailFormGroup">
                  <label className="emailLabelText">Your Emaill</label>
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
                    />
                  </div>
                  <Link to="/reset-password" style={{ textDecoration: 'none' }}>
                    <p className="forgotPasswordText" style={{ cursor: 'pointer' }}>Forgot password?</p>
                  </Link>
                </div>
                <button type="submit" className="signInButton" onClick={handlepropSignIN}>
                  Sign in
                </button>
              </div>
            </div>
          )}
          {!isSignUpMode && (
            <>
              <div className="ordiv">
                <img className="divider-image" src="/Images/Investor/divider.svg" alt="divider" />
                <p className="or-p">Or</p>
                <img className="divider-image" src="/Images/Investor/divider.svg" alt="divider" />
              </div>
              <div className="social__button__main-container">
                <div className="facebook">
                  <img src={facebook} alt="facebook" />
                  <p>Sign in with   </p>
                </div>
                <div className="facebook">
                  <img src={google} alt="google" />
                  <p>Sign in with Google</p>
                </div>
                <p className="AccountSignUp">
                  Don't have an account already?{" "}
                  <Link className="a" to="/signup">
                    Sign Up
                  </Link>
                </p>
              </div>
            </>
          )} */}
        </div>
      </div>
    </>
  );
};

export default SignIn;
