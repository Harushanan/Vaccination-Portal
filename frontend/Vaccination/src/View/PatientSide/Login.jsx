import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios';
import { FaEnvelope, FaLock, FaUserInjured, FaSpinner, FaArrowLeft } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../../Component/Footer";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const isMobile = windowWidth <= 768;

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error("Please fill in both email and password.");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post("http://localhost:3000/login", { email, password });
            const { message, getuser, role } = response.data;

            setTimeout(() => {
                setLoading(false);
                if (message === "Invalid user") {
                    toast.error("New email detected. Please sign up.");
                } else if (message === "Invalidcredentials") {
                    toast.error("Incorrect email or password.");
                } else if (message === "Successfullogin") {
                    const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000;
                    Cookies.set("user", JSON.stringify({ user: getuser, expirationTime }), { expires: 1 });
                    toast.success("Login successful!");

                    setTimeout(() => {
                        navigate("/patient/userDashboard")
                    }, 1000);
                } else {
                    toast.error("Unexpected response from server.");
                }
            }, 1500);
        } catch (err) {
            console.error("Login error:", err);
            setLoading(false);
            toast.error("Server error. Please try again.");
        }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#e3f2fd', display: 'flex', flexDirection: 'column' }}>
            <ToastContainer position="top-center" />

            {/* Header */}
            <div style={{
                background: "linear-gradient(90deg, #004d40, #00acc1)",
                padding: '20px 40px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                borderBottom: '3px solid #ffffff'
            }}>
                <a href="#" style={{
                    fontSize: '30px',
                    fontWeight: 'bold',
                    color: 'white',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                }}>
                    💉 VaxCareHP <span style={{ color: '#f44336', marginLeft: 8 }}>+</span>
                </a>

                <button onClick={() => navigate(-1)} style={{
                    background: '#fff',
                    color: '#004d40',
                    border: 'none',
                    padding: '8px 12px',
                    fontSize: '16px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px'
                }}>
                    <FaArrowLeft /> Back
                </button>
            </div>

            {/* Form Container */}
            <div style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: isMobile ? '20px' : '50px'
            }}>
                <form onSubmit={handleLogin} style={{
                    background: '#ffffff',
                    padding: isMobile ? '20px' : '40px',
                    borderRadius: '12px',
                    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
                    width: '100%',
                    maxWidth: '400px',
                }}>
                    <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                        <FaUserInjured size={50} color="#0288d1" />
                        <h2 style={{ marginTop: '10px', color: '#0288d1' }}>Patient Login</h2>
                    </div>

                    {/* Email Field */}
                    <label><b>Email</b></label>
                    <div style={{ position: 'relative' }}>
                        <FaEnvelope style={{
                            position: 'absolute',
                            top: '50%',
                            left: '10px',
                            transform: 'translateY(-50%)',
                            color: '#888'
                        }} />
                        <input
                            type="email"
                            placeholder="Enter your Email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                width: '90%',
                                padding: '10px 10px 10px 35px',
                                margin: '10px 0 20px 0',
                                border: '1px solid #ccc',
                                borderRadius: '6px',
                                fontSize: '16px',
                                outline: 'none',
                                transition: 'border 0.3s',
                            }}
                            onFocus={(e) => e.target.style.border = "1.5px solid #0288d1"}
                            onBlur={(e) => e.target.style.border = "1px solid #ccc"}
                        />
                    </div>

                    {/* Password Field */}
                    <label><b>Password</b></label>
                    <div style={{ position: 'relative' }}>
                        <FaLock style={{
                            position: 'absolute',
                            top: '50%',
                            left: '10px',
                            transform: 'translateY(-50%)',
                            color: '#888'
                        }} />
                        <input
                            type="password"
                            placeholder="Enter your Password"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                width: '90%',
                                padding: '10px 10px 10px 35px',
                                marginBottom: '15px',
                                border: '1px solid #ccc',
                                borderRadius: '6px',
                                fontSize: '16px',
                                outline: 'none',
                                transition: 'border 0.3s',
                            }}
                            onFocus={(e) => e.target.style.border = "1.5px solid #0288d1"}
                            onBlur={(e) => e.target.style.border = "1px solid #ccc"}
                        />
                    </div>

                    <div style={{ textAlign: 'right', marginBottom: '10px' }}>
                        <Link to="/forgot-password" style={{ fontSize: '14px', color: '#0288d1' }}>
                            Forgot Password?
                        </Link>
                    </div>

                    <button type="submit" disabled={loading} style={{
                        width: '100%',
                        padding: '12px',
                        backgroundColor: loading ? '#aaa' : '#0288d1',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '16px',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        {loading ? (
                            <><FaSpinner className="spin" style={{ marginRight: 8 }} /> Logging in...</>
                        ) : 'Login'}
                    </button>

                    <p style={{ textAlign: 'center', marginTop: '15px' }}>
                        Don't have an account?
                        <Link to="/patient/sign-up" style={{ color: '#0288d1', marginLeft: '6px' }}>Sign up</Link>
                    </p>
                </form>
            </div>

            <Footer />
        </div>
    );
}

export default Login;
