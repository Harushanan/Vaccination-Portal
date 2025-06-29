import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import AdminHeader from '../../Component/AdminHeader';
import Sidebar from '../../Component/Sidebar';
import Footer from "../../Component/Footer"
import axios from 'axios';
import hospital from "../../assets/images/hospital.png"

function ViewCenter() {
  const [centers, setCenters] = useState([]);
  const [reasonByEmail, setReasonByEmail] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/displaycenter")
      .then((result) => {
        setCenters(result.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const deleteUser = async (email, e) => {
    e.preventDefault();
    const reason = reasonByEmail[email];
    if (!reason) return alert("Please provide a reason!");

    try {
      await axios.post("http://localhost:3000/deletecenter", { email, reason });
      alert("Center deleted successfully");
      setCenters(prev => prev.filter(center => center.email !== email));
    } catch (err) {
      console.error("Delete failed:", err);
      alert("Error deleting center");
    }
  };

  const handleEdit = (center) => {
    const id = center._id
    console.log("I click : " , id)
    navigate(`/admin/ViewCenter/${id}`)
  };

  return (
    <>
      <AdminHeader />

      <div style={{ display: 'flex', minHeight: '90vh', backgroundColor: '#e6f7ff' }}>
        <Sidebar />

        <main style={{ flex: 1, padding: '20px 40px', fontFamily: 'Segoe UI, sans-serif' }}>
          <nav style={{
            background: 'linear-gradient(90deg,rgb(0, 77, 64),rgba(0, 68, 193, 0.95))',
            padding: '10px 60px',
            borderRadius: '12px',
            marginBottom: '30px',
            display: 'flex',
            justifyContent: 'center'
          }}>
            <ul style={{ display: 'flex', listStyle: 'none', gap: '40px', padding: 0 }}>
              <li><Link to="/admin/AddCenter" style={navLinkStyle}>Add Center</Link></li>
              <li><Link to="/admin/ViewCenter" style={navLinkStyle}>View Center</Link></li>
            </ul>
          </nav>

          <h1 style={{ marginBottom: '20px' }}>Vaccination Centers</h1>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {centers.map((center, index) => (
              <div key={index} style={cardStyle}>
                <img
                  src={hospital}
                  alt={center.center}
                  style={imageStyle}
                />
                <h2 style={{ margin: '10px 0 5px' }}>{center.center}</h2>
                <p><strong>Email:</strong> {center.email}</p>
                <p><strong>Phone:</strong> {center.phone}</p>
                <p><strong>Address:</strong> {center.address}</p>
                {center.nurse === "Not Assign" ? (
  <span style={{ color: 'red', fontWeight: 'bold' }}>Nurse Not Assign</span>
) : (
  <span style={{ color: 'green', fontWeight: 'bold' }}>Nurse Assigned: {center.nurse}</span>
)}

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px' }}>
                  <button style={editBtn} onClick={() => handleEdit(center)}>Edit</button>
                  <form onSubmit={(e) => deleteUser(center.email, e)} style={{ display: 'flex', gap: '5px' }}>
                    <input
                      type="text"
                      name="reason"
                      placeholder="Reason"
                      value={reasonByEmail[center.email] || ''}
                      onChange={(e) =>
                        setReasonByEmail(prev => ({ ...prev, [center.email]: e.target.value }))
                      }
                      style={inputStyle}
                    />
                    <button type="submit" style={deleteBtn}>Delete</button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
      <Footer/>
    </>
  );
}

const navLinkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontWeight: '600',
  fontSize: '17px',
  padding: '10px 15px',
  borderRadius: '5px'
};

const cardStyle = {
  width: '300px',
  backgroundColor: '#ffffff',
  borderRadius: '10px',
  padding: '15px',
  boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
  fontFamily: 'Segoe UI, sans-serif'
};

const imageStyle = {
  width: '100%',
  height: '150px',
  objectFit: 'cover',
  borderRadius: '8px'
};

const editBtn = {
  backgroundColor: '#2196F3',
  color: 'white',
  padding: '8px 12px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};

const deleteBtn = {
  backgroundColor: '#f44336',
  color: 'white',
  padding: '8px 12px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};

const inputStyle = {
  flex: 1,
  padding: '6px',
  borderRadius: '4px',
  border: '1px solid #ccc'
};

export default ViewCenter;
