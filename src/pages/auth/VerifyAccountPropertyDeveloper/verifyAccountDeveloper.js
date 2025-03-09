import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import verifyAccountImage from "../../../assets/verifyAccountImage.svg";
import Vector from "../../../assets/Vector.svg";
import { Link, useNavigate, useParams,useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "./verifyAccountDeveloper.css";
import VerificationModal from "../../../components/modal/modal";
import { verifyaccountDeveloper } from "../../../services/redux/middleware/signin";
import { resendCode } from "../../../services/redux/middleware/signin";
import ScreenLoader from "../../../components/loader/ScreenLoader";
function VerifyAccountDeveloper() {
  const { email } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, verified, error } = useSelector((state) => state);
  const location = useLocation();
  const logintype = location.state?.logintype;
  const [isModalOpen, setModalOpen] = useState(false);
  const [code, setCode] = useState(["", "", "", ""]);
  const [showError, setShowError] = useState(false);
  const [isDeveloper, setIsDeveloper] = useState(false); // State to toggle between regular and developer verification
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    const joinedCode = code.join("");
    if (joinedCode.length < 4 || code.includes("")) {
      toast.error("Enter the verification Code");
      return;
    }
    setIsLoading(true);
    const data = {
      email,
      code: joinedCode,
      userType: "Property Developer"
    };
    console.log(data, "data before dispatching");
    dispatch(verifyaccountDeveloper(data)).then((res) => {
      console.log(res, "resssssss");
      if (res?.payload?.msg === "Email verification successful.") {
        setIsLoading(false); 
        toast.success("Verification successful!");
        console.log(res, "verification response");
        localStorage.setItem("tokendev",res?.payload?.token);
        localStorage.setItem("Id",res?.payload?.user?._id);
          setModalOpen(true); 
        } else {
          setTimeout(() => {
            setIsLoading(false); 
            toast.error("invalid verification code try again");
          }, 2000); 
        }
     
    });
  };

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (value.length <= 1) {
      const updatedCode = [...code];
      updatedCode[index] = value;
      setCode(updatedCode);
      if (value !== "" && index < code.length - 1) {
        document.getElementById(`input-${index + 1}`).focus();
      }
    }
  };
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && code[index] === "") {
      if (index > 0) {
        document.getElementById(`input-${index - 1}`).focus();
        const updatedCode = [...code];
        updatedCode[index - 1] = "";
        setCode(updatedCode);
      }
    }
  };
  const handleResendCode = async () => {
    try {
      setCode(["", "", "", ""])
      setIsLoading(true);
    
      const data = { email: email.toLowerCase(), userType: "Property Developer" };
      const result = await dispatch(resendCode(data));
      toast.success("Email Resend Successfully");
      console.log(result);
    } catch (error) {
    
      console.error("Error resending email:", error);
    }
    setIsLoading(false);
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 4); 
    if (pastedData.length > 0) {
      const updatedCode = pastedData.split("");
      while (updatedCode.length < 4) {
        updatedCode.push("");
      }
      setCode(updatedCode);
  
    
      setTimeout(() => {
        document.getElementById(`input-${pastedData.length - 1}`).focus();
      }, 10);
    }
  };

  return (
    <>
      {isLoading && <ScreenLoader />}
      <div className="verifyAccount">
      <div className="SignIn-div1">
          <p className="SignIn-div1_pppp">
            We craft the<br />
            future dwelling
          </p>
          <img src={"/Images/Investor/verifyImg.png"} alt="" className="qwere2" />
        </div>
        <div className="verify__div__main">
          <div className="Verify-Account-Div2">
            <img src={Vector} alt="Logo" />
            <div className="welcome__sigin__text_container">
              <p className="Headline800">Verify your Account</p>
              <p className="Verify-P">
                A 4-Digit verification code has been sent to your email
              </p>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                marginTop: "10px",
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
                    required
                  />
                ))}
              </div>
              <div
                type="submit"
                className="verify-button"
                onClick={handleSubmit}
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify"}
              </div>
              {showError && (
                <p className="error-message">
                  {error || "Verification failed. Try again."}
                </p>
              )}
            </div>
            <span className="VerifyAccountLink">
              <p onClick={handleResendCode}>
                Didn’t receive the code?{" "}
                <span style={{ cursor: "pointer" }} className="a" to="/">
                  {" "}
                  Request Again
                </span>
              </p>
            </span>
          </div>
        </div>
        <VerificationModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          paragraph={"Account Verified Successfully"}
          logintype={logintype}
        />
      </div>
    </>
  );
}

export default VerifyAccountDeveloper;