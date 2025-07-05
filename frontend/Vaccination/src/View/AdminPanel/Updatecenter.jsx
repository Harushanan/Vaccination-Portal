import React, { useEffect, useState } from 'react';
import NormalHeader from '../../Component/NormalHeader';
import axios from 'axios';
import Footer from "../../Component/Footer"
import { useNavigate, useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Updatecenter() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [originalData, setOriginalData] = useState(null);

  const [center, setCenter] = useState('');
  const [address, setAddress] = useState('');
  const [venue, setVenue] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [startTime, setStartTime] = useState('');
  const [closeTime, setCloseTime] = useState('');

  const [nurses, setNurses] = useState([]);
  const [selectedNurse, setSelectedNurse] = useState({ username: '', nurseID: '' });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    axios.get("http://localhost:3000/nursedeatiles")
      .then((result) => {
        setNurses(result.data);
      })
      .catch((error) => console.error("Error fetching nurses:", error));
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:3000/displaycenter/${id}`)
      .then((result) => {
        if (result.data.message === "Center fetched successfully") {
          const data = result.data.getCenter;
          setOriginalData(data);
          setCenter(data.center);
          setAddress(data.address);
          setVenue(data.venue);
          setEmail(data.email);
          setPhone(data.phone);
          setStartTime(data.startTime);
          setCloseTime(data.closeTime);
          if (data.nurse) {
            setSelectedNurse(data.nurse);
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching center data:", error);
      });
  }, [id]);

  const isFormChanged = originalData && (
    center !== originalData.center ||
    address !== originalData.address ||
    venue !== originalData.venue ||
    email !== originalData.email ||
    phone !== originalData.phone ||
    startTime !== originalData.startTime ||
    closeTime !== originalData.closeTime ||
    JSON.stringify(selectedNurse) !== JSON.stringify(originalData.nurse || {})
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3000/updatecenter/${id}`, {
      center,
      address,
      venue,
      email,
      phone,
      startTime,
      closeTime,
      nurse: selectedNurse.username,
      nursingId:selectedNurse.nurseID
    }).then((res) => {
      if (res.data.message === "Center updated successfully") {
        toast.success("Center updated successfully");
        setTimeout(() => navigate('/admin/ViewCenter'), 3000);
      } else {
        setError("Update failed.");
      }
    }).catch((err) => {
      setError("Error while updating center.");
      console.error(err);
    });
  };

  return (
    <>
    <div style={pageStyle}>
      <NormalHeader />
      <div style={containerStyle}>
        <h1 style={headingStyle}>Update Center</h1>

        <div style={styles.container}>
          <form onSubmit={handleSubmit} style={styles.form}>

            <label style={styles.label}>
              Vaccine Center (Hospital):
              <input
                type="text"
                value={center}
                onChange={(e) => setCenter(e.target.value.trim())}
                required
                style={styles.input}
              />
            </label>

            <label style={styles.label}>
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value.trim())}
                required
                style={styles.input}
              />
            </label>

            <label style={styles.label}>
              Telephone:
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.trim())}
                required
                style={styles.input}
              />
            </label>

            <label style={styles.label}>
              Location / Address:
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows="4"
                required
                style={{ ...styles.input, resize: 'vertical' }}
              />
            </label>

            <label style={styles.label}>
              Venue:
              <input
                type="text"
                value={venue}
                onChange={(e) => setVenue(e.target.value.trim())}
                required
                style={styles.input}
              />
            </label>

            <label style={styles.label}>
              Start Time:
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                required
                style={styles.input}
              />
            </label>

            <label style={styles.label}>
              Close Time:
              <input
                type="time"
                value={closeTime}
                onChange={(e) => setCloseTime(e.target.value)}
                required
                style={styles.input}
              />
            </label>

            <label style={styles.label}>
              Assign Nurse:
              <select
                value={JSON.stringify(selectedNurse)}
                onChange={(e) => setSelectedNurse(JSON.parse(e.target.value))}
                style={styles.input}
              >
                <option value="">-- Select Nurse --</option>
                {nurses.map((nurse, index) => (
                  <option
                    key={index}
                    value={JSON.stringify({ username: nurse.username, nurseID: nurse.nursingId })}
                  >
                    {nurse.username} ({nurse.nursingId})
                  </option>
                ))}
              </select>
            </label>

            <button
              type="submit"
              style={{
                ...styles.button,
                backgroundColor: isFormChanged ? '#00796b' : '#ccc',
                cursor: isFormChanged ? 'pointer' : 'not-allowed'
              }}
              disabled={!isFormChanged}
            >
              Update Center
            </button>

            {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}
            {success && <p style={{ textAlign: "center", color: "green" }}>{success}</p>}
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
    <Footer/>
    </>
  );
}

// 🔷 STYLES
const pageStyle = {
  minHeight: '100vh',
  fontFamily: 'Segoe UI, sans-serif',
  background: 'linear-gradient(to right, #e6f7ff, #ffffff)',
  paddingBottom: '50px'
};

const containerStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '30px 20px'
};

const headingStyle = {
  textAlign: 'center',
  color: '#007bff',
  fontWeight: '700',
  marginBottom: '30px'
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
    fontSize: '16px',
    border: 'none',
    borderRadius: '6px',
    transition: 'background-color 0.3s ease'
  }
};

export default Updatecenter;
