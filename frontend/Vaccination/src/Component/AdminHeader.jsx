import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import userprofile from '../assets/images/userimge.png';

function AdminHeader() {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  const logout = () => {
    const logoutConfirm = window.confirm("Are you sure you want to logout this account?");
    if (logoutConfirm) {
      Cookies.remove("user");
      navigate('/');
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header style={{
      background: 'linear-gradient(90deg, #004d40, #00acc1)',
      padding: isMobile ? '10px 20px' : '20px 40px',
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 6px 15px rgba(0, 0, 0, 0.4)',
      borderBottom: '3px solid #fff',
    }}>
      {/* Brand */}
      <a href="#" style={{
        fontSize: isMobile ? '20px' : '32px',
        fontWeight: 'bold',
        color: 'white',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: isMobile ? 'center' : 'flex-start',
        transition: 'transform 0.3s ease',
        userSelect: 'none',
        marginBottom: isMobile ? '10px' : '0'
      }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}>
        💉 <span style={{ margin: '0 8px' }}>VaxCareHp</span> <span style={{ color: '#f44336' }}>+</span> ❤️
      </a>

      {/* Profile and Dropdown */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          position: "relative"
        }}
        onClick={() => setDropdownVisible(!dropdownVisible)}
      >
        <img
          src={userprofile}
          alt="User"
          style={{
            width: isMobile ? "40px" : "60px",
            height: isMobile ? "40px" : "60px",
            borderRadius: "50%",
            border: "2px solid aqua",
            marginRight: "10px"
          }}
        />
        {!isMobile && (
          <>
            <h2 style={{ color: 'white', margin: 0 }}><b>Admin</b></h2>
            <span style={{ fontSize: "24px", marginLeft: "10px", color: "white" }}>☰</span>
          </>
        )}

        {dropdownVisible && (
          <div style={{
            position: "absolute",
            top: isMobile ? "50px" : "70px",
            right: 0,
            backgroundColor: "white",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
            width: "150px",
            borderRadius: "5px",
            textAlign: "left",
            zIndex: 10
          }}>
            <button
              onClick={logout}
              style={{
                display: "block",
                padding: "10px",
                width: '100%',
                border: 'none',
                background: 'none',
                color: 'black',
                textAlign: 'left',
                cursor: "pointer"
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default AdminHeader;
