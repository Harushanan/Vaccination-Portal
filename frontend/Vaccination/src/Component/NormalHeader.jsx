import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import userprofile from '../assets/images/userimge.png';

function NormalHeader() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <header style={{
      background: 'linear-gradient(90deg, #004d40, #00acc1)',
      padding: isMobile ? '12px 16px' : '16px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 6px 15px rgba(0, 0, 0, 0.4)',
      borderBottom: '3px solid #fff',
    }}>
      {/* Back Button */}
      <button
        onClick={handleBack}
        style={{
          backgroundColor: '#ffffff',
          color: '#004d40',
          border: 'none',
          padding: isMobile ? '5px 10px' : '8px 16px',
          borderRadius: '6px',
          fontSize: isMobile ? '14px' : '16px',
          fontWeight: 'bold',
          cursor: 'pointer',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
          transition: 'transform 0.2s ease',
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        ← Back
      </button>

      {/* Brand */}
      <a href="#"
        style={{
          fontSize: isMobile ? '22px' : '30px',
          fontWeight: 'bold',
          color: 'white',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          transition: 'transform 0.3s ease',
          userSelect: 'none',
          margin: '0 auto',
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}>
        💉 <span style={{ margin: '0 8px' }}>VaxCareHp</span> <span style={{ color: '#f44336' }}>+</span> ❤️
      </a>

      {/* Filler for spacing symmetry */}
      <div style={{ width: isMobile ? '60px' : '90px' }}></div>
    </header>
  );
}

export default NormalHeader;
