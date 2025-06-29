import React from 'react';
import { useNavigate } from 'react-router-dom';

function UnauthPage() {
  const navigate = useNavigate();

  return (
    <>
      <style>
        {`
          .unauth-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 20px;
            background: linear-gradient(135deg, #fff8dc, #ffeaa7);
            text-align: center;
            animation: fadeIn 0.7s ease-in-out;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }

          .unauth-code {
            font-size: 90px;
            font-weight: 800;
            color: #d97706;
            margin-bottom: 10px;
            animation: pulse 1.5s infinite;
          }

          .unauth-title {
            font-size: 26px;
            font-weight: 600;
            color: #222;
            margin-bottom: 8px;
          }

          .unauth-description {
            font-size: 17px;
            color: #555;
            margin-bottom: 24px;
            max-width: 400px;
          }

          .unauth-button {
            background-color: #f59e0b;
            color: white;
            padding: 12px 30px;
            border-radius: 25px;
            font-size: 16px;
            font-weight: 600;
            border: none;
            cursor: pointer;
            box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease, background-color 0.3s ease;
          }

          .unauth-button:hover {
            background-color: #d97706;
            transform: scale(1.06);
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.04);
            }
          }

          @media (max-width: 600px) {
            .unauth-code {
              font-size: 60px;
            }

            .unauth-title {
              font-size: 22px;
            }

            .unauth-description {
              font-size: 15px;
              padding: 0 10px;
            }

            .unauth-button {
              padding: 10px 20px;
              font-size: 14px;
            }
          }
        `}
      </style>

      <div className="unauth-container">
        <h1 className="unauth-code">401</h1>
        <p className="unauth-title">Unauthorized Access</p>
        <p className="unauth-description">
          You don’t have permission to view this page. Please check your access rights or return.
        </p>
        <button onClick={() => navigate(-1)} className="unauth-button">
          Go Back
        </button>
      </div>
    </>
  );
}

export default UnauthPage;
