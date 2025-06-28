import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import NurseHeader from '../../Component/NurseHeader';
import Cookies from 'js-cookie';
import axios from 'axios';
import hospital from "../../assets/images/hospital.png";

function ViewSchedul() {
  const userSession = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
  const nurseID = userSession?.user?.nursingId;

  const [centers, Setcenters] = useState([]);
  const location = useLocation();

  useEffect(() => {
    axios.get("http://localhost:3000/displaycenter")
      .then((result) => {
        Setcenters(result.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const getLinkStyle = (path) => {
    const isActive = location.pathname === path;
    return {
      ...navLinkStyle,
      color: isActive ? 'lightcoral' : 'white'
    };
  };

  const nurseCenters = centers.filter(center => center.nursingId === nurseID);

  return (
    <>
      <style>{`
        .dashboard-container {
          min-height: 100vh;
          background-color: #f0f8ff;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding-bottom: 40px;
        }

        .center-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 15px;
          box-sizing: border-box;
          justify-content: center;
        }

        .center-card {
          background-color: white;
          border-radius: 15px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          padding: 20px;
          transition: transform 0.3s ease;
        }

        .center-card:hover {
          transform: translateY(-5px);
        }

        .center-image {
          width: 100%;
          height: 180px;
          object-fit: contain;
          border-radius: 12px;
          margin-bottom: 15px;
          background-color: #f8f8f8;
        }

        /* Responsive Enhancements */
        @media (max-width: 768px) {
          .center-card {
            padding: 15px;
          }

          .center-image {
            height: 150px;
          }

          nav ul {
            flex-direction: column;
            gap: 15px;
            text-align: center;
          }

          nav {
            padding: 10px 20px !important;
          }

          nav ul li a {
            font-size: 15px !important;
          }
        }

        @media (max-width: 480px) {
          .center-image {
            height: 130px;
          }

          nav ul {
            gap: 10px;
          }

          nav ul li a {
            font-size: 14px !important;
          }
        }
      `}</style>

      <div className="dashboard-container">
        <NurseHeader />

        {/* Navigation Bar */}
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
          <ul style={{
            display: 'flex',
            listStyle: 'none',
            gap: '40px',
            padding: 0,
            margin: 0,
            flexWrap: 'wrap'
          }}>
            <li><Link to="/nurse/viewSchedul" style={getLinkStyle("/nurse/viewSchedul")}>Schedule Center</Link></li>
            <li><Link to="/nurse/ViewBooking" style={getLinkStyle("/nurse/ViewBooking")}>Schedule Appointment</Link></li>
            <li><Link to="/nurse/rejected-appointments" style={getLinkStyle("/nurse/rejected-appointments")}>Rejected Appointments</Link></li>
          </ul>
        </nav>

        {/* Display Center Cards */}
        {nurseCenters.length > 0 ? (
          <div className="center-grid">
            {nurseCenters.map((center) => (
              <div key={center._id} className="center-card">
                <h2 style={{ textAlign: "center" }}>{center.center}</h2>
                <img
                  src={hospital}
                  alt={center.center}
                  className="center-image"
                />
                <p><strong>Email:</strong> {center.email}</p>
                <p><strong>Address:</strong> {center.address}</p>
                <p><strong>Phone:</strong> {center.phone}</p>
                <p><strong>Venue:</strong> {center.venue}</p>
                <p><strong>Working Time:</strong> {`${center.startTime} to ${center.closeTime}`}</p>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: 'center', marginTop: '30px' }}>No centers assigned.</p>
        )}
      </div>
    </>
  );
}

const navLinkStyle = {
  textDecoration: 'none',
  fontWeight: '600',
  fontSize: '17px',
  padding: '10px 15px',
  borderRadius: '5px',
  userSelect: 'none',
  transition: 'color 0.3s ease'
};

export default ViewSchedul;
