import React, { useState, useRef } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import signUpImage from "../../../assets/signUpImage.svg";
import Vector from "../../../assets/Vector.svg";
import facebook from "../../../assets/gg_facebook.svg";
import google from "../../../assets/flat-color-icons_google.svg";
import { Link, useNavigate } from "react-router-dom";
import propertyDeveloperImage from "../../../assets/PropertyDeveloperbg.png";
import Step1 from "../../../components/PropertyDeveloper/Auth/Step1";
import Origin from "../../../assets/origin.svg";
import SignUpPage from "../../../assets/SignUpPage.png";
import eyeSlash from "../../../assets/eye-slash.svg";
import "./signUp.css";
import imageeye from "../../../assets/imageeye.svg";
import { useDispatch, useSelector } from "react-redux";
import { investorSignup } from "../../../services/redux/middleware/signin";
import { toast } from "react-toastify";
import ScreenLoader from "../../../components/loader/ScreenLoader";
const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state);
  const [fullName, setname] = useState();
  const [origin, setorigin] = useState();
  const [email, setemail] = useState();
  const [legalId, setlegalId] = useState();
  const [phoneNumber, setphoneNumber] = useState();
  const [password, setPassword] = useState();
  const [selected, setSelected] = useState("Investor");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setconfirmPassword] = useState();
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agree, setAgree] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const selectRef = useRef(null);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const handleCheckboxChange = (e) => {
    setAgree(e.target.checked);
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleSelect = (type) => {
    setSelected(type);
  };

  const handleVerifyAccountClick = async () => {
    try {
      if (!email) {
        toast.error("Please Enter Email");
        return;
      }
     
      if (!password) {
        toast.error("Please Enter Password");
        return;
      }

      if (!confirmPassword) {
        toast.error("Please Enter Confirm Password");
        return;
      }

      // const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
      // if (password.length < 8) {
      //   toast.error(
      //     "Password must be 8 characters long with at least one special character."
      //   );

      //   return "Password must be exactly 8 characters long.";
      // }
      // if (!specialCharRegex.test(password)) {
      //   toast.error(
      //     "Password must be 8 characters long with at least one special character."
      //   );

      //   return "Password must contain at least one special character.";
      // }
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        toast.error("Please enter a valid email address.");
        return;
      }
      const passwordPattern =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@#$!%*?&]{8,}$/;

      if (!passwordPattern.test(password)) {
        toast.error(
          "Password must be at least 8 characters long, include at least one capital letter, one numeric value, and one special character (e.g., @, $, %, etc.)."
        );
        return;
      }

      if (password !== confirmPassword) {
        toast.error("Passwords do not match.");
        return;
      }
      // if (!agree) {
      //   toast.error(
      //     "Please agree to our Terms & Conditions and Privacy Policy."
      //   );
      //   return;
      // }
      setIsLoading(true);
      const data = {
        email: email.toLowerCase(),
        password,
      };
      console.log(data, "before dispatching");
      dispatch(investorSignup(data)).then((res) => {
        console.log(res, "usman");

        if (res?.payload?.msg?.startsWith("Account created successfully")) {
          toast.success(
            "Account created.Verification code Sent to your email"
          );
          navigate(`/verifyaccount/${email}`);
        } else if(res?.payload?.status===400){
          setIsLoading(false);
          toast.error("User Already Exists");
        }
        else
        {
        toast.error("something went wrong")
        }
      });
    } catch (error) {
      setIsLoading(false);
      toast.error(
        `Error: ${error.message || "An error occurred please try later."}`
      ); // Display error message
      console.error("Sign-up error:", error);
      setIsLoading(false)
    }
  };

  return (
    <>
      {isLoading && <ScreenLoader />}
      <div className="SignUp">
        <div className="SignIn-div1">
          <p className="SignIn-div1_pppp">
            We craft the
            <br />
            future dwelling
          </p>
          <img
            src={
              selected === "Investor"
                ? "/Images/Investor/insign.png"
                : "/Images/Investor/devbg1.png"
            }
            alt=""
            className="qwere2"
          />
        </div>

        <div className="signUp__div__main">
          <div className="SignUp-div2">
            <img
              className="imageDiv2"
              style={{ height: "80px", width: "75px" }}
              src={Vector}
              alt="Logo"
            />
            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
              className="welcome__sigup__text_container-1"
            >
              <p className="Headline800">Create your Account</p>
              <p className="SignUp-P">Submit your data for Sign up</p>
            </div>
            <div className="buttonDivs">
              <div
                className="Investor"
                onClick={() => handleSelect("Investor")}
                style={{
                  borderBottom:
                    selected === "Investor"
                      ? "2px solid #000000"
                      : "2px solid #919191",
                  width: "100%",
                  cursor: "pointer",
                }}
              >
                <p
                  style={{
                    color: selected === "Investor" ? "#000000" : "#919191",
                    fontFamily:
                      selected === "Investor"
                        ? "Urbanist-Semibold "
                        : "Urbanist-Medium",
                    textAlign: "center",
                    paddingBottom: "10px",
                  }}
                >
                  Investor
                </p>
              </div>

              <div
                className="propertyDeveloper"
                onClick={() => handleSelect("Property Developer")}
                style={{
                  borderBottom:
                    selected === "Property Developer"
                      ? "2px solid #000000"
                      : "2px solid #919191",
                  width: "100%",
                  cursor: "pointer",
                }}
              >
                <p
                  style={{
                    color:
                      selected === "Property Developer" ? "#000000" : "#919191",
                    fontFamily:
                      selected === "Property Developer"
                        ? "Urbanist-Semibold "
                        : "Urbanist-Medium",
                    textAlign: "center",
                    paddingBottom: "10px",
                  }}
                >
                  Property Developer
                </p>
              </div>
            </div>

            {selected === "Investor" ? (
              <div className="signinEmailFormContainer">
                <div className="signinEmailFormGroup">
                  {/* <p className="emailLabelText">Full Name</p>
                  <input
                    className="emailInput"
                    name="fullName"
                    type="text"
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, ""); 
                    }}
                    placeholder="Enter Full Name"
                    value={fullName}
                    onChange={(e) => {
                      if (e.target.value.length <= 18) {
                        setname(e.target.value);
                      }
                    }}
                  />
                  <p className="emailLabelText">
                    National ID/Passport/ Driving License
                  </p>
                  <input
                    className="emailInput"
                    name="fullName"
                    type="number"
                    placeholder="Enter National ID/Passport/ Driving License"
                    value={legalId}
                    onChange={(e) => {
                      if (e.target.value.length <= 15) {
                        setlegalId(e.target.value);
                      }
                    }}
                  />
                  <p className="emailLabelText">Origin</p>
                  <input
                    className="emailInput"
                    name="origin"
                    type="text"
                    onInput={(e) => {
                      e.target.value = e.target.value.replace(/[^a-zA-Z\s]/g, ""); 
                    }}
                    placeholder="Enter Your Origin"
                    value={origin}
                    onChange={(e) => setorigin(e.target.value)}
                  />
                  <p className="emailLabelText">Phone Number</p>
                  <PhoneInput
                    className="phone-input-field"
                    country={"us"}
                    inputClass="phone-input"
                    containerClass="phone-container"
                    buttonClass="flag-button"
                    dropdownClass="phone-dropdown"
                    preferredCountries={["us", "gb", "ca", "au"]}
                    value={phoneNumber}
                    onChange={(value) => setphoneNumber(value)}
                  /> */}

                  <p className="emailLabelText">Your Email</p>
                  <input
                    className="emailInput"
                    name="email"
                    type="email"
                    placeholder="Enter Email Address"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                  />
                  <p className="passwordLabelText">Password</p>
                  <div className="passwordInputContainer">
                    <input
                      className="passwordInput"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <img
                      className="eyeIcon"
                      src={showPassword ? imageeye : eyeSlash}
                      alt="Toggle password visibility"
                      onClick={togglePasswordVisibility}
                      style={{ cursor: "pointer" }}
                    />
                  </div>

                  <p className="passwordLabelText">Confirm Password</p>
                  <div className="passwordInputContainer">
                    <input
                      className="passwordInput"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setconfirmPassword(e.target.value)}
                    />
                    <img
                      className="eyeIcon"
                      src={showConfirmPassword ? imageeye : eyeSlash}
                      alt="Toggle confirm password visibility"
                      onClick={toggleConfirmPasswordVisibility}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                  {/* <div className="termsConditionsContainer">
                    <input
                      type="checkbox"
                      id="agreeTerms"
                      className="termsCheckbox"
                      onChange={handleCheckboxChange}
                    />
                    <label htmlFor="agreeTerms" className="termsLabel">
                      I agree to Terms & Conditions and Privacy Policy
                    </label>
                  </div> */}
                </div>
                <button
                  onClick={handleVerifyAccountClick}
                  className="signInButton"
                  // disabled={loading}
                >
                 Create an Account
                </button>
              </div>
            ) : (
              <Step1 />
            )}
            {selected === "Investor" ? (
              <div className="ordiv">
                <hr className="hr" />
                <p className="or-p">Or</p>
                <hr className="hr" />
              </div>
            ) : (
              ""
            )}
          </div>
          {selected === "Investor" ? (
            <div className="social__button__main-container">
              {/* <div className="facebook">
                <img src={facebook} alt="facebook" />
                <p>Sign in with Facebook</p>
              </div> */}
              <div className="facebook">
                <img src={google} alt="google" />
                <p>Signup with Google</p>
              </div>
              <span className="AccountSignUp">
                <p>
                  I have an account?{" "}
                  <Link className="a" to="/SignIn">
                  Login
                  </Link>
                </p>
              </span>
            </div>
          ) : (
            ""
          )}
        </div>
        {/* {selected === "Investor" ? (
          <div className="social__button__main-container">
            <div className="facebook">
              <img src={facebook} alt="facebook" />
              <p>Sign in with Facebook</p>
            </div>
            <div className="facebook">
              <img src={google} alt="google" />
              <p>Sign in with Google</p>
            </div>
            <span className="AccountSignUp">
              <p>
                I have an account?
                <Link className="a" to="/SignIn">
                  Login
                </Link>
              </p>
            </span>
          </div>
        ) : (
          ""
        )} */}
      </div>
    </>
  );
};

export default SignUp;
