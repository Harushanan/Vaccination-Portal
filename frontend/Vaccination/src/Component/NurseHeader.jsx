import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import Cookies from 'js-cookie'; 
import nurseprofile from '../assets/images/userimge.png';

function NurseHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const nurseSession = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
  const nurseName = nurseSession ? nurseSession.user.username : "Nurse";

  function logout() {
    if (window.confirm("Are you sure you want to logout?")) {
      Cookies.remove("user");
      navigate('/');
    }
  }

  const linkStyle = (paths) => ({
    color: paths.includes(location.pathname) ? '#FFD700' : 'white',
    fontSize: '18px',
    textDecoration: 'none',
    borderBottom: paths.includes(location.pathname) ? '2px solid #FFD700' : 'none',
    paddingBottom: '2px'
  });

  const styles = {
    container: {
      background: 'linear-gradient(90deg, #004d40, #00acc1)',
      padding: '15px 25px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 6px 15px rgba(0, 0, 0, 0.4)',
      borderBottom: '3px solid #fff',
      flexWrap: 'wrap'
    },
    brand: {
      fontSize: '28px',
      fontWeight: 'bold',
      color: 'white',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      transition: 'transform 0.3s ease',
    },
    navLinks: {
      display: mobileMenu ? 'flex' : 'none',
      flexDirection: 'column',
      gap: '10px',
      backgroundColor: '#00796b',
      padding: '10px',
      borderRadius: '8px',
      marginTop: '10px',
    },
    desktopNavLinks: {
      display: 'flex',
      gap: '20px',
    },
    profile: {
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      position: "relative"
    },
    dropdown: {
      position: "absolute",
      top: "70px",
      right: 0,
      backgroundColor: "white",
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
      width: "150px",
      borderRadius: "5px",
      textAlign: "left",
      zIndex: 1001
    },
    hamburger: {
      display: 'none',
      fontSize: '24px',
      color: 'white',
      cursor: 'pointer',
    }
  };

  // Responsive tweak using window width
  const isMobile = window.innerWidth <= 768;

  return (
    <div style={styles.container}>
      {/* Logo */}
      <a
        href="#"
        style={styles.brand}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
      >
        🩺 <span style={{ margin: '0 8px' }}>VaxCareHP</span> <span style={{ color: '#f44336' }}>+</span>
      </a>

      {/* Hamburger for Mobile */}
      {isMobile && (
        <div style={styles.hamburger} onClick={() => setMobileMenu(!mobileMenu)}>
          ☰
        </div>
      )}

      {/* Navigation Links */}
      <div style={isMobile ? styles.navLinks : styles.desktopNavLinks}>
        <Link to="/nurse/nurseDashboard" style={linkStyle(["/nurse/nurseDashboard"])}>Home</Link>
        <Link to="/nurse/viewSchedul" style={linkStyle(['/nurse/viewSchedul', '/nurse/ViewBooking'])}>Schedule</Link>
        <Link to="" style={linkStyle([""])}>Patients</Link>
        <Link to="" style={linkStyle([""])}>FAQ</Link>
      </div>

      {/* Profile & Dropdown */}
      <div style={styles.profile} onClick={() => setDropdownVisible(!dropdownVisible)}>
        <img src={nurseprofile} alt="Nurse" style={{ width: "50px", height: "50px", borderRadius: "50%", border: "2px solid aqua", marginRight: "10px" }} />
        <h4 style={{ color: 'white', margin: 0 }}>{nurseName}</h4>
        <span style={{ fontSize: "20px", marginLeft: "10px", color: "white" }}>▼</span>

        {dropdownVisible && (
          <div style={styles.dropdown}>
            
                        <Link to='/nurse/NurseProfile' style={{ display: "block", padding: "10px", textDecoration: "none", color: "black" }}>View Profile</Link>
            <a onClick={logout} style={{ display: "block", padding: "10px", textDecoration: "none", color: "black", cursor: "pointer" }}>Logout</a>
          </div>
        )}
      </div>
    </div>
  );
}

export default NurseHeader;
