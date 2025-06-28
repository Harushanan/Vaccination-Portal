import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie';
import AdminHeader from '../../Component/AdminHeader';
import Sidebar from '../../Component/Sidebar';

let count = 0;

function ViewVaccine() {
  const [vaccine, setvaccine] = useState([]);
  const [count , setCount] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/vaccinelist")
      .then((result) => {
        setvaccine(result.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this vaccine?")) {
      axios.delete(`http://localhost:3000/vaccinelist/${id}`)
        .then(() => {
          setvaccine(vaccine.filter(v => v._id !== id));
        })
        .catch((error) => console.error("Error deleting vaccine:", error));
    }
  };

  const handleEdit = (id) => {
    window.location.href = `/editvaccine/${id}`;
  };

  const increaseCount = (e, ob) => {
    e.preventDefault();

    const newcount = Number(ob.Slots) + Number(count);
    const id = ob._id;

    axios.put("http://localhost:3000/updatecount", { newcount, id })
      .then((result) => {
        if (result.data.message === "Count updated successfully") {
          setTimeout(() => {
            window.location.reload(); // Soft refresh the current route
          }, 1000);
        }
      })
      .catch((err) => {
        console.error("Vaccine count added Error: ", err);
      });
  };


  return (
    <>
      <AdminHeader />
      <div style={{ display: 'flex', minHeight: '90vh', backgroundColor: '#e6f7ff' }}>
        <Sidebar />
        <main style={{ flex: 1, overflowX: 'auto', padding: '20px 40px', fontFamily: 'Segoe UI, sans-serif' }}>
          <nav style={{
            background: 'linear-gradient(90deg,rgb(0, 77, 64),rgba(0, 68, 193, 0.95))',
            padding: '10px 60px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '12px',
            margin: '20px auto',
            maxWidth: '90%',
            boxShadow: '0 6px 16px rgba(0, 0, 0, 0.4)'
          }}>
            <ul style={{
              display: 'flex',
              listStyle: 'none',
              gap: '40px',
              padding: 0,
              margin: 0
            }}>
              <li><Link to="/admin/AddVaccin" style={navLinkStyle}>Add Vaccin</Link></li>
              <li><Link to="/admin/ViewVaccin" style={navLinkStyle}>View Vaccin</Link></li>
            </ul>
          </nav>

          <h1 style={{ marginBottom: '20px' }}>View Vaccine</h1>

          <table style={{ 
  width: '100%',
  borderCollapse: 'collapse',
  fontFamily: 'Segoe UI, sans-serif',
  fontSize: '15px',
  backgroundColor: '#fff',
  borderRadius: '10px',
  overflow: 'hidden',
  boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
}}>
  <thead>
    <tr style={{ backgroundColor: '#004d40', color: '#fff' }}>
      <th style={thStyle}>Vaccine Name</th>
      <th style={thStyle}>Type</th>
      <th style={thStyle}>Age</th>
      <th style={thStyle}>Doses</th>
      <th style={thStyle}>Manufacturer</th>
      <th style={thStyle}>Instructions</th>
      <th style={thStyle}>Stock Level</th>
      <th style={thStyle}>Add Stock</th>
      <th style={thStyle}>Status</th>
      <th style={thStyle}>Action</th>
    </tr>
  </thead>
  <tbody>
    {vaccine.map((ob) => (
      <tr key={ob._id} style={rowStyle}>
        <td style={tdStyle}>{ob.Name}</td>
        <td style={tdStyle}>{ob.Type}</td>
        <td style={tdStyle}>{ob.Age}</td>
        <td style={tdStyle}>{ob.Doses}</td>
        <td style={tdStyle}>{ob.Manufacturer}</td>
        <td style={{ ...tdStyle, maxWidth: '180px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{ob.Instructions}</td>
        <td style={tdStyle}>{ob.Slots}</td>
        <td style={tdStyle}>
         <form 
  style={{ display: 'flex', alignItems: 'center' }} 
  onSubmit={(e) => increaseCount(e, ob)}
>
  <input
    type="number"
    name="addcount"
    placeholder="Add Count"
    onChange={(e) => setCount(e.target.value)}

    required
    style={{
      padding: '6px',
      width: '64px',
      borderRadius: '6px',
      border: '1px solid #ccc',
      marginRight: '6px',
      fontSize: '13px'
    }}
  />
  <button
    type="submit"
    style={{
      padding: '6px 10px',
      backgroundColor: '#00796b',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      fontSize: '13px'
    }}
  >
    Add +
  </button>
</form>

        </td>
        <td style={tdStyle}>
          <span style={{
            padding: '6px 10px',
            borderRadius: '20px',
            fontWeight: '600',
            fontSize: '12px',
            color: ob.Slots < 20 ? '#c62828' : '#2e7d32',
            backgroundColor: ob.Slots < 20 ? '#fdecea' : '#e6f4ea',
          }}>
            {ob.Slots < 20 ? 'Stock Low' : 'Stock Sufficient'}
          </span>
        </td>
        <td style={tdStyle}>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={() => handleEdit(ob._id)}
              style={actionBtnStyle('#2e7d32')}
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(ob._id)}
              style={actionBtnStyle('#c62828')}
            >
              Delete
            </button>
          </div>
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

const thStyle = {
  padding: '12px',
  textAlign: 'center',
};

const tdStyle = {
  padding: '12px',
  textAlign: 'center',
  verticalAlign: 'middle',
  borderBottom: '1px solid #eee',
};

const rowStyle = {
  backgroundColor: '#fff',
  transition: 'background-color 0.2s',
  cursor: 'default',
  ':hover': {
    backgroundColor: '#f5f5f5',
  },
};

const actionBtnStyle = (bgColor) => ({
  padding: '6px 10px',
  backgroundColor: bgColor,
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  fontWeight: '600',
  fontSize: '13px',
  cursor: 'pointer',
});


const navLinkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontWeight: '600',
  fontSize: '17px',
  padding: '10px 15px',
  borderRadius: '5px',
  userSelect: 'none',
};

export default ViewVaccine;
