import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import AdminHeader from '../../Component/AdminHeader';
import Sidebar from '../../Component/Sidebar';
import axios from 'axios';
import Footer from "../../Component/Footer";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function News() {
  const [title, setTitle] = useState('');
  const [news, setNews] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:3000/addnewscenter", { title, news })
      .then((result) => {
        if (result.data.message === "news inserted successfully") {
          toast.success("News added successfully!", { autoClose: 2000 });
          setTimeout(() => navigate('/admin/ViewNews'), 3000);
        } else {
          toast.warning("Something went wrong, please try again.");
        }
      })
      .catch((err) => {
        console.error("Error adding news:", err);
        toast.error("Failed to add news. Please try again.");
      });
  };

  return (
    <>
      <ToastContainer />
      <AdminHeader />

      <div style={{ display: 'flex', minHeight: '90vh', backgroundColor: '#e6f7ff' }}>
        <Sidebar />

        <main style={{ flex: 1, overflowX: 'auto', padding: '20px 40px', fontFamily: 'Segoe UI, sans-serif' }}>
          <nav style={navStyle}>
            <ul style={navListStyle}>
              <li><Link to="/admin/News" style={navLinkStyle}>Add News</Link></li>
              <li><Link to="/admin/ViewNews" style={navLinkStyle}>View News</Link></li>
            </ul>
          </nav>

          <h1 style={{ marginBottom: '10px' }}>Add News</h1>

          <div style={styles.container}>
            <h2 style={styles.heading}>Enter News Details</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
              <label style={styles.label}>
                News Title (Heading):
                <input
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  style={styles.input}
                />
              </label>

              <label style={styles.label}>
                Content:
                <input
                  type="text"
                  onChange={(e) => setNews(e.target.value)}
                  required
                  style={styles.input}
                />
              </label>

              <button type="submit" style={styles.button}>Add News</button>
            </form>
          </div>
        </main>
      </div>

      <Footer />
    </>
  );
}

// Styles
const navStyle = {
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
};

const navListStyle = {
  display: 'flex',
  listStyle: 'none',
  gap: '40px',
  padding: 0,
  margin: 0
};

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

export default News;
