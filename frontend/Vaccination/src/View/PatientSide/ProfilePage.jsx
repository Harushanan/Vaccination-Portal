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
          background: linear-gradient(to right, #f0fdf4, #e0f7fa);
          min-height: 100vh;
          padding: 40px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .back-button {
          background: #00796b;
          color: #fff;
          padding: 10px 20px;
          border-radius: 25px;
          text-decoration: none;
          font-weight: 500;
          margin-bottom: 25px;
          transition: all 0.3s ease-in-out;
        }

        .back-button:hover {
          background: #004d40;
          transform: scale(1.05);
        }

        .profile-card {
          background-color: #ffffff;
          padding: 40px;
          border-radius: 20px;
          max-width: 600px;
          width: 100%;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .profile-image {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid #00bcd4;
          margin: 0 auto;
        }

        .username {
          font-size: 26px;
          color: #222;
          font-weight: 600;
        }

        .profile-table {
          width: 100%;
          margin: 0 auto;
          text-align: left;
        }

        .profile-table td {
          padding: 10px 5px;
          font-size: 16px;
          color: #444;
        }

        .button-group {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .btn {
          padding: 12px;
          font-size: 16px;
          font-weight: 600;
          border: none;
          color: white;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.3s ease-in-out;
        }

        .btn:hover {
          opacity: 0.9;
          transform: translateY(-2px);
        }

        .btn.blue { background-color: #2196f3; }
        .btn.red { background-color: #f44336; }
        .btn.green { background-color: #009688; }

        .report-button, .others-button {
          display: inline-block;
          text-align: center;
          background-color: #4caf50;
          color: white;
          padding: 12px 20px;
          font-size: 16px;
          border-radius: 10px;
          font-weight: 600;
          text-decoration: none;
          transition: background-color 0.3s ease, transform 0.3s;
        }

        .report-button:hover, .others-button:hover {
          background-color: #388e3c;
          transform: translateY(-2px);
        }

        @media (max-width: 600px) {
          .profile-card {
            padding: 25px;
          }
          .username {
            font-size: 22px;
          }
          .btn, .report-button, .others-button {
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
          <img
            src={userSession?.user?.Image ? userSession.user.Image : userprofile}
            alt="Profile"
            className="profile-image"
          />

          <h2 className="username">{userSession.user?.username}</h2>

          <table className="profile-table">
            <tbody>
              <tr><td><strong>📧 Email:</strong></td><td>{userSession.user?.email}</td></tr>
              <tr><td><strong>📞 Phone:</strong></td><td>{userSession.user?.phone}</td></tr>
              <tr><td><strong>🏠 Address:</strong></td><td>{userSession.user?.address}</td></tr>
            </tbody>
          </table>

          <div className="button-group">
            <button onClick={() => navigate('/patient/ProfileUpdate')} className="btn blue">✏️ Edit Profile</button>
            <button onClick={deleteaccount} className="btn red">🗑️ Delete Account</button>
            <button onClick={() => navigate('/changepassword')} className="btn green">🔒 Change Password</button>
          </div>

          <Link to="/patient/MyBooking" className="report-button">
            📄 View My Vaccination Booking
          </Link>

          <Link to="/patient/OthersBooking" className="others-button">
            📁 View Others' Bookings
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProfilePage;
