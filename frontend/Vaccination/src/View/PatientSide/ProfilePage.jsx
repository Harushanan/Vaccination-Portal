import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import userprofile from '../../assets/images/userimge.png';
import Cookies from 'js-cookie';
import NormalHeader from '../../Component/NormalHeader';
import Footer from "../../Component/Footer";

const ProfilePage = () => {
  const navigate = useNavigate();
  const userSession = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : {};

  const deleteaccount = () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (confirmDelete) {
      fetch("http://localhost:3000/deleteaccount", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ myemail: userSession.user?.email })
      })
        .then(res => res.json())
        .then(result => {
          if (result.message === "UserDeleted") {
            Cookies.remove("user");
            navigate('/');
          }
        })
        .catch(console.error);
    }
  };

  return (
    <>
      <style>{`
        .profile-container {
          background: linear-gradient(to right, #e0f7fa, #e1f5fe);
          min-height: 100vh;
          padding: 30px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .back-button {
          background: #00796b;
          color: #fff;
          padding: 10px 18px;
          border-radius: 30px;
          text-decoration: none;
          font-weight: 500;
          margin-bottom: 20px;
          transition: background 0.3s;
        }
        .back-button:hover {
          background: #004d40;
        }
        .profile-card {
          background-color: #ffffff;
          padding: 30px;
          border-radius: 15px;
          max-width: 500px;
          width: 100%;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        .profile-image {
          width: 110px;
          height: 110px;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid #00bcd4;
          margin-bottom: 15px;
        }
        .username {
          font-size: 24px;
          color: #333;
          margin-bottom: 20px;
        }
        .profile-table {
          width: 100%;
          text-align: left;
          margin-bottom: 20px;
        }
        .profile-table td {
          padding: 8px 5px;
          font-size: 16px;
          color: #555;
        }
        .button-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 20px;
        }
        .btn {
          padding: 12px;
          font-size: 16px;
          font-weight: 600;
          border: none;
          color: white;
          border-radius: 8px;
          cursor: pointer;
          transition: opacity 0.3s;
        }
        .btn:hover {
          opacity: 0.9;
        }
        .btn.blue {
          background-color: #2196f3;
        }
        .btn.red {
          background-color: #f44336;
        }
        .btn.green {
          background-color: #009688;
        }
        .report-button {
          display: inline-block;
          background-color: #4caf50;
          color: white;
          padding: 12px 20px;
          font-size: 16px;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 600;
          transition: background-color 0.3s ease;
        }
        .report-button:hover {
          background-color: #388e3c;
        }
        @media (max-width: 600px) {
          .profile-card {
            padding: 20px;
          }
          .username {
            font-size: 20px;
          }
          .btn, .report-button {
            font-size: 15px;
            padding: 10px;
          }
          .profile-table td {
            font-size: 14px;
          }
        }
      `}</style>

      <NormalHeader />
      <div className="profile-container">
        <Link
          to={userSession.user?.role === "admin" ? "/adminDashboard" : "/patient/userDashboard"}
          className="back-button"
        >
          ← Back to Dashboard
        </Link>

        <div className="profile-card">
         <img src={userSession?.user?.Image ? userSession.user.Image : userprofile} alt="Profile" className="profile-image"/>

          <h2 className="username">{userSession.user?.username}</h2>

          <table className="profile-table">
            <tbody>
              <tr><td><strong>Email:</strong></td><td>{userSession.user?.email}</td></tr>
              <tr><td><strong>Phone:</strong></td><td>{userSession.user?.phone}</td></tr>
              <tr><td><strong>Address:</strong></td><td>{userSession.user?.address}</td></tr>
            </tbody>
          </table>

          <div className="button-group">
            <button onClick={() => navigate('/patient/ProfileUpdate')} className="btn blue">✏️ Edit Profile</button>
            <button onClick={deleteaccount} className="btn red">🗑️ Delete Account</button>
            <button onClick={() => navigate('/changepassword')} className="btn green">🔒 Change Password</button>
          </div>

          <Link to="/patient/MyBooking" className="report-button">
            📄 View My Vaccination booking
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;
