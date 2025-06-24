import React, { useState , useEffect } from 'react';
import { Link, useNavigate , useParams } from "react-router-dom";
import PatientHeader from '../../Component/PatientHeader';
import axios from 'axios';
import Cookies from 'js-cookie'; 
import NormalHeader from '../../Component/NormalHeader'


const userSession = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;

function SelectBooking() {
  const { id } = useParams();
  const [data , Setdata] = useState([]);
  const navigate = useNavigate();
  const [Success , setSuccess] = useState('');

 
const [fullname, setFullname] = useState(userSession.user.username);
const [contact, setContact] = useState(userSession.user.phone);
const [email, setEmail] = useState(userSession.user.email);
const [address, setAddress] = useState(userSession.user.address);

const [age, setAge] = useState('');

const [idphoto, setIdphoto] = useState(null);
const [date, setDate] = useState('');
const [vaccine, setVaccine] = useState('');
const [dose, setDose] = useState('');
const [healthConditions, setHealthConditions] = useState('');
const [allergies, setAllergies] = useState('');

const [consent, setConsent] = useState(false);

useEffect(() => {
  axios.get(`http://localhost:3000/vaccinelist/${id}`)
    .then((result) => {
      if (result.data.message === "Vaccine fetched successfully") {
        Setdata(result.data.getvaccine);
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}, [id]);

useEffect(() => {
  if (data) {
    setVaccine(data.Name)
    setAge(data.Age)
   
  }
}, [data]);


  

   

  const handleFileChange = (e) => {
    setIdphoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const formData = {
      fullname,
      email,
      contact,
      address,
      age,
      date,
      vaccine,
      dose,
      healthConditions,
      allergies,
    };

    const response = await axios.post('http://localhost:3000/bookingvaccine', formData);

    if (response.data.message === "Vaccine inserted successfully") {
      setSuccess("Booking is successfully");
                setTimeout(() => { navigate('/BookingVaccine') }, 3000);
      
    } else {
      alert("Booking failed. Try again.");
    }

  } catch (error) {
    console.error("Error submitting form:", error);
    alert("Booking Failed!");
  }
};





  

  return (
    <div style={pageStyle}>
      <NormalHeader/>
       <nav style={{
            background: 'linear-gradient(90deg,rgb(0, 77, 64),rgba(0, 68, 193, 0.95))',
            padding: '10px 60px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '12px',
            margin: '20px auto',
            maxWidth: '60%',
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
              <li><Link to="/SelectBooking" style={navLinkStyle}>Booking For you</Link></li>
              <li><Link to="" style={navLinkStyle}>Booking For Others</Link></li>
            </ul>
          </nav>
      <div style={containerStyle}>
       <button type="submit" style={buttonStyle} onClick={()=>{navigate('/BookingVaccine')}}>Back</button>
        
        <h1 style={headingStyle}>Book Your Vaccination</h1>
   <form onSubmit={handleSubmit} encType="multipart/form-data" style={formStyle}>
  {/* Personal Information */}
  <div style={formGroup}>
  <label>Full Name *</label>
  <p  style={{
      ...inputStyle,
      backgroundColor: '#f0f0f0',
      cursor: 'not-allowed',
      padding: '8px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      transition: 'background-color 0.3s',
      position: 'relative',
    }}
    title="You can't edit this field"
    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e0e0e0'}
    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}>{fullname}</p>
</div>


  <div style={formGroup}>
  <label>Age *</label>
  <p  style={{
      ...inputStyle,
      backgroundColor: '#f0f0f0',
      cursor: 'not-allowed',
      padding: '8px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      transition: 'background-color 0.3s',
      position: 'relative',
    }}
    title="You can't edit this field"
    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e0e0e0'}
    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}>{age}</p>
</div>


  <div style={formGroup}>
  <label>Email Address *</label>
  <p  style={{
      ...inputStyle,
      backgroundColor: '#f0f0f0',
      cursor: 'not-allowed',
      padding: '8px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      transition: 'background-color 0.3s',
      position: 'relative',
    }}
    title="You can't edit this field"
    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e0e0e0'}
    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}>{email}</p>
</div>


  <div style={formGroup}>
    <label>Contact Number *</label>
    <input type="tel" pattern="[0-9]{10}" placeholder="e.g. 9876543210" value={contact} onChange={(e) => setContact(e.target.value)} required style={inputStyle} />
  </div>

  <div style={formGroup}>
    <label>Address *</label>
    <textarea rows="2" value={address} onChange={(e) => setAddress(e.target.value)} required style={textareaStyle} />
  </div>


  <div style={formGroup}>
    <label>Upload ID/NIC Photo *</label>
    <input type="file" accept="image/*" onChange={handleFileChange} style={inputStyle} />
  </div>

  {/* Medical Info */}
  <div style={formGroup}>
    <label>Do you have any health conditions? (e.g., Diabetes, Hypertension. If none, type "None")</label>
    <textarea rows="2" value={healthConditions} onChange={(e) => setHealthConditions(e.target.value)} style={textareaStyle} />
  </div>

  <div style={formGroup}>
    <label>Do you have any allergies? ((e.g., Peanuts, Penicillin. If none, type "None"))</label>
    <textarea rows="2" value={allergies} onChange={(e) => setAllergies(e.target.value)} required style={textareaStyle} />
  </div>

  {/* Vaccination Details */}
 <div style={formGroup}>
  <label>Vaccination Name *</label>
  <p  style={{
      ...inputStyle,
      backgroundColor: '#f0f0f0',
      cursor: 'not-allowed',
      padding: '8px',
      borderRadius: '4px',
      border: '1px solid #ccc',
      transition: 'background-color 0.3s',
      position: 'relative',
    }}
    title="You can't edit this field"
    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e0e0e0'}
    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f0f0f0'}>{vaccine}</p>
</div>


  <div style={formGroup}>
    <label>Dose Type *</label>
    <select value={dose} onChange={(e) => setDose(e.target.value)} required style={selectStyle}>
      <option value="">Select</option>
      <option>1st Dose</option>
      <option>2nd Dose</option>
      <option>Booster Dose</option>
    </select>
  </div>

  <div style={formGroup}>
    <label>Preferred Date *</label>
    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required style={inputStyle} />
  </div>

  {/* Consent */}
  <div style={formGroupCheckbox}>
    <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} required />
    <label style={{ marginLeft: "10px" }}>I confirm the above information is correct.</label>
  </div>

  {/* Submit */}
  <button type="submit" style={buttonStyle}>Book Appointment</button>
  {Error && <p style={{ textAlign: "center", color: "red" }}>{Error}</p>}
  {Success && <p style={{ textAlign: "center", color: "green" }}>{Success}</p>}
</form>


      </div>
    </div>
  );
}

