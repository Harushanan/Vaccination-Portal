import React, { useState, useEffect } from 'react';
import background from '../assets/images/welocom2.png';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const WelcomePage = () => {
  const userSession = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowWidth < 768;

  function checksession() {
    if (userSession) {
      if (userSession.user.role === "customer") {
        navigate('/patient/userDashboard');
      } else if (userSession.user.role === "nurse") {
        navigate('/nurse/nurseDashboard');
      } else {
        navigate('/adminDashboard');
      }
    } else {
      navigate('/CheckUser');
    }
  }

  const containerStyle = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    backgroundColor: '#f0f9ff',
    fontFamily: "'Segoe UI', sans-serif",
  };

  const leftPanelStyle = {
    flex: 1,
    padding: isMobile ? '40px 20px' : '80px 60px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #e0f7fa, #ffffff)',
    textAlign: isMobile ? 'center' : 'left',
  };

  const rightPanelStyle = {
    flex: 1,
    backgroundImage: `url(${background})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: isMobile ? '300px' : 'auto',
  };

  const logoStyle = {
    fontSize: isMobile ? '26px' : '36px',
    fontWeight: 'bold',
    color: '#004d40',
    marginBottom: '30px',
  };

  const headingStyle = {
    fontSize: isMobile ? '28px' : '42px',
    color: '#004d40',
    marginBottom: '20px',
    fontWeight: '700',
  };

  const paragraphStyle = {
    fontSize: isMobile ? '16px' : '18px',
    lineHeight: '1.7',
    color: '#333',
    marginBottom: '30px',
  };

  const buttonStyle = {
    padding: '14px 32px',
    fontSize: isMobile ? '16px' : '18px',
    background: 'linear-gradient(135deg, #26a69a, #0097a7)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
    boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
  };

  return (
    <div style={containerStyle}>
      {/* Left Text Panel */}
      <div style={leftPanelStyle}>
        <div style={logoStyle}>💉 VaxCareHP <span style={{ color: '#f44336' }}>+</span> ❤️</div>
        <h1 style={headingStyle}>Vaccinate for a Safer Tomorrow</h1>
        <p style={paragraphStyle}>
          At VaxCareHP, we help you stay protected with easy, fast, and verified vaccinations.
          Book your appointment, track your records, and keep your family safe—all in one place.
        </p>
        <button
          style={buttonStyle}
          onClick={checksession}
          onMouseOver={e => (e.target.style.transform = 'scale(1.05)')}
          onMouseOut={e => (e.target.style.transform = 'scale(1)')}
        >
          Get Vaccinated Now 💉
        </button>
      </div>

      {/* Right Image Panel */}
      <div style={rightPanelStyle}></div>
    </div>
  );
};

export default WelcomePage;
