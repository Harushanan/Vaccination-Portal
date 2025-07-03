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
      <style>{`
        .admin-dashboard-container {
          display: flex;
          min-height: 100vh;
          background: #f4f4f4;
        }

        .admin-dashboard-main {
          flex: 1;
          padding: 20px 30px;
        }

        nav {
          background: #007bff;
          border-radius: 6px;
          padding: 12px 20px;
          margin-bottom: 25px;
        }

        nav ul {
          margin: 0;
          padding: 0;
          list-style: none;
          display: flex;
          gap: 20px;
        }

        nav ul li a {
          color: white;
          text-decoration: none;
          font-weight: 600;
          font-size: 1rem;
          transition: color 0.3s ease;
        }

        nav ul li a:hover {
          color: #ffd700;
        }

        h1 {
          margin-top: 0;
          margin-bottom: 20px;
          font-size: 2rem;
          color: #333;
        }

        h2 {
          margin-bottom: 20px;
          font-weight: 600;
          color: #555;
        }

        form {
          background: white;
          padding: 25px;
          max-width: 600px;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }

        label {
          display: block;
          margin-bottom: 15px;
          font-weight: 600;
          color: #444;
          font-size: 1rem;
        }

        input[type="text"], textarea {
          width: 100%;
          padding: 12px 14px;
          border-radius: 6px;
          border: 1px solid #ccc;
          font-size: 1rem;
          resize: vertical;
          transition: border-color 0.3s ease;
        }

        input[type="text"]:focus, textarea:focus {
          outline: none;
          border-color: #007bff;
          box-shadow: 0 0 5px rgba(0,123,255,0.5);
        }

        textarea {
          min-height: 120px;
        }

        button[type="submit"] {
          background-color: #28a745;
          color: white;
          padding: 12px 25px;
          font-size: 1rem;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          margin-top: 10px;
        }

        button[type="submit"]:hover {
          background-color: #218838;
        }

        @media (max-width: 768px) {
          .admin-dashboard-container {
            flex-direction: column;
          }
          form {
            max-width: 100%;
            padding: 20px;
          }
          nav ul {
            flex-direction: column;
            gap: 10px;
          }
          nav ul li a {
            font-size: 1.1rem;
          }
        }
      `}</style>

      <ToastContainer position="top-right" autoClose={3000} />
      <AdminHeader />

      <div className="admin-dashboard-container">
        <Sidebar />

        <main className="admin-dashboard-main">
          <nav>
            <ul>
              <li><Link to="/admin/News">Add News</Link></li>
              <li><Link to="/admin/ViewNews">View News</Link></li>
            </ul>
          </nav>

          <h1>Add News</h1>

          <form onSubmit={handleSubmit}>
            <h2>Enter News Details</h2>

            <label htmlFor="title">
              News Title (Heading):
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Enter news headline"
              />
            </label>

            <label htmlFor="news">
              Content:
              <textarea
                id="news"
                value={news}
                onChange={(e) => setNews(e.target.value)}
                required
                placeholder="Enter news content"
              />
            </label>

            <button type="submit">Add News</button>
          </form>
        </main>
      </div>

      <Footer />
    </>
  );
}

export default News;