export default SelectBooking;

const navLinkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '17px',
    padding: '10px 15px',
    borderRadius: '5px',
    userSelect: 'none',
  };

const pageStyle = {
  minHeight: '100vh',
  background: 'linear-gradient(to right, #e3f2fd, #ffffff)',
  fontFamily: 'Segoe UI, sans-serif',
  paddingBottom: '50px'
};

const containerStyle = {
  maxWidth: '900px',
  margin: '0 auto',
  padding: '40px',
  background: '#ffffff',
  borderRadius: '20px',
  boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
};

const headingStyle = {
  textAlign: 'center',
  color: '#004d40',
  fontWeight: '700',
  fontSize: '34px',
  marginBottom: '30px',
  textTransform: 'uppercase',
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
};

const rowStyle = {
  display: 'flex',
  gap: '20px',
  flexWrap: 'wrap',
};

const formGroup = {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  minWidth: '260px',
};

const formGroupCheckbox = {
  display: 'flex',
  alignItems: 'center',
  fontSize: '14px',
  marginTop: '10px',
};

const inputStyle = {
  padding: '12px',
  borderRadius: '8px',
  border: '1px solid #ccc',
  fontSize: '15px',
  boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.05)',
  transition: '0.3s border-color',
};

const selectStyle = {
  ...inputStyle,
};

const textareaStyle = {
  ...inputStyle,
  resize: 'vertical',
};

const buttonStyle = {
  padding: '14px',
  backgroundColor: '#00796b',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 'bold',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  marginTop: '20px',
  transition: 'background-color 0.3s ease',
};
