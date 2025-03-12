import React, { useState } from "react";
import "./Step1.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useNavigate } from "react-router-dom";
import imageeye from "../../../assets/imageeye.svg";
import { useDispatch, useSelector } from "react-redux";
import eyeSlash from "../../../assets/eye-slash.svg";
import { toast } from "react-toastify";
import { signup } from "../../../services/redux/middleware/signin";
import google from "../../../assets/flat-color-icons_google.svg";
import ScreenLoader from "../../../components/loader/ScreenLoader";
function PropertyAuthStep1() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setemail] = useState();
  const [fullName, setFullName] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setconfirmPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [phone, setPhone] = useState()

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);



  const handleSubmit = () => {
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@#$!%*?&]{8,}$/;

    if (!passwordPattern.test(password)) {
      toast.error(
        "Password must be at least 8 characters long,include at least one capital letter, one numeric value, and one special character (e.g., @, $, %, etc.)."
      );
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (!password) {
      toast.error("Enter Password");
      return;
    }
    if (!confirmpassword) {
      toast.error("Enter Confirm Password");
      return;
    }
    if (password !== confirmpassword) {
      toast.error("Passwords do not match.");
      return;
    }
    setIsLoading(true);
    const data = {
      fullName,
      email: email.toLowerCase(),
      password,
      confirmPassword: confirmpassword,
      phone,
      userType: "student"
    };
    dispatch(signup(data))
      .then((res) => {
        console.log(res, "response");
        if (res?.payload?.status === 201) {
          toast.success("Account created Successfully");
          setIsLoading(false);
          navigate(`/SignIn`);
        } else if (res?.payload?.status === 400) {
          setIsLoading(false);
          toast.error("User Already Exists");
        } else {
          toast.error("An error occurred please try later.");
        }
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
        toast.error("An error occurred during registration");
      });
  };

  return (
    <>
      {isLoading && <ScreenLoader />}
      <div className="property__developer_step1_container-main">
        <div className="property__developer_step1_container-main-1">
          <div className="property__developer_step1_container-main-2">
            <div className="sign__up__property__developer__container__main">
              <div className="step1__form_container">
                <div className="step1__form_container-2">
                  <p className="step-1_label_name">Full Name</p>
                  <input
                    className="step-1_placeholder_1"

                    name="fullName"
                    placeholder="Enter Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                <div className="step1__form_container-2">
                  <p className="step-1_label_name">Your Email</p>
                  <input
                    className="step-1_placeholder_1"
                    type="email"
                    name="email"
                    placeholder="Enter Email Address"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    required
                  />
                </div>
                <div className="step1__form_container-2">
                  <p className="step-1_label_name">Phone</p>
                  <input
                    className="step-1_placeholder_1"
                    type="phone"
                    name="phone"
                    placeholder="Enter phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
                <div className="step1__form_container-2">
                  <p className="step-1_label_name">Password</p>
                  <div className="passwordInputContainer">
                    <input
                      className="passwordInput"
                      type={showPassword ? "text" : "password"}
                      name="password"
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
                </div>
                <div className="step1__form_container-2">
                  <p className="step-1_label_name">Confirm Password</p>
                  <div className="passwordInputContainer">
                    <input
                      className="passwordInput"
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={confirmpassword}
                      onChange={(e) => setconfirmPassword(e.target.value)}
                      required
                    />
                    <img
                      className="eyeIcon"
                      src={showConfirmPassword ? imageeye : eyeSlash}
                      alt="Toggle password visibility"
                      onClick={toggleConfirmPasswordVisibility}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </div>
              </div>
              <div className="step_3_button_container">
                <button
                  className="step_3_next_button"
                  type="button"
                  onClick={handleSubmit}
                >
                  Create an Account
                </button>
              </div>
              <div className="ordiv">
                <hr className="hr" />
                <p className="or-p">Or</p>
                <hr className="hr" />
              </div>
              <div className="facebook">
                <img src={google} alt="google" />
                <p>Signup with Google</p>
              </div>
            </div>
            <p className="have__account_text">
              I have an account?{" "}
              <span
                style={{ cursor: "pointer" }}
                className="have__account_text-1"
                onClick={() => navigate("/signIn")}
              >
                Login
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default PropertyAuthStep1;
