import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import userprofile from '../assets/images/userimge.png';

function NormalHeader() {
  const navigate = useNavigate();


  return (
    <header style={{
      background: 'linear-gradient(90deg, #004d40, #00acc1)',
      padding: '20px 40px',
      display: 'flex',
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
        fontSize: '32px',
        fontWeight: 'bold',
        color: 'white',
        textDecoration: 'none',
        display: 'flex',
        alignItems: 'center',
        transition: 'transform 0.3s ease',
        userSelect: 'none',
      }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}>
        💉 <span style={{ margin: '0 8px' }}>VaxCareHp</span> <span style={{ color: '#f44336' }}>+</span> ❤️
      </a>
   </header>
  );
}

export default NormalHeader;
