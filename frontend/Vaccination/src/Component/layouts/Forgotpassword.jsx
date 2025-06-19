import React, { useState } from "react";
import { Link ,useNavigate } from "react-router-dom";


import loginbackground from '../../assets/images/Login.png';

import axios from 'axios';

function Forgotpassword() {
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const [conformpassword, setconformpassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate()

    function handleForgotpassword(e){
        e.preventDefault();
        setError("");

        const strongPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!password || !strongPassword.test(password)) {
            setError("Password is not strong");
            return;
        }

        if (password !== conformpassword) {
            setError("Passwords do not match");
            return;
        }
        
        axios.post("http://localhost:3000/forgotpassword", { email, password })
        .then((result) => {
            const {message} = result.data
            setError("Please wait...");
    
            setTimeout(() => {
                if (message === "Invalid user") {
                    setError("New email detected. Please sign up");
                } 
                else if (message === "Password updated successfully") {
                    setError("Password updated successfully");
                    setTimeout(() => {navigate('/login')}, 2000);
                } 
                
            }, 2000); 
        })
        .catch((err) => {
            console.error("Error:", err);
            setError("Server error. Please try again.");
        });
    
    
    

    }

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
           to="/login"
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
                
            

            <div className="container" style={{ display: 'flex', flex: 1, height: '80vh' }}>
                <div className="left-side" style={{ flex: 2.0, background: `url(${loginbackground})no-repeat center center/cover`  }}></div>
                <div className="right-side" style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f4f4f4', padding: '20px' }}>
                    <form onSubmit={handleForgotpassword} className="login-box" style={{ background: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', width: '100%', maxWidth: '500px' }}>
                        <h2 style={{ textAlign: 'center', marginBottom: '25px' }}>Set Your Password</h2>
                        
                        <b>Email</b>
                        <input
                            type="email"
                            placeholder="Enter your Email"
                            name="email"
                            required
                            onChange={(e) => setemail(e.target.value)}
                            style={{ width: '100%', padding: '12px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '5px'  , fontSize:'16px'}}/>

                        <b>Password</b>
                        <input
                            type="password"
                            placeholder="Create your Password"
                            name="password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ width: '100%', padding: '12px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '5px'  , fontSize:'16px'}}/>

                        <b>Conform password </b>
                        <input
                            type="password"
                            placeholder="Conform your Password"
                            name="conformpassword"
                            required
                            onChange={(e) => setconformpassword(e.target.value)}
                            style={{ width: '100%', padding: '12px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '5px'  , fontSize:'16px'}}/>
                        
                       
                        <button style={{ width: '100%', padding: '10px', backgroundColor: 'black', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}> Submit </button>
                        
                        { error && <p style={{ textAlign: "center", color: "red" }}>{error}</p> }
                        
                    </form>
                </div>
            </div>
        </>
    );
}

export default Forgotpassword;
