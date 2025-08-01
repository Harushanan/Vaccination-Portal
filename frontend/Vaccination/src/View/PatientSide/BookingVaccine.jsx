import React, { useEffect, useState } from 'react';
import PatientHeader from '../../Component/PatientHeader';
import Cookies from 'js-cookie';
import axios from 'axios';
import vaccineimage from '../../assets/images/vaccine.png';
import { useNavigate } from 'react-router-dom';
import Footer from '../../Component/Footer';

function BookingVaccine() {
  const [vaccine, setVaccine] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/vaccinelist")
      .then((result) => {
        setVaccine(result.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const filteredVaccines = vaccine.filter(v =>
    v.Name.toLowerCase().includes(search.toLowerCase())
  );

  const getVaccine = (id) => {
    navigate(`/patient/BookingVaccine/${id}`);
  };

  // Handlers for card hover effect
  const handleMouseEnter = (e) => {
    e.currentTarget.style.transform = 'translateY(-5px)';
    e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.15)';
  };
  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'none';
    e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)';
  };

  return (
    <>
      <div style={pageStyle}>
        <PatientHeader />
        <div style={containerStyle}>
          <h1 style={headingStyle}>Available Vaccines</h1>

          <input
            type="text"
            placeholder="Search Vaccine..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={searchStyle}
          />

          <div style={gridContainer(filteredVaccines.length)}>
            {filteredVaccines.map((ob) => (
              <div
                key={ob._id}
                style={cardStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  src={ob.Image}
                  alt="Vaccine"
                  style={imageStyle}
                />
                <h2 style={titleStyle}>{ob.Name}</h2>
                <div style={buttonContainer}>
                  {ob.Slots < 20 ? (
                    <span style={stockLowStyle}>
                      Stock Low
                    </span>
                  ) : (
                    <button style={bookBtn} onClick={() => getVaccine(ob._id)}>Book</button>
                  )}
                  <button style={viewBtn}>View</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

// 🔷 STYLES
const pageStyle = {
  minHeight: '100vh',
  fontFamily: 'Segoe UI, sans-serif',
  background: 'linear-gradient(to right, #e6f7ff, #ffffff)',
  paddingBottom: '50px',
};

const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '30px 20px',
};

const headingStyle = {
  textAlign: 'center',
  color: '#007bff',
  fontWeight: '700',
  marginBottom: '30px',
};

const searchStyle = {
  width: '100%',
  padding: '12px',
  borderRadius: '10px',
  border: '1px solid #ccc',
  marginBottom: '30px',
  fontSize: '16px',
};

// gridContainer now a function to handle single card center alignment
const gridContainer = (cardCount) => ({
  display: 'flex',
  justifyContent: cardCount === 1 ? 'center' : 'space-between',
  flexWrap: 'wrap',
  gap: '20px',
  padding: '0 10px',
});

const cardStyle = {
  backgroundColor: '#ffffff',
  borderRadius: '16px',
  boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
  padding: '20px',
  textAlign: 'center',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  cursor: 'pointer',
  flex: '1 1 280px',  // responsive: grow, shrink, basis
  maxWidth: '320px',
  minWidth: '280px',
};

const imageStyle = {
  width: '100%',
  height: '200px',
  objectFit: 'cover',
  borderRadius: '14px',
  marginBottom: '15px',
};

const titleStyle = {
  fontSize: '20px',
  fontWeight: '600',
  marginBottom: '15px',
  color: '#004d40',
};

const buttonContainer = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '10px',
};

const stockLowStyle = {
  padding: '10px',
  borderRadius: '20px',
  fontWeight: '600',
  fontSize: '13px',
  color: '#c62828',
  backgroundColor: '#fdecea',
  flex: 1,
  textAlign: 'center',
};

const bookBtn = {
  flex: 1,
  backgroundColor: '#28a745',
  color: '#fff',
  padding: '10px 0',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: '500',
  transition: 'background 0.3s',
};

const viewBtn = {
  flex: 1,
  backgroundColor: '#17a2b8',
  color: '#fff',
  padding: '10px 0',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: '500',
  transition: 'background 0.3s',
};

export default BookingVaccine;
