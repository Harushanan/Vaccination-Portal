import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import AdminHeader from '../../Component/AdminHeader';
import Sidebar from '../../Component/Sidebar';
import axios from 'axios';
import Footer from "../../Component/Footer"

function AdminFaq() {
  const [faqs, setFaqs] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editedQuestion, setEditedQuestion] = useState("");
  const [editedAnswer, setEditedAnswer] = useState("");
  const [editedCategory, setEditedCategory] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const response = await axios.get("http://localhost:3000/displayfaq");
      setFaqs(response.data);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    }
  };

  const handleDelete = async (faqId) => {
    try {
      await axios.delete(`http://localhost:3000/deletefaq/${faqId}`);
      fetchFaqs();
    } catch (error) {
      console.error("Error deleting FAQ:", error);
    }
  };

  const handleEdit = (faq) => {
    setEditing(faq._id);
    setEditedQuestion(faq.question);
    setEditedAnswer(faq.answer || "");
    setEditedCategory(faq.faqtype);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3000/updatefaq/${editing}`, {
        question: editedQuestion,
        answer: editedAnswer,
        faqtype: editedCategory,
      });
      setEditing(null);
      fetchFaqs();
    } catch (error) {
      console.error("Error updating FAQ:", error);
    }
  };

  const filteredFaqs = faqs.filter((faq) => {
    if (filter === "answered") return faq.answer?.trim() !== "";
    if (filter === "unanswered") return !faq.answer || faq.answer.trim() === "";
    return true;
  });

  return (
    <>
      <AdminHeader />
      <div style={{ display: 'flex', minHeight: '90vh',  backgroundColor: '#e6f7ff' }}>
        <Sidebar />
        <main style={{ flex: 1, padding: '30px 40px', fontFamily: 'Segoe UI, sans-serif' }}>
          <nav style={navStyle}>
            <ul style={navListStyle}>
              <li><Link to="" style={navLinkStyle}>Patient FAQs</Link></li>
              <li><Link to="" style={navLinkStyle}>Nurse FAQs</Link></li>

            </ul>
          </nav>

          <h1 style={{ fontSize: '28px', margin: '20px 0' }}>Answer the FAQs</h1>

          <div style={{ marginBottom: "25px" }}>
            <label style={{ fontWeight: '600' }}>Filter: </label>
            <select
              onChange={(e) => setFilter(e.target.value)}
              value={filter}
              style={filterSelectStyle}
            >
              <option value="all">All</option>
              <option value="answered">Answered</option>
              <option value="unanswered">Unanswered</option>
            </select>
          </div>

          <div>
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => (
                <div key={faq._id} style={faqCard}>
                  {editing === faq._id ? (
                    <>
                      <input
                        type="text"
                        value={editedQuestion}
                        onChange={(e) => setEditedQuestion(e.target.value)}
                        placeholder="Edit question"
                        style={inputStyle}
                      />
                      <textarea
                        value={editedAnswer}
                        onChange={(e) => setEditedAnswer(e.target.value)}
                        placeholder="Edit answer"
                        rows={4}
                        style={textareaStyle}
                      />
                      <label style={{ fontWeight: '500' }}>Category:</label>
                      <select
                        value={editedCategory}
                        onChange={(e) => setEditedCategory(e.target.value)}
                        style={filterSelectStyle}
                      >
                        <option value="EventBooking">Event Booking</option>
                        <option value="Product Order">Product Order</option>
                        <option value="Account">Account</option>
                        <option value="Delivery">Delivery</option>
                      </select>
                      <div style={{ marginTop: "12px" }}>
                        <button onClick={handleUpdate} style={saveBtn}>Save</button>
                        <button onClick={() => setEditing(null)} style={cancelBtn}>Cancel</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <p style={{ fontWeight: "600", color: "#00695c" }}>Category: {faq.faqtype}</p>
                      <p style={{ fontWeight: "600", color: "#2c3e50" }}>Q: {faq.question}</p>
                      {faq.answer ? (
                        <p style={{ color: "#34495e" }}>A: {faq.answer}</p>
                      ) : (
                        <p style={{ color: "#c0392b", fontStyle: 'italic' }}>Unanswered</p>
                      )}
                      <div style={{ marginTop: "10px" }}>
                        <button onClick={() => handleEdit(faq)} style={editBtn}>Edit</button>
                        <button onClick={() => handleDelete(faq._id)} style={deleteBtn}>Delete</button>
                      </div>
                    </>
                  )}
                </div>
              ))
            ) : (
              <p style={{ textAlign: "center", fontSize: "18px", color: "#999" }}>No FAQs available.</p>
            )}
          </div>
        </main>
      </div>
      <Footer/>
    </>
  );
}

// Nav styles
const navStyle = {
  background: 'linear-gradient(90deg,#004d40,#006064)',
  padding: '12px 20px',
  borderRadius: '12px',
  marginBottom: '30px',
};

const navListStyle = {
  display: 'flex',
  listStyle: 'none',
  gap: '30px',
  margin: 0,
  padding: 0
};

const navLinkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontWeight: '600',
  fontSize: '16px',
  padding: '8px 14px',
  borderRadius: '5px',
  transition: 'all 0.3s ease',
};

const filterSelectStyle = {
  padding: "8px 12px",
  fontSize: "16px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  backgroundColor: "#fff",
  marginLeft: "10px"
};

// FAQ card
const faqCard = {
  marginBottom: "20px",
  padding: "20px",
  backgroundColor: "#ffffff",
  borderRadius: "10px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "15px"
};

const textareaStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "15px",
  marginBottom: "10px",
  resize: "vertical"
};

const saveBtn = {
  backgroundColor: "#27ae60",
  color: "white",
  padding: "10px 16px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
  fontWeight: "600",
  marginRight: "10px"
};

const cancelBtn = {
  backgroundColor: "#bdc3c7",
  color: "#2c3e50",
  padding: "10px 16px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
  fontWeight: "600"
};

const editBtn = {
  backgroundColor: "#2980b9",
  color: "white",
  padding: "10px 16px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
  fontWeight: "600",
  marginRight: "10px"
};

const deleteBtn = {
  backgroundColor: "#e74c3c",
  color: "white",
  padding: "10px 16px",
  borderRadius: "6px",
  border: "none",
  cursor: "pointer",
  fontWeight: "600"
};

export default AdminFaq;
