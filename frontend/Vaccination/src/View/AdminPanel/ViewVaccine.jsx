import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie'; 
import AdminHeader from '../../Component/AdminHeader';
import Sidebar from '../../Component/Sidebar';


function ViewVaccine() {
const [vaccine, setvaccine] = useState([]);

   useEffect(() => {
    axios.get("http://localhost:3000/vaccinelist")
      .then((result) => { 
        setvaccine(result.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  

 

  return (
    <>
      {/* Header */}
      <AdminHeader/>

      {/* Main container */}
      <div style={{
        display: 'flex',
        minHeight: '90vh',
        backgroundColor: '#e6f7ff',
      }}>
        {/* Sidebar */}
        <Sidebar/>

        {/* Main content */}
        <main
          style={{
            flex: 1,
            overflowX: 'auto',
            padding: '20px 40px',
            fontFamily: 'Segoe UI, sans-serif',
          }}
        >
          {/* Inner Nav */}
          <nav style={{
            background: 'linear-gradient(90deg,rgb(0, 77, 64),rgba(0, 68, 193, 0.95))',
            padding: '10px 60px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '12px',
            margin: '20px auto',
            maxWidth: '90%',
            boxShadow: '0 6px 16px rgba(0, 0, 0, 0.4)',
            fontFamily: 'Segoe UI, sans-serif'
          }}>
            <ul style={{
              display: 'flex',
              listStyle: 'none',
              gap: '40px',
              padding: 0,
              margin: 0
            }}>
              <li><Link to="/AddVaccin" style={navLinkStyle}>Add Vaccin</Link></li>
              <li><Link to="/adminDashboard" style={navLinkStyle}>View Vaccin</Link></li>
              
            </ul>
          </nav>

          <h1 style={{ marginBottom: '10px' }}>View Vaccine</h1>

         <table style={{ 
  width: '100%', 
  borderCollapse: 'separate', 
  borderSpacing: '0 12px', 
  fontFamily: 'Segoe UI, sans-serif',
  fontSize: '14px'
}}>
  <thead>
    <tr style={{ backgroundColor: '#004d40', color: '#fff', textAlign: 'left' }}>
      <th style={{ padding: '12px', borderTopLeftRadius: '8px' }}>Vaccine Name</th>
      <th style={{ padding: '12px' }}>Type</th>
      <th style={{ padding: '12px' }}>Age</th>
      <th style={{ padding: '12px' }}>Doses</th>
      <th style={{ padding: '12px' }}>Manufacturer</th>
      <th style={{ padding: '12px' }}>Instructions</th>
      <th style={{ padding: '12px' }}>Stock Level</th>
      <th style={{ padding: '12px' }}>Add Stock</th>
      <th style={{ padding: '12px', borderTopRightRadius: '8px' }}>Status</th>
    </tr>
  </thead>
  <tbody>
    {vaccine.map((ob, index) => (
      <tr 
        key={ob._id}
        style={{ 
          backgroundColor: '#f9f9f9',
          boxShadow: '0 2px 12px rgba(0, 0, 0, 0.05)',
          borderRadius: '12px'
        }}
      >
        <td style={{ padding: '14px' }}>{ob.Name}</td>
        <td style={{ padding: '14px' }}>{ob.Type}</td>
        <td style={{ padding: '14px' }}>{ob.Age}</td>
        <td style={{ padding: '14px' }}>{ob.Doses}</td>
        <td style={{ padding: '14px' }}>{ob.Manufacturer}</td>
        <td style={{ padding: '14px', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {ob.Instructions}
        </td>
        <td style={{ padding: '14px' }}>{ob.Slots}</td>
        <td style={{ padding: '14px' }}>
          <form style={{ display: 'flex', alignItems: 'center' }} onSubmit={(e) => deleteUser(ob.email, e)}>
            <input
              type="text"
              name="reason"
              placeholder="Amount"
              style={{ 
                padding: '6px 10px', 
                width: '70%', 
                borderRadius: '6px', 
                border: '1px solid #ccc', 
                marginRight: '8px' 
              }}
            />
            <button
              type="submit"
              style={{ 
                padding: '6px 14px', 
                backgroundColor: '#00796b', 
                color: '#fff', 
                fontWeight: 'bold',
                border: 'none', 
                borderRadius: '6px', 
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)'
              }}
            >
              Add +
            </button>
          </form>
        </td>
        <td style={{ padding: '14px' }}>
          <span style={{
            padding: '6px 10px',
            borderRadius: '20px',
            fontWeight: '600',
            color: ob.Slots < 20 ? '#c62828' : '#2e7d32',
            backgroundColor: ob.Slots < 20 ? '#ffebee' : '#e8f5e9',
            fontSize: '13px'
          }}>
            {ob.Slots < 20 ? 'Stock Low' : 'Stock Sufficient'}
          </span>
        </td>
      </tr>
    ))}
  </tbody>
</table>



        
          
        </main>
      </div>
    </>
  );
}

 const navLinkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '17px',
    padding: '10px 15px',
    borderRadius: '5px',
    userSelect: 'none',
  };

 const tableHeaderStyle = {
  padding: '12px 16px',
  borderBottom: '2px solid #ddd',
  fontSize: '15px',
  textTransform: 'uppercase',
};

const tableCellStyle = {
  padding: '12px 16px',
  borderBottom: '1px solid #eee',
};





export default ViewVaccine;
