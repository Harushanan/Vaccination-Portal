import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie';
import NormalHeader from '../../Component/NormalHeader';
import Footer from '../../Component/Footer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function UpdateMyBooking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [data, setData] = useState({});

  // Form states
  const [fullname, setFullname] = useState('');
  const [contact, setContact] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [age, setAge] = useState('');
  const [date, setDate] = useState('');
  const [vaccine, setVaccine] = useState('');
  const [dose, setDose] = useState('');
  const [center, setCenter] = useState('');
  const [healthConditions, setHealthConditions] = useState('');
  const [allergies, setAllergies] = useState('');
  const [consent, setConsent] = useState(false);
  const [centers, setCenters] = useState([]);

  // Responsive handler
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch center list
  useEffect(() => {
    axios.get("http://localhost:3000/displaycenter")
      .then((result) => {
        setCenters(result.data);
      })
      .catch((error) => console.error("Error fetching center data:", error));
  }, []);

  // Fetch booking data
  useEffect(() => {
    axios.get(`http://localhost:3000/bookinglist/${id}`)
      .then((result) => {
        const booking = result.data.getbooking || result.data;
        setData(booking);
      })
      .catch((error) => {
        console.error("Error fetching vaccine data:", error);
      });
  }, [id]);

  // Populate form fields once data arrives
  useEffect(() => {
    if (data) {
      setFullname(data.fullname || '');
      setEmail(data.email || '');
      setContact(data.contact || '');
      setAddress(data.address || '');
      setAge(data.age || '');
      setDate(data.date || '');
      setVaccine(data.vaccine || '');
      setDose(data.dose || '');
      setCenter(data.center || '');
      setHealthConditions(data.healthConditions || '');
      setAllergies(data.allergies || '');
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const realPhone = /^(0)(7[01245678]\d{7})$/;
    if (!realPhone.test(contact)) {
      toast.error("Invalid phone number (Format: 07XXXXXXXX)");
      return;
    }

    if (!date) {
      toast.error("Please select a date");
      return;
    }

    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate < today) {
      toast.error("You cannot select a past date");
      return;
    }

    try {
      const formData = {
        id,
        fullname,
        email,
        contact,
        address,
        age,
        date,
        vaccine,
        dose,
        center,
        healthConditions,
        allergies,
      };

      const response = await axios.put('http://localhost:3000/updatemybooking', formData);

      if (response.data.message === "Booking updated successfully") {
        toast.success("Booking updated successfully");
        setTimeout(() => {
          navigate('/patient/MyBooking');
        }, 3000);
      } else {
        toast.error("Booking update failed. Try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Booking update failed!");
    }
  };

  return (
    <>
      <div style={{ ...pageStyle, paddingBottom: isMobile ? '100px' : '50px' }}>
        <NormalHeader />
        <div style={{ ...containerStyle, padding: isMobile ? '20px' : '40px', maxWidth: isMobile ? '95%' : '900px' }}>
          <h1 style={{ ...headingStyle, fontSize: isMobile ? '28px' : '34px' }}>Update My Vaccination Booking</h1>
          <form onSubmit={handleSubmit} style={{
            ...formStyle,
            gap: isMobile ? '15px' : '20px',
            flexDirection: 'column'
          }}>
            {/* Form Fields */}
            <div style={formGroup}><label>Full Name *</label><p style={disabledField}>{fullname}</p></div>
            <div style={formGroup}><label>Age *</label><p style={disabledField}>{age}</p></div>
            <div style={formGroup}><label>Email Address *</label><p style={disabledField}>{email}</p></div>

            <div style={formGroup}>
              <label>Contact Number *</label>
              <input type="tel" value={contact} onChange={(e) => setContact(e.target.value)} required style={inputStyle} />
            </div>

            <div style={formGroup}>
              <label>Address *</label>
              <textarea rows="2" value={address} onChange={(e) => setAddress(e.target.value)} required style={textareaStyle} />
            </div>

            <div style={formGroup}>
              <label>Health Conditions</label>
              <textarea rows="2" value={healthConditions} onChange={(e) => setHealthConditions(e.target.value)} required style={textareaStyle} />
            </div>

            <div style={formGroup}>
              <label>Allergies</label>
              <textarea rows="2" value={allergies} onChange={(e) => setAllergies(e.target.value)} required style={textareaStyle} />
            </div>

            <div style={formGroup}><label>Vaccination Name *</label><p style={disabledField}>{vaccine}</p></div>

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

            <div style={formGroup}>
              <label>Select Center *</label>
              <select value={center} onChange={(e) => setCenter(e.target.value)} required style={selectStyle}>
                <option value="">Select Center</option>
                {centers && centers.map((c) => (
                  <option key={c._id} value={c.center}>{c.center}</option>
                ))}
              </select>
            </div>

            <div style={formGroupCheckbox}>
              <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} required />
              <label style={{ marginLeft: "10px" }}>I confirm the above information is correct.</label>
            </div>

            <button type="submit" style={{ ...buttonStyle, width: isMobile ? '100%' : 'auto' }}>
              Update Appointment
            </button>
          </form>
        </div>
      </div>
      <Footer />
      <ToastContainer position="top-center" />
    </>
  );
}

export default UpdateMyBooking;

// Styles (same as yours)
const pageStyle = {
  minHeight: '100vh',
  background: 'linear-gradient(to right, #e3f2fd, #ffffff)',
  fontFamily: 'Segoe UI, sans-serif',
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

const formGroup = {
  display: 'flex',
  flexDirection: 'column',
  minWidth: '100%',
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
  width: '100%',
};

const textareaStyle = {
  ...inputStyle,
  resize: 'vertical',
};

const selectStyle = {
  ...inputStyle,
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
};

const disabledField = {
  ...inputStyle,
  backgroundColor: '#f0f0f0',
  cursor: 'not-allowed',
};

