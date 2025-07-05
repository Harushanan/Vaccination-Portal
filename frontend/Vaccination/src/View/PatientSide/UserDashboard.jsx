import React, { useEffect, useState } from 'react';
import NurseHeader from '../../Component/PatientHeader';
import Footer from '../../Component/Footer';
import axios from 'axios';
import vaccineImage from '../../assets/images/homepage.png';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function UserDashboard() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [centers, setCenters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/displaycenter")
      .then((result) => {
        setCenters(result.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:3000/allnews')
      .then((result) => {
        setNewsList(result.data.allnews || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching news:', error);
        toast.error('Failed to fetch news');
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
          background: #f0f9ff;
          color: #023047;
        }
        .hero {
          display: flex;
          flex-wrap: wrap;
          padding: 4rem 2rem;
          align-items: center;
          gap: 3rem;
          background: linear-gradient(135deg, #ade8f4, #caf0f8);
        }
        .hero-text {
          flex: 1 1 350px;
        }
        .hero-text h1 {
          font-size: 2.5rem;
          color: #023e8a;
          margin-bottom: 1rem;
        }
        .hero-text p {
          font-size: 1.2rem;
          margin-bottom: 2rem;
        }
        .hero-buttons {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        .hero-buttons button {
          background: #0077b6;
          color: white;
          padding: 0.9rem 2rem;
          font-size: 1rem;
          border: none;
          border-radius: 25px;
          cursor: pointer;
          transition: background 0.3s ease;
          min-width: 140px;
          text-align: center;
        }
        .hero-buttons button:hover {
          background: #023e8a;
        }
        .certificate-btn {
          background: #43a047;
        }
        .certificate-btn:hover {
          background: #2e7d32;
        }
        .hero-image {
          flex: 1 1 350px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .hero-image img {
          max-width: 100%;
          height: auto;
          max-height: 320px;
          border-radius: 15px;
          box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
          object-fit: contain;
        }
        .why-vaccinate {
          text-align: center;
          padding: 3rem 2rem;
          max-width: 900px;
          margin: 0 auto;
        }
        .why-vaccinate h2 {
          font-size: 2.2rem;
          margin-bottom: 1.5rem;
          color: #0077b6;
        }
        .why-vaccinate p {
          font-size: 1.1rem;
          max-width: 800px;
          margin: auto;
          color: #555;
          line-height: 1.6;
        }

        /* Vaccination Centers Scrollable */
        .vaccine-types {
          padding: 3rem 2rem;
          background-color: #e0f7fa;
          text-align: center;
        }
        .vaccine-types h2 {
          font-size: 2rem;
          color: #0077b6;
          margin-bottom: 2rem;
        }
        .center-scroll-container {
          overflow-x: auto;
          padding-bottom: 1rem;
          margin: 0 auto;
        }
        .cards-scroll {
          display: flex;
          flex-wrap: nowrap;
          gap: 1.5rem;
          padding: 1rem 1rem 2rem;
          width: max-content;
        }
        .center-card {
          background: white;
          border-radius: 20px;
          box-shadow: 0 6px 12px rgba(0,0,0,0.1);
          padding: 1.5rem;
          min-width: 260px;
          max-width: 280px;
          flex: 0 0 auto;
          text-align: center;
          transition: transform 0.3s ease;
        }
        .center-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.15);
        }
        .center-card img {
          border-radius: 10px;
          margin-bottom: 1rem;
          width: 100%;
          height: 140px;
          object-fit: cover;
        }
        .center-card h3 {
          color: #023e8a;
          margin-bottom: 0.5rem;
        }
        .time-phone {
          font-size: 0.95rem;
          color: #555;
          line-height: 1.4;
        }

        .center-scroll-container::-webkit-scrollbar {
          height: 8px;
        }
        .center-scroll-container::-webkit-scrollbar-thumb {
          background-color: #aaa;
          border-radius: 10px;
        }

        /* News Section */
        .news-section {
          padding: 2rem 1rem 4rem;
          max-width: 900px;
          margin: 0 auto;
        }
        .news-section h2 {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #0077b6;
          margin-bottom: 1.5rem;
          font-size: 2rem;
          gap: 10px;
        }
        .news-icon {
          font-size: 1.8rem;
          color: #43a047;
        }
        .news-card {
          background: #f1f8e9;
          border-left: 5px solid #43a047;
          padding: 15px 20px;
          border-radius: 10px;
          margin-bottom: 20px;
          box-shadow: 0 3px 8px rgba(67, 160, 71, 0.15);
          transition: background 0.3s ease;
        }
        .news-card:hover {
          background: #dcedc8;
        }
        .news-card h4 {
          color: #2e7d32;
          margin-bottom: 8px;
          font-weight: 600;
        }
        .news-card p {
          margin: 0;
          font-size: 15px;
          color: #444;
          line-height: 1.5;
        }
        .news-date {
          margin-top: 8px;
          font-size: 13px;
          color: #888;
          font-style: italic;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .hero {
            flex-direction: column;
            text-align: center;
          }
          .hero-image img {
            max-height: 220px;
          }
          .cards-scroll {
            padding-left: 1rem;
          }
          .center-card {
            min-width: 220px;
          }
          .time-phone {
            font-size: 0.85rem;
          }
        }
        @media (max-width: 480px) {
          .hero-buttons {
            flex-direction: column;
            align-items: center;
          }
          .hero-buttons button {
            width: 100%;
            max-width: 300px;
          }
        }
      `}</style>

      <NurseHeader />

      {/* Hero */}
      <section className="hero">
        <div className="hero-text">
          <h1>Protect Your Future, One Shot at a Time</h1>
          <p>Book your vaccination appointment today with our trusted online portal. Safe, fast & reliable.</p>
          <div className="hero-buttons">
            <button onClick={() => navigate('/patient/BookingVaccine')}>Book Now</button>
            <button onClick={() => navigate('/patient/ReportPage')} className="certificate-btn">
              Get Certificate 📄
            </button>
          </div>
        </div>
        <div className="hero-image">
          <img src={vaccineImage} alt="Vaccination" />
        </div>
      </section>

      {/* Why Vaccinate */}
      <section className="why-vaccinate">
        <h2>Why Vaccinate?</h2>
        <p>
          Vaccines protect you and your loved ones from harmful diseases. They help reduce the spread of infections,
          boost immunity, and keep our communities safe. Get vaccinated for a healthier tomorrow.
        </p>
      </section>

      {/* Vaccination Centers */}
      <section className="vaccine-types">
        <h2>Our Vaccination Centers</h2>
        <div className="center-scroll-container">
          <div className="cards-scroll">
            {centers.map((center, index) => (
              <div className="center-card" tabIndex={0} key={index}>
                <img src={center.Image} alt={center.center} />
                <h3>{center.center}</h3>
                <p className="time-phone">
                  🕒 {center.startTime} - {center.closeTime}<br />
                  📞 {center.phone}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="news-section">
        <h2>
          <span className="news-icon" role="img" aria-label="news">📢</span>
          Vaccination News & Updates
        </h2>
        {loading ? (
          <p style={{ textAlign: 'center' }}>Loading news...</p>
        ) : newsList.length === 0 ? (
          <p style={{ textAlign: 'center' }}>No news available.</p>
        ) : (
          newsList.map((item, index) => (
            <div className="news-card" key={index}>
              <h4>{item.title}</h4>
              <p>{item.news}</p>
              <div className="news-date">🕒 Updated: {formatDate(item.updatedAt)}</div>
            </div>
          ))
        )}
      </section>

      <Footer />
    </>
  );
}

export default UserDashboard;
