import React, { useEffect, useState } from 'react';
import NurseHeader from '../../Component/NurseHeader';
import Cookies from 'js-cookie';
import vaccineImage from '../../assets/images/vaccineheader.png';
import Footer from "../../Component/Footer";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NurseDashboard() {
  const userSession = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
  const customername = userSession ? userSession.user.username : "Guest";

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
    return date.toLocaleString(); // example: "7/1/2025, 4:30:00 PM"
  };

  return (
    <>
      <ToastContainer />
      <style>{`
        .dashboard-container {
          background: linear-gradient(to right, #e3f2fd, #ffffff);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          min-height: 100vh;
        }

        .dashboard-content {
          display: flex;
          flex-wrap: wrap;
          padding: 40px 5%;
          gap: 30px;
          justify-content: space-between;
        }

        .left-box, .right-box {
          flex: 1 1 48%;
          background-color: #ffffff;
          border-radius: 15px;
          padding: 30px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
        }

        .left-box h2, .right-box h2 {
          color: #1565c0;
          margin-bottom: 20px;
        }

        .left-box p {
          font-size: 16px;
          color: #333;
          line-height: 1.6;
        }

        .left-box ul {
          padding-left: 20px;
          margin-top: 10px;
        }

        .left-box li {
          margin-bottom: 10px;
          line-height: 1.5;
        }

        .vaccine-img {
          width: 100%;
          max-height: 240px;
          object-fit: cover;
          margin-top: 20px;
          border-radius: 10px;
        }

        .news-card {
          background: #f1f8e9;
          border-left: 5px solid #43a047;
          padding: 15px 20px;
          border-radius: 10px;
          margin-bottom: 20px;
        }

        .news-card h4 {
          color: #2e7d32;
          margin-bottom: 8px;
        }

        .news-card p {
          margin: 0;
          font-size: 15px;
          color: #444;
        }

        .news-date {
          margin-top: 8px;
          font-size: 13px;
          color: #888;
        }

        @media (max-width: 768px) {
          .dashboard-content {
            flex-direction: column;
            padding: 20px;
          }

          .left-box, .right-box {
            flex: 1 1 100%;
          }
        }
      `}</style>

      <div className="dashboard-container">
        <NurseHeader />

        <div className="dashboard-content">
          {/* Left Section */}
          <div className="left-box">
            <h2>👩‍⚕️ Welcome, {customername}!</h2>
            <p>
              As a nurse, your role in vaccination awareness and care is vital. Here’s a quick overview of what’s happening in the immunization space.
            </p>
            <ul>
              <li>Track patient vaccinations efficiently.</li>
              <li>Stay updated with latest vaccine guidelines.</li>
              <li>Use digital tools to manage schedules.</li>
            </ul>
            <img src={vaccineImage} alt="Vaccine awareness" className="vaccine-img" />
          </div>

          {/* Right Section */}
          <div className="right-box">
            <h2>📢 Vaccination News & Updates</h2>

            {loading ? (
              <p>Loading news...</p>
            ) : newsList.length === 0 ? (
              <p>No news available.</p>
            ) : (
              newsList.map((item, index) => (
                <div className="news-card" key={index}>
                  <h4>📰 {item.title}</h4>
                  <p>{item.news}</p>
                  <div className="news-date">🕒 Updated: {formatDate(item.updatedAt)}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default NurseDashboard;
