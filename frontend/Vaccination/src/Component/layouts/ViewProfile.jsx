import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import userprofile from '../../assets/images/userimge.png';
import Cookies from 'js-cookie';
import axios from 'axios';
import NormalHeader from '../NormalHeader';

const Profile = () => {
  const navigate = useNavigate();
  const userSession = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : {};
  const myemail = userSession?.user?.email;

  const [vaccines, setVaccines] = useState([]);

  useEffect(() => {
    if (myemail) {
      axios.get(`http://localhost:3000/vaccinepersonlist/${myemail}`)
        .then((result) => {
          if (result.data.message === "Booking fetched successfully") {
            // Wrap single object into array
            setVaccines([result.data.getbooking]);
          }
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, []);

  const deleteaccount = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete Your Account?");
    if (confirmDelete) {
      axios.post("http://localhost:3000/deleteaccount", { myemail })
        .then((result) => {
          if (result.data.message === "UserDeleted") {
            Cookies.remove("user");
            navigate('/');
          }
        })
        .catch((err) => {
          console.error("Delete Error:", err);
        });
    }
  };

  const styles = {
    page: {
      padding: '20px',
      backgroundColor: '#f4f7f9',
      minHeight: '100vh',
      fontFamily: 'Segoe UI, sans-serif'
    },
    backLink: {
      display: 'inline-block',
      padding: '10px 25px',
      fontSize: '16px',
      background: 'linear-gradient(to right, #1cb5e0, #000851)',
      color: 'white',
      borderRadius: '25px',
      textDecoration: 'none',
      margin: '20px',
      transition: 'transform 0.2s',
      cursor: 'pointer'
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '30px',
      justifyContent: 'center',
      alignItems: 'flex-start'
    },
    card: {
      backgroundColor: '#fff',
      padding: '30px',
      borderRadius: '20px',
      boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
      width: '360px',
      textAlign: 'center',
      transition: 'transform 0.2s ease-in-out'
    },
    profileImage: {
      width: '120px',
      height: '120px',
      borderRadius: '50%',
      border: '4px solid #1cb5e0',
      objectFit: 'cover',
      marginBottom: '15px'
    },
    username: {
      fontSize: '24px',
      color: '#333',
      fontWeight: '600',
      marginBottom: '10px'
    },
    infoTable: {
      textAlign: 'left',
      marginBottom: '20px'
    },
    btn: {
      display: 'block',
      width: '100%',
      padding: '12px',
      marginTop: '10px',
      fontWeight: 'bold',
      borderRadius: '8px',
      border: 'none',
      color: '#fff',
      cursor: 'pointer',
      fontSize: '15px',
      transition: 'all 0.3s ease'
    },
    edit: { backgroundColor: '#007BFF' },
    delete: { backgroundColor: '#dc3545' },
    changePass: { backgroundColor: '#17A2B8' },
    orders: {
      flex: 1,
      minWidth: '350px',
      backgroundColor: '#fff',
      padding: '25px',
      borderRadius: '20px',
      boxShadow: '0 12px 24px rgba(0,0,0,0.1)'
    },
    orderTitle: {
      color: '#007BFF',
      fontWeight: 'bold',
      marginBottom: '15px'
    },
    orderBox: {
      overflowX: 'auto'
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse'
    },
    th: {
      backgroundColor: '#007BFF',
      color: 'white',
      padding: '12px',
      textAlign: 'left'
    },
    td: {
      border: '1px solid #ccc',
      padding: '10px',
      textAlign: 'left'
    }
  };

  return (
    <>
      <NormalHeader />
      <div style={styles.page}>
        <Link
          to={userSession.user?.role === "admin" ? "/adminDashboard" : "/userDashboard"}
          style={styles.backLink}
        >
          <b> ← Back</b>
        </Link>

        <div style={styles.container}>
          {/* Profile Card */}
          <div style={styles.card}>
            <img src={userprofile} alt="Profile" style={styles.profileImage} />
            <h2 style={styles.username}>{userSession.user?.username}</h2>
            <table style={styles.infoTable}>
              <tbody>
                <tr><td><strong>Email:</strong> {userSession.user?.email}</td></tr>
                <tr><td><strong>Phone:</strong> {userSession.user?.phone}</td></tr>
                <tr><td><strong>Address:</strong> {userSession.user?.address}</td></tr>
              </tbody>
            </table>

            <button style={{ ...styles.btn, ...styles.edit }} onClick={() => navigate('/updateprofile')}>Edit Profile</button>
            <button style={{ ...styles.btn, ...styles.delete }} onClick={deleteaccount}>Delete Account</button>
            <button style={{ ...styles.btn, ...styles.changePass }} onClick={() => navigate('/changepassword')}>Change Password</button>
          </div>

          {/* Vaccination History */}
          <div style={styles.orders}>
            <h2 style={styles.orderTitle}>{userSession.user?.username}'s Vaccination History</h2>
            <div style={styles.orderBox}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Vaccine</th>
                    <th style={styles.th}>Dose Type</th>
                    <th style={styles.th}>Date</th>
                    <th style={styles.th}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {vaccines.length > 0 ? (
                    vaccines.map((vaccine, index) => (
                      <tr key={index}>
                        <td style={styles.td}>{vaccine.vaccine}</td>
                        <td style={styles.td}>{vaccine.dose}</td>
                        <td style={styles.td}>{vaccine.date}</td>
                        <td style={styles.td}>{vaccine.status || "Pending"}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" style={{ ...styles.td, textAlign: 'center' }}>No vaccination history found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
