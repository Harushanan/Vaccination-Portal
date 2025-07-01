import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../../Component/Footer";
import { ToastContainer, toast } from "react-toastify";
import { IoArrowBackCircle } from "react-icons/io5";
import { FaUserInjured, FaEnvelope, FaLock, FaPhone, FaHome } from "react-icons/fa";
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth <= 768;

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!username || username.length < 3) {
      toast.error("Username must be at least 3 characters");
      return;
    }

    const strongPassword =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password || !strongPassword.test(password)) {
      toast.error("Password must be strong (Uppercase, Number, Symbol, 8+)");
      return;
    }

    const realPhone = /^(?:\+94|0)(7[01245678]\d{7})$/;
    if (phone.startsWith("+94")) {
      if (phone.length !== 12 || !realPhone.test(phone)) {
        toast.error("Invalid phone number");
        return;
      }
    } else if (phone.length !== 10 || !realPhone.test(phone)) {
      toast.error("Invalid phone number");
      return;
    }

    if (conformPassword !== password) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post("http://localhost:3000/register", {
        username,
        email,
        password,
        phone,
        address,
      });

      setLoading(false);

      if (res.data.message === "EmailAlreadyExists") {
        toast.error("Email already exists");
      } else if (res.data.message === "UserCreated") {
        toast.success("Account created! Redirecting...");
        setTimeout(() => {
          navigate("/patient/login");
        }, 3000);
      } else {
        toast.error("Signup failed. Try again.");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Signup failed. Try again.");
    }
  };

  // Common input styles
  const inputStyle = {
    width: "100%",
    padding: "10px 10px 10px 35px",
    margin: "10px 0 20px 0",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "16px",
    outline: "none",
    transition: "border 0.3s",
  };

  const handleFocus = (e) => {
    e.target.style.border = "1.5px solid #0288d1";
  };

  const handleBlur = (e) => {
    e.target.style.border = "1px solid #ccc";
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#e3f2fd', display: 'flex', flexDirection: 'column' }}>
      <ToastContainer position="top-center" autoClose={3000} />

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'white' }}>
          <FaUserInjured size={40} />
          <h2 style={{ margin: 0, fontWeight: 'bold' }}>Patient Signup</h2>
        </div>

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
          <IoArrowBackCircle size={22} /> Back
        </button>
      </div>

      {/* Form container */}
      <div style={{
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: isMobile ? '20px' : '50px'
      }}>
        <form onSubmit={handleSignup} style={{
          background: '#fff',
          padding: isMobile ? '20px' : '40px',
          borderRadius: '12px',
          boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '450px',
        }}>
          {/* Username */}
          <label><b>Username</b></label>
          <div style={{ position: 'relative' }}>
            <FaUserInjured style={{
              position: 'absolute',
              top: '50%',
              left: '10px',
              transform: 'translateY(-50%)',
              color: '#888'
            }} />
            <input
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>

          {/* Email */}
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
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
              required
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>

          {/* Address */}
          <label><b>Address</b></label>
          <div style={{ position: 'relative' }}>
            <FaHome style={{
              position: 'absolute',
              top: '50%',
              left: '10px',
              transform: 'translateY(-50%)',
              color: '#888'
            }} />
            <input
              type="text"
              placeholder="Enter Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>

          {/* Phone */}
          <label><b>Phone Number</b></label>
          <div style={{ position: 'relative' }}>
            <FaPhone style={{
              position: 'absolute',
              top: '50%',
              left: '10px',
              transform: 'translateY(-50%)',
              color: '#888'
            }} />
            <input
              type="tel"
              placeholder="Enter Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value.trim())}
              required
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>

          {/* Password */}
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
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value.trim())}
              required
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>

          {/* Confirm Password */}
          <label><b>Confirm Password</b></label>
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
              placeholder="Confirm Password"
              value={conformPassword}
              onChange={(e) => setConformPassword(e.target.value.trim())}
              required
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
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
            }}
          >
            {loading ? (
              <>
                <FaLock className="spin" style={{ marginRight: 8 }} /> Registering...
              </>
            ) : 'Register'}
          </button>

          <p style={{ textAlign: 'center', marginTop: '15px' }}>
            Already have an account?
            <Link to="/patient/login" style={{ color: '#0288d1', marginLeft: '6px' }}>
              Login
            </Link>
          </p>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default Signup;
