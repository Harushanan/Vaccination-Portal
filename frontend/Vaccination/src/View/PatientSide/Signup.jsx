import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import loginbackground from '../../assets/images/Login.png';
import axios from "axios";

import Footer from "../../Component/Footer"

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [conformPassword, setconformPassword] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
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

    const strongPassword =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password || !strongPassword.test(password)) {
      setError("Password is not strong");
      return;
    }

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

    axios
      .post("http://localhost:3000/register", {
        username,
        email,
        password,
        phone,
        address,
      })
      .then((result) => {
        if (result.data.message === "EmailAlreadyExists") {
          setError("Email already exists. Try another email");
        } else if (result.data.message === "UserCreated") {
          setError("Please wait......");
          setTimeout(() => {
            navigate("/patient/login");
          }, 3000);
        }
      })
      .catch((err) => {
        console.error("Signup Error: ", err);
        setError("Signup failed. Please try again.");
      });
  }

  return (
    <>
      <style>{`
        /* Container and layout */
        .container {
          display: flex;
          flex-direction: row;
          height: 80vh;
          background: #e9f1f7;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .left-side {
          flex: 2;
          background: url(${loginbackground}) no-repeat center center/cover;
          border-top-left-radius: 12px;
          border-bottom-left-radius: 12px;
          box-shadow: inset 0 0 50px rgba(0,0,0,0.15);
        }
        .right-side {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 36px 30px;
          background: white;
          border-top-right-radius: 12px;
          border-bottom-right-radius: 12px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.1);
        }

        /* Form card */
        .login-box {
          width: 100%;
          max-width: 520px;
          box-sizing: border-box;
        }
        h2 {
          text-align: center;
          margin-bottom: 28px;
          font-weight: 700;
          color: #004d40;
          letter-spacing: 1px;
        }

        /* Label and input in row */
        .field-row {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          gap: 14px;
        }
        .field-row b {
          flex: 0 0 130px;
          font-weight: 600;
          color: #00796b;
          letter-spacing: 0.02em;
          user-select: none;
          white-space: nowrap;
        }
        .field-row input {
          flex: 1;
          padding: 12px 15px;
          border: 1.8px solid #b0bec5;
          border-radius: 8px;
          font-size: 16px;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          outline: none;
        }
        .field-row input:focus {
          border-color: #00796b;
          box-shadow: 0 0 8px rgba(0, 121, 107, 0.3);
        }

        /* Submit button */
        button {
          width: 100%;
          padding: 10px 0;
          font-size: 18px;
          font-weight: 700;
          color: white;
          background: linear-gradient(135deg, #004d40, #26a69a);
          border: none;
          border-radius: 10px;
          cursor: pointer;
          box-shadow: 0 6px 15px rgba(38, 166, 154, 0.5);
          transition: background 0.4s ease, box-shadow 0.4s ease;
          user-select: none;
        }
        button:hover {
          background: linear-gradient(135deg, #00796b, #004d40);
          box-shadow: 0 8px 20px rgba(0, 121, 107, 0.7);
        }
        button:active {
          transform: scale(0.97);
          box-shadow: 0 5px 12px rgba(0, 121, 107, 0.6);
        }

        /* Error message */
        .error-message {
          text-align: center;
          margin-top: 18px;
          color: #d32f2f;
          font-weight: 700;
          letter-spacing: 0.03em;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .container {
            flex-direction: column;
            height: auto;
            border-radius: 0;
          }
          .left-side {
            flex: none;
            height: 220px;
            border-radius: 0;
            box-shadow: none;
          }
          .right-side {
            flex: none;
            padding: 28px 20px;
            border-radius: 0;
            box-shadow: none;
          }
          .field-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 6px;
          }
          .field-row b {
            flex: none;
            width: 100%;
            white-space: normal;
            color: #004d40;
          }
          .field-row input {
            width: 100%;
          }
        }
        @media (max-width: 480px) {
          h2 {
            font-size: 22px;
          }
          .field-row input {
            font-size: 15px;
            padding: 10px 12px;
          }
          button {
            font-size: 16px;
            padding: 12px 0;
          }
        }
      `}</style>

      <div
        style={{
          background:
            "linear-gradient(90deg, #004d40, #00acc1)",
          padding: "20px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          boxShadow: "0 6px 15px rgba(0, 0, 0, 0.4)",
          borderBottom: "3px solid #fff",
        }}
      >
        <a
          href="#"
          style={{
            fontSize: "32px",
            fontWeight: "bold",
            color: "white",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
        >
          💉 <span style={{ margin: "0 8px" }}>VaxCare</span>{" "}
          <span style={{ color: "#f44336" }}>+</span> ❤️
        </a>

        <Link
          to="/patient/login"
          style={{
            display: "inline-block",
            padding: "12px 26px",
            fontSize: "18px",
            fontWeight: "bold",
            background: "linear-gradient(90deg, #3f51b5, #2196f3)",
            color: "white",
            textDecoration: "none",
            borderRadius: "30px",
            textAlign: "center",
            boxShadow: "0 6px 12px rgba(33, 150, 243, 0.3)",
            transition: "background 0.4s ease, transform 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background =
              "linear-gradient(90deg, #1a237e, #1976d2)";
            e.currentTarget.style.transform = "scale(1.08)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background =
              "linear-gradient(90deg, #3f51b5, #2196f3)";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          Login
        </Link>
      </div>

      <div className="container">
        <div className="left-side"></div>
        <div className="right-side">
          <form onSubmit={handleSignup} className="login-box" noValidate>
            <h2>Create Account</h2>

            <div className="field-row">
              <b>Name</b>
              <input
                type="text"
                placeholder="Enter your Username"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="field-row">
              <b>Email</b>
              <input
                type="email"
                placeholder="Enter your Email"
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value.trim())}
                required
              />
            </div>

            <div className="field-row">
              <b>Address</b>
              <input
                type="text"
                placeholder="Enter your Address"
                value={address}
                name="address"
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="field-row">
              <b>Phone number</b>
              <input
                type="tel"
                placeholder="Enter your Phone number"
                name="phone"
                onChange={(e) => setPhone(e.target.value.trim())}
                required
              />
            </div>

            <div className="field-row">
              <b>Password</b>
              <input
                type="password"
                placeholder="Create your Password"
                name="password"
                onChange={(e) => setPassword(e.target.value.trim())}
                required
              />
            </div>

            <div className="field-row">
              <b>Confirm Password</b>
              <input
                type="password"
                placeholder="Confirm your Password"
                name="conformpassword"
                onChange={(e) => setconformPassword(e.target.value.trim())}
                required
              />
            </div>

            <button type="submit">Submit</button>

            {error && <p className="error-message">{error}</p>}
          </form>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Signup;
