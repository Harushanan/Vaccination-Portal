import React, { useState, useEffect } from 'react';
import { useNavigate, useParams ,useLocation } from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie';
import NormalHeader from '../../Component/NormalHeader';
import Footer from '../../Component/Footer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const userSession = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;

function SelectBooking() {
  const { id } = useParams();
  const [data, Setdata] = useState([]);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const [fullname, setFullname] = useState(userSession?.user?.username || '');
  const [contact, setContact] = useState(userSession?.user?.phone || '');
  const [email, setEmail] = useState(userSession?.user?.email || '');
  const [address, setAddress] = useState(userSession?.user?.address || '');

  const [age, setAge] = useState('');
  const [idphoto, setIdphoto] = useState(null);
  const [date, setDate] = useState('');
  const [vaccine, setVaccine] = useState('');
  const [dose, setDose] = useState('');
  const [center, setCenter] = useState('');
  const [healthConditions, setHealthConditions] = useState('');
  const [allergies, setAllergies] = useState('');
  const [consent, setConsent] = useState(false);
  const [centers, setCenters] = useState([]);

  // Handle window resize for responsiveness
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3000/displaycenter")
      .then((result) => {
        setCenters(result.data);
      })
      .catch((error) => console.error("Error fetching center data:", error));
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:3000/vaccinelist/${id}`)
      .then((result) => {
        if (result.data.message === "Vaccine fetched successfully") {
          Setdata(result.data.getvaccine);
        }
      })
      .catch((error) => {
        console.error("Error fetching vaccine data:", error);
      });
  }, [id]);

  useEffect(() => {
    if (data) {
      setVaccine(data.Name);
      setAge(data.Age);
    }
  }, [data]);

  const dataToSend = { sentvaccine: vaccine, sentage: age };

  const handleFileChange = (e) => {
    setIdphoto(e.target.files[0]);
  };

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

    // Validate date is today or future (no past dates)
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // normalize to start of day
    if (selectedDate < today) {
      toast.error("You cannot select a past date");
      return;
    }

    try {
      // Prepare form data for backend
      const formData = {
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

      const response = await axios.post('http://localhost:3000/bookingvaccine', formData);

      if (response.data.message === "Vaccine inserted successfully") {
        toast.success("Booking is successful");
        setTimeout(() => {
          navigate('/patient/MyBooking');
        }, 3000);
      } else {
        toast.error("Booking failed. Try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Booking Failed!");
    }
  };

  return (
    <>
      <div style={{ ...pageStyle, paddingBottom: isMobile ? '100px' : '50px' }}>
        <NormalHeader />

        <div style={{ ...containerStyle, padding: isMobile ? '20px' : '40px', maxWidth: isMobile ? '95%' : '900px' }}>
          <button
            type="button"
            style={{ ...buttonStyle, width: isMobile ? '100%' : 'auto', marginBottom: isMobile ? '20px' : '0' }}
            onClick={() => { navigate('/patient/BookingOther',{state:dataToSend}); }}
          >
            Booking For Others
          </button>
          <h1 style={{ ...headingStyle, fontSize: isMobile ? '28px' : '34px' }}>Book Your Vaccination</h1>
          <form onSubmit={handleSubmit} encType="multipart/form-data" style={{
            ...formStyle,
            gap: isMobile ? '15px' : '20px',
            flexDirection: 'column'
          }}>
            {/* Full Name */}
            <div style={{ ...formGroup, minWidth: '100%' }}>
              <label>Full Name *</label>
              <p style={disabledField}>{fullname}</p>
            </div>

            {/* Age */}
            <div style={{ ...formGroup, minWidth: '100%' }}>
              <label>Age *</label>
              <p style={disabledField}>{age}</p>
            </div>

            {/* Email */}
            <div style={{ ...formGroup, minWidth: '100%' }}>
              <label>Email Address *</label>
              <p style={disabledField}>{email}</p>
            </div>

            {/* Contact */}
            <div style={{ ...formGroup, minWidth: '100%' }}>
              <label>Contact Number *</label>
              <input
                type="tel"
                pattern="[0-9]{10}"
                placeholder="e.g. 9876543210"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

            {/* Address */}
            <div style={{ ...formGroup, minWidth: '100%' }}>
              <label>Address *</label>
              <textarea
                rows="2"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                style={textareaStyle}
              />
            </div>

            {/* ID Upload */}
            <div style={{ ...formGroup, minWidth: '100%' }}>
              <label>Upload ID/NIC Photo *</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={inputStyle}
              />
            </div>

            {/* Health Conditions */}
            <div style={{ ...formGroup, minWidth: '100%' }}>
              <label>Health Conditions (e.g., Diabetes, None)</label>
              <textarea
                rows="2"
                required
                value={healthConditions}
                onChange={(e) => setHealthConditions(e.target.value)}
                style={textareaStyle}
              />
            </div>

            {/* Allergies */}
            <div style={{ ...formGroup, minWidth: '100%' }}>
              <label>Allergies (e.g., Peanuts, None)</label>
              <textarea
                rows="2"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                required
                style={textareaStyle}
              />
            </div>

            {/* Vaccine Name */}
            <div style={{ ...formGroup, minWidth: '100%' }}>
              <label>Vaccination Name *</label>
              <p style={disabledField}>{vaccine}</p>
            </div>

            {/* Dose */}
            <div style={{ ...formGroup, minWidth: '100%' }}>
              <label>Dose Type *</label>
              <select
                value={dose}
                onChange={(e) => setDose(e.target.value)}
                required
                style={selectStyle}
              >
                <option value="">Select</option>
                <option>1st Dose</option>
                <option>2nd Dose</option>
                <option>Booster Dose</option>
              </select>
            </div>

            {/* Date */}
            <div style={{ ...formGroup, minWidth: '100%' }}>
              <label>Preferred Date *</label>
              <input
                type="date"
                value={date}
                min={new Date().toISOString().split("T")[0]} // disallow past dates
                onChange={(e) => setDate(e.target.value)}
                required
                style={inputStyle}
              />
            </div>

            {/* Center Dropdown */}
            <div style={{ ...formGroup, minWidth: '100%' }}>
              <label>Select Center *</label>
              <select
                value={center}
                onChange={(e) => setCenter(e.target.value)}
                required
                style={selectStyle}
              >
                <option value="">Select Center</option>
                {centers && centers.map((c) => (
                  <option key={c._id} value={c.center}>{c.center}</option>
                ))}
              </select>
            </div>

            {/* Consent */}
            <div style={{ ...formGroupCheckbox, minWidth: '100%' }}>
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                required
              />
              <label style={{ marginLeft: "10px" }}>I confirm the above information is correct.</label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              style={{
                ...buttonStyle,
                width: isMobile ? '100%' : 'auto',
              }}
            >
              Book Appointment
            </button>
          </form>
        </div>
      </div>
      <Footer />
      <ToastContainer position="top-center" />
    </>
  );
}

export default SelectBooking;

// ------------------------ STYLES ------------------------ //
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
  width: '100%',
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

const disabledField = {
  ...inputStyle,
  backgroundColor: '#f0f0f0',
  cursor: 'not-allowed',
  padding: '8px',
  borderRadius: '4px',
  border: '1px solid #ccc',
};
