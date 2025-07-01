import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

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
      .catch((err) => {
        console.error("Update error:", err);
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
        .catch((err) => {
          console.error("Delete error:", err);
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
      <AdminHeader />
      <div style={{ display: 'flex', minHeight: '90vh', backgroundColor: '#e6f7ff' }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '20px 40px', fontFamily: 'Segoe UI, sans-serif' }}>
          <nav style={navStyle}>
            <ul style={navListStyle}>
              <li><Link to="/admin/News" style={navLinkStyle}>Add News</Link></li>
              <li><Link to="/admin/ViewNews" style={navLinkStyle}>View News</Link></li>
            </ul>
          </nav>

          <h1 style={{ marginBottom: '20px' }}>View News</h1>

          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {loading ? (
              <p style={{ textAlign: "center", fontSize: "18px", color: "#666" }}>Loading...</p>
            ) : newsList.length > 0 ? (
              newsList.map((news) => (
                <div key={news._id} style={newsCard}>
                  {editingId === news._id ? (
                    <>
                      <input
                        type="text"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        placeholder="Edit title"
                        style={inputStyle}
                      />
                      <textarea
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                        placeholder="Edit content"
                        rows={4}
                        style={textareaStyle}
                      />
                      <div style={{ marginTop: "10px" }}>
                        <button onClick={handleUpdate} style={saveBtn}>Save</button>
                        <button onClick={() => setEditingId(null)} style={cancelBtn}>Cancel</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p style={{ fontWeight: "600", fontSize: '18px', color: "#00695c" }}>Title: {news.title}</p>
                      <p style={{ color: "#34495e" }}>Content: {news.news}</p>
                      <p style={{ fontSize: '14px', color: '#888' }}>
                        Last updated: {formatDateTime(news.updatedAt)}
                      </p>
                      <div style={{ marginTop: "10px" }}>
                        <button onClick={() => handleEdit(news)} style={editBtn}>Edit</button>
                        <button onClick={() => handleDelete(news._id)} style={deleteBtn}>Delete</button>
                      </div>
                    </>
                  )}
                </div>
              ))
            ) : (
              <p style={{ textAlign: "center", fontSize: "18px", color: "#999" }}>No News available.</p>
            )}
          </div>
        </main>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
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
  marginBottom: '20px',
  boxShadow: '0 6px 16px rgba(0, 0, 0, 0.4)'
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
  userSelect: 'none'
};

const newsCard = {
  backgroundColor: '#f9f9f9',
  padding: '20px',
  borderRadius: '10px',
  marginBottom: '20px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  fontSize: '16px',
  borderRadius: '6px',
  border: '1px solid #ccc',
  marginBottom: '10px'
};

const textareaStyle = {
  width: '100%',
  padding: '10px',
  fontSize: '16px',
  borderRadius: '6px',
  border: '1px solid #ccc'
};

const saveBtn = {
  backgroundColor: '#2e7d32',
  color: 'white',
  padding: '8px 14px',
  border: 'none',
  borderRadius: '5px',
  marginRight: '10px',
  cursor: 'pointer'
};

const cancelBtn = {
  backgroundColor: '#b71c1c',
  color: 'white',
  padding: '8px 14px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};

const editBtn = {
  backgroundColor: '#0277bd',
  color: 'white',
  padding: '8px 14px',
  border: 'none',
  borderRadius: '5px',
  marginRight: '10px',
  cursor: 'pointer'
};

const deleteBtn = {
  backgroundColor: '#d32f2f',
  color: 'white',
  padding: '8px 14px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};

export default ViewNews;
