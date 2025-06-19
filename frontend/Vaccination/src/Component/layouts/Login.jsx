import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios';

import loginbackground from '../../../src/assets/images/Login.png';

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please fill in both email and password.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/login", { email, password });
            const { message, getuser, role } = response.data;

            setError("Please wait...");

            setTimeout(() => {
                if (message === "Invalid user") {
                    setError("New email detected. Please sign up.");
                } else if (message === "Invalidcredentials") {
                    setError("Incorrect email or password.");
                } else if (message === "Successfullogin") {
                    const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000;
                    Cookies.set("user", JSON.stringify({ user: getuser, expirationTime }), { expires: 1 });

                    role === "customer" ? navigate("/userDashboard") : navigate("/adminDashboard");
                } else {
                    setError("Unexpected response from server.");
                }
            }, 1500);

        } catch (err) {
            console.error("Login error:", err);
            setError("Server error. Please try again.");
        }
    };

    return (
        <div style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', backgroundColor: '#e6f7ff' }}>
            
            {/* Header */}
            <div style={{
                background: 'linear-gradient(90deg, #004d40, #00acc1)',
                padding: '20px 40px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'sticky',
                top: 0,
                zIndex: 1000,
                boxShadow: '0 6px 15px rgba(0, 0, 0, 0.4)',
                borderBottom: '3px solid #fff'
            }}>
                <a href="#" style={{
                    fontSize: '32px',
                    fontWeight: 'bold',
                    color: 'white',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'transform 0.3s ease',
                }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}>
                    💉 <span style={{ margin: '0 8px' }}>VaxCare</span> <span style={{ color: '#f44336' }}>+</span> ❤️
                </a>
            </div>

            {/* Content */}
            <div className="container" style={{ display: 'flex', flex: 1, height: '80vh' }}>
                <div className="left-side" style={{
                    flex: 2,
                    background: `url(${loginbackground}) no-repeat center center/cover`
                }}></div>

                <div className="right-side" style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#f4f4f5',
                    padding: '20px'
                }}>
                    <form onSubmit={handleLogin} className="login-box" style={{
                        background: 'white',
                        padding: '30px',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        width: '100%',
                        maxWidth: '500px',
                        minHeight: '300px'
                    }}>
                        <h1 style={{ textAlign: 'center', marginBottom: '25px' }}>Login</h1>

                        <b>Email</b>
                        <input
                            type="email"
                            placeholder="Enter your Email"
                            name="email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                margin: '12px 0',
                                border: '1px solid #ddd',
                                borderRadius: '5px',
                                fontSize: '18px'
                            }}
                        />

                        <b>Password</b>
                        <input
                            type="password"
                            placeholder="Enter your Password"
                            name="password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '12px',
                                margin: '10px 0',
                                border: '1px solid #ddd',
                                borderRadius: '5px',
                                fontSize: '18px'
                            }}
                        />

                        <Link to="/forgot-password" style={{
                            display: 'block',
                            textAlign: 'right',
                            fontSize: '14px',
                            marginTop: '5px',
                            color: 'blue',
                            textDecoration: 'none'
                        }}>
                            Forgot Password?
                        </Link>

                        <br />
                        <button type="submit" style={{
                            width: '100%',
                            padding: '10px',
                            backgroundColor: 'black',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}>
                            Login
                        </button>

                        <p style={{ textAlign: 'center', marginTop: '10px' }}>
                            Don't have an account?
                            <Link to="/sign-up" style={{ color: 'blue', textDecoration: 'none' }}> Sign up</Link>
                        </p>

                        {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
