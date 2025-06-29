import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <>
      <style>
        {`
          .notfound-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 20px;
            background: linear-gradient(to right, #f8fafc, #e2e8f0);
            text-align: center;
            animation: fadeIn 0.8s ease-in-out;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          }

          .notfound-code {
            font-size: 100px;
            font-weight: bold;
            color: #dc2626;
            margin-bottom: 10px;
            animation: pulse 1.5s infinite;
          }

          .notfound-title {
            font-size: 28px;
            font-weight: 600;
            color: #2d3748;
            margin-bottom: 10px;
          }

          .notfound-description {
            font-size: 16px;
            color: #4a5568;
            margin-bottom: 25px;
            max-width: 480px;
          }

          .notfound-button {
            background-color: #2563eb;
            color: white;
            padding: 12px 28px;
            border-radius: 30px;
            text-decoration: none;
            font-weight: 600;
            transition: background-color 0.3s ease, transform 0.3s ease;
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
          }

          .notfound-button:hover {
            background-color: #1d4ed8;
            transform: scale(1.05);
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(25px);
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
              transform: scale(1.03);
            }
          }

          @media (max-width: 600px) {
            .notfound-code {
              font-size: 60px;
            }

            .notfound-title {
              font-size: 22px;
            }

            .notfound-description {
              font-size: 14px;
              padding: 0 10px;
            }

            .notfound-button {
              padding: 10px 20px;
              font-size: 14px;
            }
          }
        `}
      </style>

      <div className="notfound-container">
        <h1 className="notfound-code">404</h1>
        <p className="notfound-title">Oops! Page not found.</p>
        <p className="notfound-description">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="notfound-button">
          Go Home
        </Link>
      </div>
    </>
  );
}

export default NotFound;
