import React, { useState } from "react";
import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import './AddStudent.css';  // Import custom CSS
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addStudent } from "../../services/redux/middleware/addStudent";
import ScreenLoader from "../../components/loader/ScreenLoader";
import { toast } from "react-toastify";
import { Eye, EyeSlash } from 'react-bootstrap-icons';

const AddStudent = () => {
    // Separate useState hooks for each field
    const [studentName, setStudentName] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const dispatch = useDispatch();
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate()
    const { id } = useParams();
    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true)
        const data = {
            fullName: studentName,
            email,
            phone: phoneNumber,
            password
        }

        const datawithid = {
            data,
            id
        }
        console.log(datawithid, "dtaaaa")
        dispatch(addStudent(datawithid)).then((res) => {
            console.log(res, "add student response");
            if (res?.payload?.status === 201) {
                toast.success("Added Succefully")
            }
            navigate(-1)
            setLoading(false)
        })

    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            {loading && <ScreenLoader />}
            <div className="dfscvyile">
                <p className="toptext">Add Student</p>
                <Form style={{ width: "100%", maxWidth: "900px" }} onSubmit={handleSubmit}>
                    {/* Student Name */}
                    <Form.Group className="czxhvjhas" controlId="studentName">
                        <p className="toptext_innner">Student Name</p>
                        <Form.Control
                            className="custom-input"
                            type="text"
                            placeholder="Enter student's name"
                            value={studentName}
                            onChange={(e) => setStudentName(e.target.value)}
                            required
                        />
                    </Form.Group>

                    {/* Email */}
                    <Form.Group className="czxhvjhas" controlId="email">
                        <p className="toptext_innner">Email</p>
                        <Form.Control
                            className="custom-input"
                            type="email"
                            placeholder="Enter student's email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    {/* Phone Number */}
                    <Form.Group className="czxhvjhas" controlId="phoneNumber">
                        <p className="toptext_innner">Phone Number</p>
                        <Form.Control
                            className="custom-input"
                            type="tel"
                            placeholder="Enter phone number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            required
                        />
                    </Form.Group>

                    {/* Password */}
                    <Form.Group className="czxhvjhas" controlId="password">
                        <p className="toptext_innner">Password</p>
                        <div className="password-input-container">
                            <Form.Control
                                className="custom-input"
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle-btn"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </Form.Group>

                    {/* Submit Button */}
                    <button className="addqbttn" type="submit">
                        Add Student
                    </button>
                </Form>
            </div>
        </>
    );
};

export default AddStudent;
