import React, { useRef, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import NormalHeader from '../../Component/NormalHeader';
import Footer from "../../Component/Footer";

const MyBooking = () => {
  const userSession = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : {};
  const [vaccines, setVaccines] = useState([]);

  useEffect(() => {
    if (userSession.user?.email) {
      axios.get(`http://localhost:3000/vaccinepersonlist/${userSession.user.email}`)
        .then(res => {
          if (res.data.message === "Booking fetched successfully") {
            setVaccines(res.data.getbooking);
          }
        })
        .catch(console.error);
    }
  }, []);

  const getStatusStyle = (status) => {
    const base = {
      padding: '4px 10px',
      borderRadius: '12px',
      fontWeight: 'bold',
      fontSize: '13px',
      textTransform: 'capitalize',
    };
    if (status === "inject") return { ...base, color: "white", backgroundColor: "green" };
    if (status === "removed") return { ...base, color: "white", backgroundColor: "red" };
    if (status === "pending") return { ...base, color: "white", backgroundColor: "orange" };
    return { ...base, color: "white", backgroundColor: "gray" };
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      axios.delete(`http://localhost:3000/deletebooking/${id}`)
        .then(res => {
          if (res.data.success) {
            setVaccines(prev => prev.filter(v => v._id !== id));
          }
        })
        .catch(console.error);
    }
  };

  const handleEdit = (vaccine) => {
    alert(`Edit clicked for ID: ${vaccine._id}`);
  };

  return (
    <>
      <NormalHeader />
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{ flex: '1', padding: '20px', boxSizing: 'border-box' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Vaccination Report</h2>
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              minWidth: '800px',
              boxShadow: '0 0 10px rgba(0,0,0,0.1)'
            }}>
              <thead style={{ backgroundColor: '#f0f0f0' }}>
                <tr>
                  <th style={thStyle}>Vaccine</th>
                  <th style={thStyle}>Dose</th>
                  <th style={thStyle}>Date</th>
                  <th style={thStyle}>Center</th>
                  <th style={thStyle}>Status</th>
                  <th style={thStyle}>Reason</th>
                  <th style={thStyle}>Injected By</th>
                  <th style={thStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {vaccines.length ? vaccines.map((vaccine, i) => (
                  <tr key={i} style={{ textAlign: 'center' }}>
                    <td style={tdStyle}>{vaccine.vaccine}</td>
                    <td style={tdStyle}>{vaccine.dose}</td>
                    <td style={tdStyle}>{vaccine.date}</td>
                    <td style={tdStyle}>{vaccine.center}</td>
                    <td style={tdStyle}>
                      <span style={getStatusStyle(vaccine.status)}>{vaccine.status}</span>
                    </td>
                    <td style={tdStyle}>
                      {vaccine.removereason === 'no reason provided' ? '-' : vaccine.removereason}
                    </td>
                    <td style={tdStyle}>
                      {vaccine.status === 'inject' ? `${vaccine.injectBy} (${vaccine.injectById})` : '-'}
                    </td>
                    <td style={tdStyle}>
                      <button
                        onClick={() => handleEdit(vaccine)}
                        style={editBtnStyle}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(vaccine._id)}
                        style={deleteBtnStyle}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="8" style={{ textAlign: 'center', padding: '20px' }}>
                      No vaccination history found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

// Table header & cell style
const thStyle = {
  padding: '12px',
  fontWeight: 'bold',
  borderBottom: '2px solid #ccc',
};

const tdStyle = {
  padding: '10px',
  borderBottom: '1px solid #eee',
};

// Button Styles
const editBtnStyle = {
  backgroundColor: '#2196F3',
  color: 'white',
  border: 'none',
  padding: '5px 10px',
  borderRadius: '5px',
  marginRight: '5px',
  cursor: 'pointer'
};

const deleteBtnStyle = {
  backgroundColor: '#f44336',
  color: 'white',
  border: 'none',
  padding: '5px 10px',
  borderRadius: '5px',
  cursor: 'pointer'
};

export default MyBooking;
