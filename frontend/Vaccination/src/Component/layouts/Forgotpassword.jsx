import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Footer from "../Footer";
import { FaEnvelope, FaLock, FaSpinner } from "react-icons/fa";
import { IoArrowBackCircle } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Forgotpassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformpassword, setConformPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleForgotPassword = (e) => {
    e.preventDefault();

    const strongPassword = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!password || !strongPassword.test(password)) {
      toast.error("Password is not strong");
      return;
    }

    if (password !== conformpassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);

    axios.post("http://localhost:3000/forgotpassword", { email, password })
      .then((result) => {
        const { message } = result.data;
        setTimeout(() => {
          setLoading(false);
          if (message === "Invalid user") {
            toast.error("New email detected. Please sign up");
          } else if (message === "Password updated successfully") {
            toast.success("Password updated successfully");
            setTimeout(() => {
              navigate('/login');
            }, 2000);
          }
        }, 1500);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
        toast.error("Server error. Please try again.");
      });
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
        >
          <IoArrowBackCircle size={22} /> Back
        </button>
      </div>

      {/* Form */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px",
        }}
      >
        <form
          onSubmit={handleForgotPassword}
          style={{
            background: "#fff",
            padding: "40px",
            borderRadius: "12px",
            boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
            width: "100%",
            maxWidth: "420px",
            textAlign: "center",
          }}
        >
          <h2 style={{ marginBottom: "20px", color: "#0288d1" }}>
            Forgot Password
          </h2>

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
              style={{
                width: "90%",
                padding: "10px 10px 10px 35px",
                margin: "10px 0 20px 0",
                border: "1px solid #ccc",
                borderRadius: "6px",
                fontSize: "16px",
              }}
            />
          </div>

          {/* New Password */}
          <label style={{ display: "block", textAlign: "left" }}>
            <b>New Password</b>
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
              placeholder="Create your new Password"
              name="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "90%",
                padding: "10px 10px 10px 35px",
                margin: "10px 0 20px 0",
                border: "1px solid #ccc",
                borderRadius: "6px",
                fontSize: "16px",
              }}
            />
          </div>

          {/* Confirm Password */}
          <label style={{ display: "block", textAlign: "left" }}>
            <b>Confirm Password</b>
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
              placeholder="Confirm your Password"
              name="conformpassword"
              required
              onChange={(e) => setConformPassword(e.target.value)}
              style={{
                width: "90%",
                padding: "10px 10px 10px 35px",
                margin: "10px 0 20px 0",
                border: "1px solid #ccc",
                borderRadius: "6px",
                fontSize: "16px",
              }}
            />
          </div>

          {/* Submit Button */}
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
              gap: "8px",
            }}
          >
            {loading ? (
              <>
                <FaSpinner className="spin" /> Updating...
              </>
            ) : (
              "Submit"
            )}
          </button>

          <p style={{ marginTop: "20px", fontSize: "14px" }}>
            Already have an account?{" "}
            <Link to="/patient/login" style={{ color: "#0288d1" }}>
              Login
            </Link>
          </p>
        </form>
      </div>

      <ToastContainer position="top-center" autoClose={3000} hideProgressBar />
      <Footer />
    </div>
  );
}

export default Forgotpassword;
