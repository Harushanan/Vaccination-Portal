import React, { useEffect, useState } from 'react';
import NurseHeader from '../../Component/NurseHeader';
import Footer from "../../Component/Footer";
import axios from 'axios';
import Cookies from 'js-cookie';
import vaccineImage from '../../assets/images/nursehomepage.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NurseDashboard() {
  const userSession = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
  const nurseName = userSession ? userSession.user.username : "Guest";

  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3000/allnews")
      .then((result) => {
        setNewsList(result.data.allnews || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        toast.error("Failed to fetch news");
        setLoading(false);
      });
  }, []);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString();
  };

  return (
    <>
      <ToastContainer />
      <style>{`
        body {
          font-family: 'Poppins', sans-serif;
          margin: 0;
          padding: 0;
          background: #f5f9ff;
          color: #022c43;
        }

        .hero {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
          padding: 4rem 2rem;
          background: linear-gradient(to right, #e0f7fa, #e3f2fd);
        }

        .hero-text {
          flex: 1 1 400px;
          padding: 1rem;
        }

        .hero-text h1 {
          font-size: 2.8rem;
          color: #0077b6;
          margin-bottom: 1rem;
        }

        .hero-text p {
          font-size: 1.2rem;
          color: #333;
          line-height: 1.6;
        }

        .hero-image {
          flex: 1 1 350px;
          display: flex;
          justify-content: center;
          padding: 1rem;
        }

        .hero-image img {
          width: 100%;
          max-width: 380px;
          border-radius: 20px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.1);
        }

        .nurse-role {
          padding: 3rem 2rem;
          text-align: center;
          background: #ffffff;
        }

        .nurse-role h2 {
          font-size: 2.2rem;
          color: #1976d2;
          margin-bottom: 1rem;
        }

        .nurse-role p {
          max-width: 800px;
          margin: auto;
          font-size: 1.1rem;
          color: #555;
          line-height: 1.6;
        }

        .news-section {
          padding: 3rem 2rem;
          background-color: #e8f5e9;
        }

        .news-icon-title {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
          margin-bottom: 2rem;
        }

        .news-section h2 {
          text-align: center;
          font-size: 2rem;
          color: #2e7d32;
        }

        .news-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          max-width: 900px;
          margin: auto;
        }

        .news-card {
          background: #ffffff;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .news-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 6px 24px rgba(0,0,0,0.12);
        }

        .news-card h4 {
          color: #43a047;
          margin-bottom: 10px;
        }

        .news-card p {
          font-size: 15px;
          color: #444;
        }

        .news-date {
          margin-top: 10px;
          font-size: 13px;
          color: #888;
        }

        @media (max-width: 768px) {
          .hero {
            flex-direction: column;
            text-align: center;
            padding: 2rem 1rem;
          }

          .hero-text h1 {
            font-size: 2rem;
          }

          .hero-text p {
            font-size: 1rem;
          }

          .news-section {
            padding: 2rem 1rem;
          }
        }
      `}</style>

      <NurseHeader />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>Welcome Nurse <b>{nurseName}</b> 👩‍⚕️</h1>
          <p>Your commitment to health makes a difference. Stay informed and help protect lives through vaccination management.</p>
        </div>
        <div className="hero-image">
          <img src={vaccineImage} alt="Nurse dashboard vaccine" />
        </div>
      </section>

      {/* Nurse Info Section */}
      <section className="nurse-role">
        <h2>Why Your Role Matters?</h2>
        <p>
          As a healthcare professional, you ensure timely vaccinations, provide reliable health info, and play a crucial role in building a healthier tomorrow.
          Stay connected and updated through this portal.
        </p>
      </section>

      {/* News Section */}
      <section className="news-section">
        <div className="news-icon-title">
          <h2>📢 Vaccination News & Updates</h2>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center' }}>Loading news...</p>
        ) : newsList.length === 0 ? (
          <p style={{ textAlign: 'center' }}>No news available.</p>
        ) : (
          <div className="news-list">
            {newsList.map((item, index) => (
              <div className="news-card" key={index}>
                <h4>📰 {item.title}</h4>
                <p>{item.news}</p>
                <div className="news-date">🕒 Updated: {formatDate(item.updatedAt)}</div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}

export default NurseDashboard;
