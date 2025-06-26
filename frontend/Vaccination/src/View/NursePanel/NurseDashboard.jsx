import React from 'react';
import NurseHeader from '../../Component/NurseHeader';
import Cookies from 'js-cookie';
import vaccineImage from '../../assets/images/Welcome2.png';
import { Link } from "react-router-dom";

function NurseDashboard() {
  const userSession = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
  const customername = userSession ? userSession.user.username : "Guest";

  return (
    <>
      <style>{`
        .dashboard-container {
          min-height: 100vh;
          background-color: #f0f8ff;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .dashboard-main {
          display: flex;
          flex-wrap: wrap;
          padding: 40px;
          align-items: center;
          justify-content: center;
          gap: 40px;
        }

        .image-section {
          flex: 1;
          min-width: 300px;
        }

        .vaccine-image {
          width: 100%;
          border-radius: 20px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }

        .info-section {
          flex: 1;
          min-width: 320px;
          background: #ffffff;
          padding: 30px;
          border-radius: 20px;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
        }

        .welcome-message {
          font-size: 26px;
          font-weight: bold;
          color: #1c3faa;
          margin-bottom: 10px;
        }

        .section-title {
          font-size: 22px;
          font-weight: 600;
          color: #333;
          margin-bottom: 15px;
        }

        .info-list {
          list-style-type: none;
          padding-left: 0;
          color: #444;
          line-height: 1.8;
        }

        .info-list li::before {
          content: "✔️ ";
          margin-right: 6px;
          color: #2b9348;
        }

        .extra-info {
          margin-top: 15px;
          color: #555;
          font-size: 15px;
          line-height: 1.5;
        }

        .book-button {
          margin-top: 25px;
          padding: 12px 24px;
          font-size: 16px;
          background-color: #0077cc;
          color: #fff;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .book-button:hover {
          background-color: #005fa3;
        }
      `}</style>

      <div className="dashboard-container">
        <NurseHeader />

        <main className="dashboard-main">
          <div className="image-section">
            <img src={vaccineImage} alt="Vaccination" className="vaccine-image" />
          </div>

          <div className="info-section">
            <h1 className="welcome-message">Welcome,Nure Mr/Mrs : {customername}!</h1>
            <h2 className="section-title">Why Vaccination Matters</h2>
            <ul className="info-list">
              <li>🛡️ Strengthens your immune system naturally.</li>
              <li>👪 Protects families, communities, and the vulnerable.</li>
              <li>🌍 Helps stop the spread of pandemics worldwide.</li>
              <li>⏳ Avoids long-term health complications.</li>
              <li>💉 Scientifically tested and approved for safety.</li>
            </ul>
            <p className="extra-info">
              Vaccines are one of the most successful and cost-effective public health interventions. 
              They help prevent more than 20 life-threatening diseases and save millions of lives each year.
            </p>

            <Link to="/booking">
              <button className="book-button">📅 Book Your Vaccine Now</button>
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}

export default NurseDashboard;
