import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Sidebar() {
  const [hoveredLink, setHoveredLink] = useState(null);
  const navigate = useNavigate();

  const logout = () => {
    const logoutConfirm = window.confirm("Are you sure you want to logout this account?");
    if (logoutConfirm) {
      Cookies.remove("user");
      navigate('/');
    }
  };

  const sidebarLinkStyle = (isHovered) => ({
    color: isHovered ? '#00e5ff' : 'white',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '17px',
    padding: '10px 15px',
    borderRadius: '5px',
    transition: 'background-color 0.3s, color 0.3s',
    display: 'block',
    userSelect: 'none',
    backgroundColor: isHovered ? '#00796b' : 'transparent',
    cursor: 'pointer'
  });

  return (
    <nav
      style={{
        width: '260px',
        backgroundColor: '#004d40',
        borderRadius: '0 0 0 10px',
        padding: '20px',
        color: 'white',
        boxShadow: '2px 0 8px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        fontFamily: 'Segoe UI, sans-serif',
        position: 'sticky',
        top: '80px',
        height: 'calc(100vh - 80px)',
        overflowY: 'auto',
        flexShrink: 0,
      }}
    >
      <h2 style={{ marginBottom: '20px', textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.3)', paddingBottom: '10px' }}>
        Admin Panel
      </h2>

      {[
        { to: "/adminDashboard1", label: "Dashboard" },
        { to: "/adminDashboard", label: "User Management" },
        { to: "/AddVaccin", label: "Vaccination Management" },
        { to: "/reports", label: "Reports" },
        { to: "/faq-management", label: "FAQ Management" },
        { to: "/settings", label: "Settings" },
      ].map((link) => (
        <Link
          key={link.to}
          to={link.to}
          onMouseEnter={() => setHoveredLink(link.to)}
          onMouseLeave={() => setHoveredLink(null)}
          style={sidebarLinkStyle(hoveredLink === link.to)}
        >
          {link.label}
        </Link>
      ))}

      <button
        onClick={logout}
        onMouseEnter={() => setHoveredLink('logout')}
        onMouseLeave={() => setHoveredLink(null)}
        style={{
          ...sidebarLinkStyle(hoveredLink === 'logout'),
          backgroundColor: 'transparent',
          border: 'none',
          width: '100%',
          textAlign: 'left',
          padding: '10px 15px',
          cursor: 'pointer'
        }}
      >
        Logout
      </button>
    </nav>
  );
}

export default Sidebar;
