import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import AdminHeader from '../../Component/AdminHeader';
import Sidebar from '../../Component/Sidebar';
import axios from 'axios';

function AddCenter() {
  const [center, setCenter] = useState('');
  const [address, setAddress] = useState('');
  const [venue, setVenue] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [startTime, setStartTime] = useState('');
  const [closeTime, setCloseTime] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
        setSuccess("Center added successfully");
        setTimeout(() => navigate('/admin/ViewCenter'), 3000);
      } else if (result.data.message === "centerAlreadyExists") {
        setError("Center already exists");
      }
    })
    .catch((err) => {
      console.error("Error adding center:", err);
      setError("Failed to add center. Please try again.");
    });
};


  return (
    <>
      <AdminHeader />

      <div style={{ display: 'flex', minHeight: '90vh', backgroundColor: '#e6f7ff' }}>
        <Sidebar />

        <main style={{ flex: 1, overflowX: 'auto', padding: '20px 40px', fontFamily: 'Segoe UI, sans-serif' }}>
          <nav style={{
            background: 'linear-gradient(90deg,rgb(0, 77, 64),rgba(0, 68, 193, 0.95))',
            padding: '10px 60px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '12px',
            margin: '20px auto',
            maxWidth: '90%',
            boxShadow: '0 6px 16px rgba(0, 0, 0, 0.4)',
            fontFamily: 'Segoe UI, sans-serif'
          }}>
            <ul style={{ display: 'flex', listStyle: 'none', gap: '40px', padding: 0, margin: 0 }}>
               <li><Link to="/admin/AddCenter" style={navLinkStyle}>Add Center</Link></li>
                            <li><Link to="/admin/ViewCenter" style={navLinkStyle}>View Center</Link></li>
            </ul>
          </nav>

          <h1 style={{ marginBottom: '10px' }}>Add New Center</h1>

          <div style={styles.container}>
            <h2 style={styles.heading}>Add New Center</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
              <label style={styles.label}>
                Vaccine Center (Hospital):
                <input
                  type="text"
                  onChange={(e) => setCenter(e.target.value.trim())}
                  required
                  style={styles.input}
                />
              </label>

              <label style={styles.label}>
                Email:
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value.trim())}
                  required
                  style={styles.input}
                />
              </label>

              <label style={styles.label}>
                Telephone:
                <input
                  type="tel"
                  onChange={(e) => setPhone(e.target.value.trim())}
                  required
                  style={styles.input}
                />
              </label>

              <label style={styles.label}>
                Location / Address:
                <textarea
                  onChange={(e) => setAddress(e.target.value)}
                  rows="4"
                  required
                  style={{ ...styles.input, resize: 'vertical' }}
                />
              </label>

              <label style={styles.label}>
                Venue:
                <input
                  type="text"
                  onChange={(e) => setVenue(e.target.value.trim())}
                  required
                  style={styles.input}
                />
              </label>

              <label style={styles.label}>
                Start Time:
                <input
                  type="time"
                  onChange={(e) => setStartTime(e.target.value)}
                  required
                  style={styles.input}
                />
              </label>

              <label style={styles.label}>
                Close Time:
                <input
                  type="time"
                  onChange={(e) => setCloseTime(e.target.value)}
                  required
                  style={styles.input}
                />
              </label>

              <button type="submit" style={styles.button}>Add Center</button>
              {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}
              {success && <p style={{ textAlign: "center", color: "green" }}>{success}</p>}
            </form>
          </div>
        </main>
      </div>
    </>
  );
}

const navLinkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontWeight: '600',
  fontSize: '17px',
  padding: '10px 15px',
  borderRadius: '5px',
  userSelect: 'none',
};

const styles = {
  container: {
    maxWidth: '500px',
    margin: '40px auto',
    padding: '20px',
    backgroundColor: '#f4f4f4',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif'
  },
  heading: {
    textAlign: 'center',
    color: '#00796b',
    marginBottom: '20px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '15px',
    fontWeight: '600',
    fontSize: '15px'
  },
  input: {
    marginTop: '5px',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    width: '100%',
    fontSize: '14px'
  },
  button: {
    marginTop: '20px',
    padding: '12px',
    backgroundColor: '#00796b',
    color: 'white',
    fontSize: '16px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  }
};

export default AddCenter;
