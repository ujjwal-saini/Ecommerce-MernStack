import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../middleware/authContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function ForgotPassword() {

    const { API } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [otpSent, setOtpSent] = useState(false);
    const [otpverify, setverifyOtp] = useState("");
    const handleSendOtp = async (e) => {
        console.log(API);
        e.preventDefault();
        try {
            const res = await axios.post(`${API}/forget-password`, email);
            if (res.status === 200) {
                alert("OTP sent to your email");
                setverifyOtp(res.data.otp);
                setOtpSent(true);
            }
        } catch (err) {
            if (err.response) {
                alert(err.response.data.message);
            } else {
                alert("Server not responding");
            }
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        if (parseInt(otp) === parseInt(otpverify)) {
            alert("Otp verify Succesfully")
            navigate(`/updatepass/reset/${email}`);
        }

    };

    return (
        <div
            className="container-fluid d-flex justify-content-center align-items-center vh-100"
            style={{ background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)" }}>
            <div className="card shadow p-4" style={{ width: "400px" }}>
                <h3 className="text-center mb-4 fw-bold">
                    Forgot Password
                </h3>
                <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp}>
                    {/* Email */}
                    <div className="mb-3">
                        <label className="form-label">Enter your Email</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter registered email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={otpSent}
                        />
                    </div>
                    {/* OTP Field (show only after OTP sent) */}
                    {otpSent && (
                        <div className="mb-3">
                            <label className="form-label">Enter OTP</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                required
                            />
                        </div>
                    )}
                    {/* Button Change */}
                    <button
                        type="submit"
                        className="btn btn-warning w-100 fw-bold">
                        {otpSent ? "Verify OTP" : "Send OTP"}
                    </button>
                    <hr />
                    <Link to="/login" className="text-center d-block">
                        Back to Login
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;