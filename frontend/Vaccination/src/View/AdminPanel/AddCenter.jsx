import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import AdminHeader from '../../Component/AdminHeader';
import Sidebar from '../../Component/Sidebar';
import Footer from "../../Component/Footer";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddCenter() {
  const [center, setCenter] = useState('');
  const [address, setAddress] = useState('');
  const [venue, setVenue] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [startTime, setStartTime] = useState('');
  const [closeTime, setCloseTime] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:3000/addcenter", {
      center,
      address,
      venue,
      email,
      phone,
      startTime,
      closeTime
    })
      .then((result) => {
        if (result.data.message === "centerCreated") {
          toast.success("✅ Center added successfully!");
          setTimeout(() => navigate('/admin/ViewCenter'), 2500);
        } else if (result.data.message === "centerAlreadyExists") {
          toast.error("⚠️ Center already exists");
        }
      })
      .catch((err) => {
        console.error("Error adding center:", err);
        toast.error("🚨 Failed to add center. Please try again.");
      });
  };

  return (
    <>
      <style>{`
        .admin-container {
          display: flex;
          min-height: 100vh;
          background: #f9f9f9;
        }

        .admin-main {
          flex: 1;
          padding: 20px;
          max-width: 900px;
          margin: auto;
        }

        nav ul {
          list-style: none;
          padding: 0;
          display: flex;
          gap: 20px;
          margin-bottom: 20px;
          background-color: #f44336;
          border-radius: 8px;
          padding: 10px 20px;
        }

        nav ul li a {
          color: white;
          text-decoration: none;
          font-weight: 600;
        }

        h1 {
          text-align: center;
          margin-bottom: 30px;
          color: #333;
        }

        form {
          background: white;
          padding: 25px 30px;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }

        label {
          display: block;
          margin-bottom: 15px;
          font-weight: 600;
          color: #444;
        }

        input[type="text"],
        input[type="email"],
        input[type="tel"],
        input[type="time"],
        textarea {
          width: 100%;
          padding: 10px 12px;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 1rem;
          transition: border-color 0.3s ease;
          box-sizing: border-box;
        }

        input[type="text"]:focus,
        input[type="email"]:focus,
        input[type="tel"]:focus,
        input[type="time"]:focus,
        textarea:focus {
          border-color: #f44336;
          outline: none;
        }

        textarea {
          resize: vertical;
        }

        button[type="submit"] {
          background-color: #f44336;
          color: white;
          font-weight: 700;
          padding: 12px 25px;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          margin-top: 10px;
          width: 100%;
          font-size: 1.1rem;
          transition: background-color 0.3s ease;
        }

        button[type="submit"]:hover {
          background-color: #d32f2f;
        }

        @media (max-width: 600px) {
          nav ul {
            flex-direction: column;
            gap: 10px;
          }

          form {
            padding: 20px;
          }
        }
      `}</style>

      <AdminHeader />

      <div className="admin-container">
        <Sidebar />

        <main className="admin-main">
          <nav>
            <ul>
              <li><Link to="/admin/AddCenter">Add Center</Link></li>
              <li><Link to="/admin/ViewCenter">View Center</Link></li>
            </ul>
          </nav>

          <h1>Add New Center</h1>

          <form onSubmit={handleSubmit}>
            <label>
              Vaccine Center (Hospital):
              <input
                type="text"
                value={center}
                onChange={(e) => setCenter(e.target.value.trimStart())}
                required
              />
            </label>

            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value.trim())}
                required
              />
            </label>

            <label>
              Telephone:
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.trim())}
                required
              />
            </label>

            <label>
              Location / Address:
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows="4"
                required
              />
            </label>

            <label>
              Venue:
              <input
                type="text"
                value={venue}
                onChange={(e) => setVenue(e.target.value.trimStart())}
                required
              />
            </label>

            <label>
              Start Time:
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
              />
            </label>

            <label>
              Close Time:
              <input
                type="time"
                value={closeTime}
                onChange={(e) => setCloseTime(e.target.value)}
                required
              />
            </label>

            <button type="submit">Add Center</button>
          </form>
        </main>
      </div>

      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default AddCenter;
