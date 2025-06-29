import React from 'react';
import NurseHeader from '../../Component/NurseHeader';
import Cookies from 'js-cookie';
import vaccineImage from '../../assets/images/vaccineheader.png';

import Footer from "../../Component/Footer"

function NurseDashboard() {
  const userSession = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
  const customername = userSession ? userSession.user.username : "Guest";

  return (
    <>
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

        .reference-links a {
          display: block;
          margin-top: 10px;
          color: #0d47a1;
          text-decoration: none;
        }

        .reference-links a:hover {
          text-decoration: underline;
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
          margin-bottom: 5px;
        }

        .news-card p {
          margin: 0;
          font-size: 15px;
          color: #444;
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
            <img src={vaccineImage} alt="Vaccine awareness" className="vaccine-img" />
            <h2>Why Vaccination Matters</h2>
            <p>
              Vaccines are essential tools in preventing life-threatening diseases. They work by preparing the immune system to fight infections efficiently. The success of global immunization efforts has saved millions of lives and nearly eradicated diseases like polio and smallpox.
            </p>

            <ul>
              <li>✅ Protects individuals from deadly infections</li>
              <li>✅ Builds herd immunity to protect communities</li>
              <li>✅ Reduces hospital visits and medical expenses</li>
              <li>✅ Prevents the resurgence of controlled diseases</li>
              <li>✅ Required for school, travel, and employment in many cases</li>
            </ul>

            <div className="reference-links">
              <h4>Trusted Sources:</h4>
              <a href="https://www.who.int" target="_blank">🌐 WHO – Vaccination Info</a>
              <a href="https://www.cdc.gov" target="_blank">🌐 CDC – Immunization Hub</a>
              <a href="https://www.unicef.org" target="_blank">🌐 UNICEF – Global Vaccination</a>
              <a href="https://www.mohfw.gov.in" target="_blank">🌐 Indian Health Ministry</a>
            </div>

      
          </div>

          {/* Right Section */}
          <div className="right-box">
            <h2>📢 Vaccination News & Updates</h2>

            <div className="news-card">
              <h4>🗓️ National Vaccine Drive (July 2025)</h4>
              <p>Special outreach camps announced for rural areas with door-to-door services available.</p>
            </div>

            <div className="news-card">
              <h4>🧪 Dengue Vaccine Approved</h4>
              <p>Indian Council approves emergency use for new dengue vaccine. Trials showed 94% effectiveness.</p>
            </div>

            <div className="news-card">
              <h4>📲 New Vaccine Tracking App</h4>
              <p>Now track your doses, get reminders, and access your digital vaccine certificate.</p>
            </div>

          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default NurseDashboard;
