import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import loginbackground from '../../assets/images/nurselogin.png';

function NurseSignup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [conformPassword, setconformPassword] = useState("");
    const [email, setEmail] = useState("");
    const [nurseid, setNurseId] = useState("");
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    function handleSignup(e) {
        e.preventDefault();
        setError("");

        if (!username || username.length < 3) {
            setError("Username must be at least 3 characters long");
            return;
        }

        const strongPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!password || !strongPassword.test(password)) {
            setError("Password is not strong");
            return;
        }
 
        /*const regex = /^[A-Za-z0-9]{6,12}$/;

if (!regex.test(nursingid)) {
    setError("Invalid Nursing ID. Must be 6–12 alphanumeric characters.");
    return;
}*/


        const realPhone = /^(?:\+94|0)(7[01245678]\d{7})$/;
        if (phone.startsWith("+94")) {
            if (phone.length !== 12 || !realPhone.test(phone)) {
                setError("Invalid phone number");
                return;
            }
        } else if (phone.length !== 10 || !realPhone.test(phone)) {
            setError("Invalid phone number");
            return;
        }

        if (conformPassword !== password) {
            setError("Password not match");
            return;
        }

        axios.post("http://localhost:3000/nurseregister", { username, email, password, phone, nurseid })
            .then((result) => {
                if (result.data.message === "EmailAlreadyExists") {
                    setError("Email already exists. Try another email");
                } else if (result.data.message === "UserCreated") {
                    setError("Please wait......");
                    setTimeout(() => { navigate('/nurse/login') }, 3000);
                }
            })
            .catch((err) => {
                console.error("Signup Error: ", err);
                setError("Signup failed. Please try again.");
            });
    }

    const inputStyle = {
        width: "100%",
        padding: "10px 12px",
        margin: "10px 0",
        border: "1px solid #ccc",
        borderRadius: "6px",
        fontSize: "15px",
        boxSizing: "border-box",
    };

    const buttonStyle = {
        width: "100%",
        padding: "12px",
        backgroundColor: "#00acc1",
        color: "#fff",
        fontWeight: "bold",
        fontSize: "15px",
        border: "none",
        borderRadius: "6px",
        cursor: "pointer",
        boxShadow: "0 4px 10px rgba(0, 172, 193, 0.3)",
    };

    return (
        <>
            <div style={{
                background: 'linear-gradient(90deg, #004d40, #00acc1)',
                padding: '20px 40px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                position: 'sticky',
                top: 0,
                zIndex: 1000,
                boxShadow: '0 6px 15px rgba(0, 0, 0, 0.4)',
                borderBottom: '3px solid #fff'
            }}>
                <a
                    href="#"
                    style={{
                        fontSize: '32px',
                        fontWeight: 'bold',
                        color: 'white',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
                    onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                >
                    💉 <span style={{ margin: '0 8px' }}>VaxCare</span> <span style={{ color: '#f44336' }}>+</span> ❤️
                </a>

                <Link
                    to="/nurse/login"
                    style={{
                        display: 'inline-block',
                        padding: '12px 26px',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        background: 'linear-gradient(90deg, #3f51b5, #2196f3)',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '30px',
                        textAlign: 'center',
                        boxShadow: '0 6px 12px rgba(33, 150, 243, 0.3)',
                        transition: 'background 0.4s ease, transform 0.3s ease'
                    }}
                    onMouseEnter={e => {
                        e.currentTarget.style.background = 'linear-gradient(90deg, #1a237e, #1976d2)';
                        e.currentTarget.style.transform = 'scale(1.08)';
                    }}
                    onMouseLeave={e => {
                        e.currentTarget.style.background = 'linear-gradient(90deg, #3f51b5, #2196f3)';
                        e.currentTarget.style.transform = 'scale(1)';
                    }}
                >
                    Login
                </Link>
            </div>

            <div className="container" style={{
                display: 'flex',
                flexDirection: 'row',
                height: '80vh',
                overflow: 'hidden',
            }}>
                <div className="left-side" style={{
                    flex: 1.4,
                    backgroundImage: `url(${loginbackground})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    height: '100%',
                }}></div>

                <div className="right-side" style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#f4f4f4',
                    padding: '20px'
                }}>
                    <form onSubmit={handleSignup} style={{
                        background: 'white',
                        padding: '30px',
                        borderRadius: '10px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        width: '100%',
                        maxWidth: '500px',
                        maxHeight: '80vh',
                        overflowY: 'auto'
                    }}>
                        <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Create Nurse Account</h2>

                        <b>Name</b>
                        <input type="text" name="username" placeholder="Enter your Username" onChange={(e) => setUsername(e.target.value)} required style={inputStyle} />

                        <b>Email</b>
                        <input type="email" name="email" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value.trim())} required style={inputStyle} />

                        <b>Nursing License Number / Registration ID</b>
                        <input type="text" name="nurseid" placeholder="Enter your Nursing License Number" value={nurseid} onChange={(e) => setNurseId(e.target.value)} required style={inputStyle} />

                        <b>Phone number</b>
                        <input type="tel" name="phone" placeholder="Enter your Phone number" onChange={(e) => setPhone(e.target.value.trim())} required style={inputStyle} />

                        <b>Password</b>
                        <input type="password" name="password" placeholder="Create your Password" onChange={(e) => setPassword(e.target.value.trim())} required style={inputStyle} />

                        <b>Confirm Password</b>
                        <input type="password" name="conformpassword" placeholder="Re-enter Password" onChange={(e) => setconformPassword(e.target.value.trim())} required style={inputStyle} />

                        <button style={buttonStyle}>Submit</button>
                        {error && <p style={{ textAlign: "center", color: "red", marginTop: '10px' }}>{error}</p>}
                    </form>
                </div>
            </div>
        </>
    );
}

export default NurseSignup;
