import React, { useState} from 'react';
import { Link , useNavigate  } from "react-router-dom";
import AdminHeader from '../../Component/AdminHeader';
import Sidebar from '../../Component/Sidebar';
import axios from 'axios';


function AddVaccin() {
  const [Name, setName] = useState('');
  const [Type, setType] = useState('');
  const [Slots, setSlots] = useState('');
  const [Age, setAge] = useState('');
  const [Doses, setDoses] = useState('');
  const [Manufacturer, setManufacturer] = useState('');
  const [Instructions, setInstructions] = useState('');

  const [Error , setError] = useState('');
  const [Success , setSuccess] = useState('');

  const navigate = useNavigate()

  
  
  
  const handleSubmit = (e) => {
    e.preventDefault();

   axios.post("http://localhost:3000/addvaccine", { Name, Type, Date, Slots, Age, Doses, Manufacturer, Instructions})
    .then((result) => {
            if (result.data.message === "Vaccine added successfully") {  
                setSuccess("Vaccine added successfully");
                setTimeout(() => { navigate('ViewVaccin') }, 3000);
            } 
        })
        .catch((err) => {
            console.error("Vaccine added Error: ", err);
            setError("Vaccine added failed. Please try again.");
        });

    
    

   
  };

  return (
    <>
      {/* Header */}
      <AdminHeader />

      {/* Main container */}
      <div style={{
        display: 'flex',
        minHeight: '90vh',
        backgroundColor: '#e6f7ff',
      }}>
        {/* Sidebar */}
        <Sidebar />

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
              <li><Link to="/ViewVaccin" style={navLinkStyle}>View Vaccin</Link></li>
            </ul>
          </nav>

          <h1 style={{ marginBottom: '10px' }}>Add New Vaccine</h1>
          <div style={styles.container}>
            <h2 style={styles.heading}>Add New Vaccine</h2>

          <form onSubmit={handleSubmit} style={styles.form}>
            <label style={styles.label}>Vaccine Name:
    <input
      type="text"
      name="name"
      onChange={(e) => setName(e.target.value.trim())}
      required
      style={styles.input}
    />
  </label>

  <label style={styles.label}>
    Type:
    <input
      type="text"
      name="type"
      onChange={(e) => setType(e.target.value.trim())}
      placeholder="e.g., mRNA, Viral Vector"
      required
      style={styles.input}
    />
  </label>

  <label style={styles.label}>
    Slots Available:
    <input
      type="number"
      name="slots"
      onChange={(e) => setSlots(e.target.value.trim())}
      min="1"
      required
      style={styles.input}
    />
  </label>

  <label style={styles.label}>
  Age Group:
  <select
    name="ageGroup"
    onChange={(e) => setAge(e.target.value.trim())}
    required
    style={styles.input}
  >
    <option value="">Select age group</option>
    <option value="12-17">12-17</option>
    <option value="18-44">18-44</option>
    <option value="45+">45+</option>
  </select>
</label>

  <label style={styles.label}>
    Number of Doses:
    <input
      type="number"
      name="doses"
      onChange={(e) => setDoses(e.target.value.trim())}
      min="1"
      required
      style={styles.input}
    />
  </label>

  <label style={styles.label}>
    Manufacturer:
    <input
      type="text"
      name="manufacturer"
      onChange={(e) => setManufacturer(e.target.value.trim())}
      required
      style={styles.input}
    />
  </label>

  <label style={styles.label}>
    Description / Instructions:
    <textarea
      name="description"
      onChange={(e) => setInstructions(e.target.value)}
      placeholder="Any instructions for patients..."
      rows="4"
      style={{ ...styles.input, resize: 'vertical' }}
    />
  </label>

  <button type="submit" style={styles.button}>Add Vaccine</button>
  {Error && <p style={{ textAlign: "center", color: "red" }}>{Error}</p>}
  {Success && <p style={{ textAlign: "center", color: "green" }}>{Success}</p>}
</form>

          </div>
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

const styles = {
  container: {
    maxWidth: '500px',
    margin: '40px auto',
    padding: '20px',
    backgroundColor: '#f4f4f4',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif'
  },
  heading: {
    textAlign: 'center',
    color: '#00796b',
    marginBottom: '20px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '15px',
    fontWeight: '600',
    fontSize: '15px'
  },
  input: {
    marginTop: '5px',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    width: '100%',
    fontSize: '14px'
  },
  button: {
    marginTop: '20px',
    padding: '12px',
    backgroundColor: '#00796b',
    color: 'white',
    fontSize: '16px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease'
  }
};

export default AddVaccin;
