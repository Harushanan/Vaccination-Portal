import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import Footer from "../../Component/Footer";
import { FaEnvelope, FaLock, FaUserNurse, FaSpinner } from "react-icons/fa";
import { IoArrowBackCircle } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function NurseLogin() {
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

  const inputStyle = {
    width: "90%",
    padding: "10px 10px 10px 35px",
    margin: "10px 0 20px 0",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "16px",
    outline: "none",
  };

  const handleFocus = (e) => {
    e.target.style.border = "1.5px solid #0288d1";
  };

  const handleBlur = (e) => {
    e.target.style.border = "1px solid #ccc";
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in both email and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/nurselogin", {
        email,
        password,
      });
      const { message, getuser } = response.data;

      setTimeout(() => {
        setLoading(false);
        if (message === "Invalid user") {
          toast.error("New email detected. Please sign up.");
        } else if (message === "Invalidcredentials") {
          toast.error("Incorrect email or password.");
        } else if (message === "Successfullogin") {
          const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000;
          Cookies.set(
            "user",
            JSON.stringify({ user: getuser, expirationTime }),
            { expires: 1 }
          );
          toast.success("Login successful! Redirecting...");
          setTimeout(() => {
            navigate("/nurse/nurseDashboard");
          }, 1500);
        } else {
          toast.error("Unexpected response from server.");
        }
      }, 1500);
    } catch (err) {
      setLoading(false);
      toast.error("Server error. Please try again.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#e3f2fd",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ToastContainer position="top-center" autoClose={3000} />

      {/* Header */}
      <div
        style={{
          background: "linear-gradient(90deg, #004d40, #00acc1)",
          padding: "20px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          borderBottom: "3px solid #ffffff",
          color: "white",
          fontWeight: "bold",
          fontSize: "28px",
        }}
      >
        <span>
          💉 VaxCareHP <span style={{ color: "#f44336" }}>+</span> ❤️
        </span>

        <button
          onClick={() => navigate(-1)}
          style={{
            background: "#fff",
            color: "#004d40",
            border: "none",
            padding: "8px 12px",
            fontSize: "16px",
            borderRadius: "8px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "5px",
          }}
          aria-label="Back"
        >
          <IoArrowBackCircle size={22} /> Back
        </button>
      </div>

      {/* Form Container */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: isMobile ? "20px" : "50px",
        }}
      >
        <form
          onSubmit={handleLogin}
          style={{
            background: "#fff",
            padding: isMobile ? "20px" : "40px",
            borderRadius: "12px",
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
            width: "100%",
            maxWidth: "400px",
            textAlign: "center",
          }}
        >
          {/* Nurse Icon and Heading in a flex container for tighter spacing */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              marginBottom: 20,
            }}
          >
            <FaUserNurse size={48} color="#0288d1" aria-label="Nurse Icon" />
            <h2 style={{ color: "#0288d1", margin: 0 }}>Nurse Login</h2>
          </div>

          {/* Email */}
          <label style={{ display: "block", textAlign: "left" }}>
            <b>Email</b>
          </label>
          <div style={{ position: "relative" }}>
            <FaEnvelope
              style={{
                position: "absolute",
                top: "50%",
                left: "10px",
                transform: "translateY(-50%)",
                color: "#888",
              }}
            />
            <input
              type="email"
              placeholder="Enter your Email"
              name="email"
              required
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>

          {/* Password */}
          <label style={{ display: "block", textAlign: "left" }}>
            <b>Password</b>
          </label>
          <div style={{ position: "relative" }}>
            <FaLock
              style={{
                position: "absolute",
                top: "50%",
                left: "10px",
                transform: "translateY(-50%)",
                color: "#888",
              }}
            />
            <input
              type="password"
              placeholder="Enter your Password"
              name="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          </div>

          <div style={{ textAlign: "right", marginBottom: "10px" }}>
            <Link to="/forgot-password" style={{ fontSize: "14px", color: "#0288d1" }}>
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: loading ? "#aaa" : "#0288d1",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              cursor: loading ? "not-allowed" : "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {loading ? (
              <>
                <FaSpinner className="spin" style={{ marginRight: 8 }} /> Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>

          <p style={{ marginTop: "15px" }}>
            Don't have an account?
            <Link to="/nurse/sign-up" style={{ color: "#0288d1", marginLeft: "6px" }}>
              Sign up
            </Link>
          </p>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default NurseLogin;
