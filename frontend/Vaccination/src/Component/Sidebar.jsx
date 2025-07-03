import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import {
  FaBars, FaTimes, FaUser, FaHospital,
  FaSyringe, FaMapMarkerAlt, FaQuestionCircle,
  FaNewspaper, FaSignOutAlt
} from 'react-icons/fa';

function Sidebar() {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setIsSidebarOpen(!mobile);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const logout = () => {
    const logoutConfirm = window.confirm("Are you sure you want to logout this account?");
    if (logoutConfirm) {
      Cookies.remove("user");
      navigate('/');
    }
  };

  const links = [
    {
      to: "/admin/adminDashboard",
      label: "Patient Management",
      icon: <FaUser />,
      matchPaths: ["/admin/adminDashboard", "/admin/delete-user"]
    },
    {
      to: "/admin/StaffDahboard",
      label: "Medical Staff Management",
      icon: <FaHospital />,
       matchPaths: ["/admin/StaffDahboard", "/admin/DeleteStaff"]
    },
    {
      to: "/admin/AddVaccin",
      label: "Vaccination Management",
      icon: <FaSyringe />
    },
    {
      to: "/admin/AddCenter",
      label: "Add Vaccination Centers",
      icon: <FaMapMarkerAlt />
    },
    {
      to: "/admin/AdminFaq",
      label: "FAQ Management",
      icon: <FaQuestionCircle />
    },
    {
      to: "/admin/News",
      label: "News Management",
      icon: <FaNewspaper />
    }
  ];

  const getLinkStyle = (isHovered, isActive) => ({
    color: isActive ? '#00e5ff' : isHovered ? '#00e5ff' : '#ffffff',
    textDecoration: 'none',
    fontWeight: isActive ? 'bold' : '500',
    fontSize: '16px',
    padding: '12px 20px',
    borderRadius: '8px',
    backgroundColor: isActive
      ? '#003d33'
      : isHovered
      ? '#00695c'
      : 'transparent',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    boxShadow: isActive ? 'inset 4px 0 0 #00e5ff' : 'none',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  });

  return (
    <>
      {/* Toggle Button */}
      {isMobile && (
        <button
          aria-label="Toggle Sidebar"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          style={{
            position: 'fixed',
            top: '15px',
            left: '15px',
            zIndex: 2000,
            background: '#004d40',
            color: '#fff',
            border: 'none',
            padding: '10px',
            borderRadius: '6px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
          }}
        >
          {isSidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      )}

      {/* Sidebar */}
      {isSidebarOpen && (
        <nav
          style={{
            width: isMobile ? '75%' : '260px',
            backgroundColor: '#004d40',
            padding: '20px',
            color: 'white',
            fontFamily: 'Segoe UI, sans-serif',
            position: isMobile ? 'fixed' : 'sticky',
            top: isMobile ? '0' : '80px',
            height: isMobile ? '100vh' : 'calc(100vh - 80px)',
            overflowY: 'auto',
            zIndex: 1500,
            borderRight: '3px solid #00acc1',
            transition: '0.3s',
            borderTopRightRadius: '10px',
            borderBottomRightRadius: '10px',
            boxShadow: '4px 0 10px rgba(0, 0, 0, 0.3)',
          }}
        >
          <h2 style={{
            marginBottom: '25px',
            textAlign: 'center',
            borderBottom: '1px solid rgba(255,255,255,0.2)',
            paddingBottom: '10px',
            fontSize: '22px',
            letterSpacing: '1px'
          }}>
            Admin Panel
          </h2>

          {links.map((link) => {
            const isActive = link.matchPaths
              ? link.matchPaths.includes(currentPath)
              : currentPath === link.to;

            return (
              <Link
                key={link.to}
                to={link.to}
                style={getLinkStyle(hoveredLink === link.to, isActive)}
                onMouseEnter={() => setHoveredLink(link.to)}
                onMouseLeave={() => setHoveredLink(null)}
                onClick={() => isMobile && setIsSidebarOpen(false)}
              >
                {link.icon}
                {link.label}
              </Link>
            );
          })}

          <button
            aria-label="Logout"
            onClick={logout}
            onMouseEnter={() => setHoveredLink('logout')}
            onMouseLeave={() => setHoveredLink(null)}
            style={{
              ...getLinkStyle(hoveredLink === 'logout', false),
              border: 'none',
              backgroundColor: 'transparent',
              marginTop: '20px',
              width: '100%',
              textAlign: 'left'
            }}
          >
            <FaSignOutAlt />
            Logout
          </button>
        </nav>
      )}
    </>
  );
}

export default Sidebar;
