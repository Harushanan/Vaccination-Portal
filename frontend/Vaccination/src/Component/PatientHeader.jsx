import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'; 
import userprofile from '../assets/images/userimge.png';

function PatientHeader() {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const userSession = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
  const customername = userSession ? userSession.user.username : "Guest";

  function logout() {
    const logoutConfirm = window.confirm("Are you sure you want to logout?");
    if (logoutConfirm) {
      Cookies.remove("user");
      navigate('/');
    }
  }

  return (
    <div style={{
      background: 'linear-gradient(90deg, #004d40, #00acc1)',
      padding: '20px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 6px 15px rgba(0, 0, 0, 0.4)',
      borderBottom: '3px solid #fff'
    }}>
      
      {/* Brand */}
      <a href="#" style={{
        fontSize: '32px',
        fontWeight: 'bold',
        color: 'white',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        transition: 'transform 0.3s ease',
      }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}>
        💉 <span style={{ margin: '0 8px' }}>VaxCareHP</span> <span style={{ color: '#f44336' }}>+</span> ❤️
      </a>

      {/* Navigation */}
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link to="/BookingVaccine" style={{ color: 'white', fontSize: '18px', textDecoration: 'none' }}>Booking</Link>
        <Link to="/faq" style={{ color: 'white', fontSize: '18px', textDecoration: 'none' }}>FAQ</Link>
        <Link to="/SelectBooking" style={{ color: 'white', fontSize: '18px', textDecoration: 'none' }}>About Us</Link>
      </div>

      {/* Profile + Dropdown */}
      <div style={{ display: "flex", alignItems: "center", cursor: "pointer", position: "relative" }} onClick={() => setDropdownVisible(!dropdownVisible)}>
        <img src={userprofile} alt="User" style={{ width: "60px", height: "60px", borderRadius: "50%", border: "3px solid aqua", marginRight: "10px" }} />
        <h2 style={{ color: 'white' }}><b>{customername}</b></h2>
        <span style={{ fontSize: "24px", marginLeft: "10px", color: "black" }}>☰</span>

        {dropdownVisible && (
          <div style={{
            position: "absolute",
            top: "70px",
            right: 0,
            backgroundColor: "white",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
            width: "150px",
            borderRadius: "5px",
            textAlign: "left"
          }}>
            <Link to='/profile' style={{ display: "block", padding: "10px", textDecoration: "none", color: "black" }}>View Profile</Link>
            <a onClick={logout} style={{ display: "block", padding: "10px", textDecoration: "none", color: "black", cursor: "pointer" }}>Logout</a>
          </div>
        )}
      </div>
    </div>
  );
}

export default PatientHeader;
