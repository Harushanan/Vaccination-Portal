import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import Cookies from 'js-cookie'; 
import userprofile from '../assets/images/userimge.png';

function PatientHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const userSession = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
  const customername = userSession ? userSession.user.username : "Guest";

  function logout() {
    const logoutConfirm = window.confirm("Are you sure you want to logout?");
    if (logoutConfirm) {
      Cookies.remove("user");
      navigate('/');
    }
  }

  const getLinkStyle = (path) => ({
    color: location.pathname === path ? '#ffeb3b' : 'white',
    fontSize: '18px',
    textDecoration: 'none',
    fontWeight: location.pathname === path ? 'bold' : 'normal',
    borderBottom: location.pathname === path ? '2px solid #ffeb3b' : 'none',
    paddingBottom: '2px',
    padding: '10px 15px',
    display: 'block'
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{
      background: 'linear-gradient(90deg, #004d40, #00acc1)',
      padding: '20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      flexWrap: 'wrap',
      boxShadow: '0 6px 15px rgba(0, 0, 0, 0.4)',
      borderBottom: '3px solid #fff'
    }}>
      
      {/* Brand */}
      <a style={{
        fontSize: '28px',
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

      {/* Hamburger Menu for Mobile */}
      {isMobile && (
        <div style={{ fontSize: '26px', color: 'white', cursor: 'pointer' }} onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>
      )}

      {/* Navigation */}
      <div style={{
        display: isMobile ? (menuOpen ? 'block' : 'none') : 'flex',
        gap: '20px',
        width: isMobile ? '100%' : 'auto',
        backgroundColor: isMobile ? '#00796b' : 'transparent',
        padding: isMobile ? '10px 0' : '0'
      }}>
        <Link to="/patient/userDashboard" style={getLinkStyle("/patient/userDashboard")}>Home</Link>
        <Link to="/patient/BookingVaccine" style={getLinkStyle("/patient/BookingVaccine")}>Booking</Link>
        <Link to="/patient/faq" style={getLinkStyle("/patient/faq")}>FAQ</Link>
      </div>

      {/* Profile */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        position: 'relative',
        marginTop: isMobile && menuOpen ? '10px' : 0
      }} onClick={() => setDropdownVisible(!dropdownVisible)}>
        <img src={userSession?.user?.Image ? userSession.user.Image : userprofile}  alt="User" style={{ width: "50px", height: "50px", borderRadius: "50%", border: "2px solid aqua", marginRight: "10px" }} />
        <h3 style={{ color: 'white', fontSize: '18px' }}><b>{customername}</b></h3>
        <span style={{ fontSize: "20px", marginLeft: "8px", color: "black" }}>▼</span>

        {dropdownVisible && (
          <div style={{
            position: "absolute",
            top: "60px",
            right: 0,
            backgroundColor: "white",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
            width: "150px",
            borderRadius: "5px",
            textAlign: "left",
            zIndex: 999
          }}>
            <Link to='/patient/ProfilePage' style={{ display: "block", padding: "10px", textDecoration: "none", color: "black" }}>View Profile</Link>
            <a onClick={logout} style={{ display: "block", padding: "10px", textDecoration: "none", color: "black", cursor: "pointer" }}>Logout</a>
          </div>
        )}
      </div>
    </div>
  );
}

export default PatientHeader;
