import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../../Component/Footer";
import { ToastContainer, toast } from "react-toastify";
import { IoArrowBackCircle } from "react-icons/io5";
import { FaUserNurse, FaEnvelope, FaLock, FaPhone, FaIdBadge } from "react-icons/fa";
import 'react-toastify/dist/ReactToastify.css';

function NurseSignup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setConformPassword] = useState("");
  const [email, setEmail] = useState("");
  const [nurseid, setNurseId] = useState("");
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

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!username || username.length < 3) {
      toast.error("Username must be at least 3 characters long");
      return;
    }

    const strongPassword =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password || !strongPassword.test(password)) {
      toast.error("Password must be strong (Uppercase, Number, Symbol, 8+ chars)");
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
      const result = await axios.post("http://localhost:3000/nurseregister", {
        username,
        email,
        password,
        phone,
        nurseid,
      });

      setLoading(false);

      if (result.data.message === "EmailAlreadyExists") {
        toast.error("Email already exists. Try another email");
      } else if (result.data.message === "UserCreated") {
        toast.success("Account created! Redirecting...");
        setTimeout(() => navigate('/nurse/login'), 3000);
      } else {
        toast.error("Signup failed. Please try again.");
      }
    } catch (err) {
      setLoading(false);
      toast.error("Signup failed. Please try again.");
    }
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
          <FaUserNurse size={40} />
          <h2 style={{ margin: 0, fontWeight: 'bold' }}>Nurse Signup</h2>
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

      {/* Form Container */}
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
          <label><b>Name</b></label>
          <div style={{ position: 'relative' }}>
            <FaUserNurse style={{
              position: 'absolute',
              top: '50%',
              left: '10px',
              transform: 'translateY(-50%)',
              color: '#888'
            }} />
            <input
              type="text"
              placeholder="Enter your Username"
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
              placeholder="Enter your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
              required
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>

          {/* Nurse ID */}
          <label><b>Nursing Registration ID</b></label>
          <div style={{ position: 'relative' }}>
            <FaIdBadge style={{
              position: 'absolute',
              top: '50%',
              left: '10px',
              transform: 'translateY(-50%)',
              color: '#888'
            }} />
            <input
              type="text"
              placeholder="Enter your Nursing License Number"
              value={nurseid}
              onChange={(e) => setNurseId(e.target.value)}
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
              placeholder="Enter your Phone number"
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
              placeholder="Create your Password"
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
              placeholder="Re-enter Password"
              value={conformPassword}
              onChange={(e) => setConformPassword(e.target.value.trim())}
              required
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>

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
              alignItems: 'center',
            }}
          >
            {loading ? "Registering..." : "Submit"}
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default NurseSignup;
