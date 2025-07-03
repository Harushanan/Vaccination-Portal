import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import AdminHeader from '../../Component/AdminHeader';
import Sidebar from '../../Component/Sidebar';
import Footer from "../../Component/Footer";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ViewNews() {
  const [newsList, setNewsList] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3000/allnews")
      .then((result) => {
        setNewsList(result.data.allnews || []);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to fetch news");
        setLoading(false);
      });
  }, []);

  const handleEdit = (news) => {
    setEditingId(news._id);
    setEditedTitle(news.title);
    setEditedContent(news.news);
  };

  const handleUpdate = () => {
    if (!editedTitle.trim() || !editedContent.trim()) {
      toast.error("Title and Content cannot be empty");
      return;
    }

    axios.put(`http://localhost:3000/updateNews/${editingId}`, {
      title: editedTitle,
      news: editedContent
    })
      .then((res) => {
        if (res.data.message === "News updated") {
          setNewsList((prev) =>
            prev.map((n) =>
              n._id === editingId
                ? { ...n, title: editedTitle, news: editedContent, updatedAt: new Date().toISOString() }
                : n
            )
          );
          toast.success("News updated successfully");
          setEditingId(null);
          setEditedTitle('');
          setEditedContent('');
        } else {
          toast.error("Update failed");
        }
      })
      .catch(() => {
        toast.error("Something went wrong while updating");
      });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this news item?")) {
      axios.delete(`http://localhost:3000/deleteNews/${id}`)
        .then((res) => {
          if (res.data.message === "News deleted successfully") {
            setNewsList((prev) => prev.filter((n) => n._id !== id));
            toast.success("News deleted successfully");
          } else {
            toast.error("Delete failed");
          }
        })
        .catch(() => {
          toast.error("Something went wrong while deleting");
        });
    }
  };

  const formatDateTime = (isoString) => {
    if (!isoString) return "Not available";
    const options = {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    return new Date(isoString).toLocaleString('en-GB', options).replace(',', ' -');
  };

  return (
    <>
      <style>{`
        .admin-dashboard-container {
          display: flex;
          background: #f4f4f4;
          min-height: 100vh;
        }

        .admin-dashboard-main {
          flex: 1;
          padding: 20px;
        }

        nav {
          background: #333;
          padding: 10px 20px;
          border-radius: 6px;
          margin-bottom: 20px;
        }

        nav ul {
          display: flex;
          list-style: none;
          gap: 15px;
          margin: 0;
          padding: 0;
        }

        nav ul li a {
          color: white;
          text-decoration: none;
          font-weight: 600;
        }

        h1 {
          margin-top: 0;
          margin-bottom: 15px;
          color: #222;
        }

        .news-item {
          background: white;
          padding: 15px 20px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgb(0 0 0 / 0.1);
          margin-bottom: 15px;
        }

        .news-item p {
          margin: 6px 0;
          color: #444;
          white-space: pre-wrap;
        }

        .news-item p strong {
          color: #111;
        }

        input[type="text"], textarea {
          width: 100%;
          max-width: 600px;
          padding: 10px;
          margin: 8px 0;
          border-radius: 5px;
          border: 1px solid #ccc;
          font-size: 1rem;
          font-family: inherit;
          box-sizing: border-box;
          resize: vertical;
        }

        textarea {
          min-height: 80px;
        }

        .btn-group {
          margin-top: 10px;
          display: flex;
          gap: 10px;
        }

        button {
          padding: 8px 16px;
          border-radius: 6px;
          border: none;
          cursor: pointer;
          font-weight: 600;
          font-size: 1rem;
          color: white;
          transition: background-color 0.3s ease;
        }

        button.save-btn {
          background-color: #28a745;
        }
        button.save-btn:hover {
          background-color: #218838;
        }

        button.cancel-btn {
          background-color: #6c757d;
        }
        button.cancel-btn:hover {
          background-color: #5a6268;
        }

        button.edit-btn {
          background-color: #007bff;
        }
        button.edit-btn:hover {
          background-color: #0069d9;
        }

        button.delete-btn {
          background-color: #dc3545;
        }
        button.delete-btn:hover {
          background-color: #c82333;
        }

        @media (max-width: 768px) {
          nav ul {
            flex-direction: column;
            gap: 10px;
          }
          .news-item {
            padding: 15px;
          }
          input[type="text"], textarea {
            max-width: 100%;
          }
          button {
            width: 100%;
          }
          .btn-group {
            flex-direction: column;
          }
        }
      `}</style>

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

          <h1>View News</h1>

          {loading ? (
            <p>Loading...</p>
          ) : newsList.length > 0 ? (
            newsList.map((news) => (
              <div key={news._id} className="news-item">
                {editingId === news._id ? (
                  <>
                    <input
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      placeholder="Edit title"
                    />
                    <textarea
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                      placeholder="Edit content"
                    />
                    <div className="btn-group">
                      <button className="save-btn" onClick={handleUpdate}>Save</button>
                      <button className="cancel-btn" onClick={() => setEditingId(null)}>Cancel</button>
                    </div>
                  </>
                ) : (
                  <>
                    <p><strong>Title:</strong> {news.title}</p>
                    <p><strong>Content:</strong> {news.news}</p>
                    <p><strong>Last updated:</strong> {formatDateTime(news.updatedAt)}</p>
                    <div className="btn-group">
                      <button className="edit-btn" onClick={() => handleEdit(news)}>Edit</button>
                      <button className="delete-btn" onClick={() => handleDelete(news._id)}>Delete</button>
                    </div>
                  </>
                )}
              </div>
            ))
          ) : (
            <p>No News available.</p>
          )}
        </main>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
      <Footer />
    </>
  );
}

export default ViewNews;
