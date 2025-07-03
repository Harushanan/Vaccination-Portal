import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import AdminHeader from '../../Component/AdminHeader';
import Sidebar from '../../Component/Sidebar';
import axios from 'axios';
import Footer from "../../Component/Footer";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      toast.error("Failed to load FAQs");
    }
  };

  const handleDelete = async (faqId) => {
    if (window.confirm("Are you sure you want to delete this FAQ?")) {
      try {
        await axios.delete(`http://localhost:3000/deletefaq/${faqId}`);
        toast.success("FAQ deleted successfully");
        fetchFaqs();
      } catch (error) {
        console.error("Error deleting FAQ:", error);
        toast.error("Failed to delete FAQ");
      }
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
      toast.success("FAQ updated successfully");
      setEditing(null);
      fetchFaqs();
    } catch (error) {
      console.error("Error updating FAQ:", error);
      toast.error("Failed to update FAQ");
    }
  };

  const filteredFaqs = faqs.filter((faq) => {
    if (filter === "answered") return faq.answer?.trim() !== "";
    if (filter === "unanswered") return !faq.answer || faq.answer.trim() === "";
    return true;
  });

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
          padding: 20px;
          box-sizing: border-box;
        }

        .admin-dashboard-nav {
          background: #007bff;
          padding: 12px 20px;
          border-radius: 6px;
          margin-bottom: 20px;
          color: white;
        }

        .admin-dashboard-nav-list {
          display: flex;
          gap: 20px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .admin-dashboard-nav-list li a {
          color: white;
          font-weight: bold;
          text-decoration: none;
        }

        h1 {
          margin-top: 0;
          margin-bottom: 20px;
          color: #333;
        }

        label {
          font-weight: 600;
          margin-right: 8px;
        }

        select, input[type="text"], textarea {
          padding: 8px 12px;
          margin-bottom: 15px;
          border-radius: 6px;
          border: 1px solid #ccc;
          width: 100%;
          max-width: 400px;
          font-size: 1rem;
          font-family: inherit;
          box-sizing: border-box;
          resize: vertical;
        }

        .faq-card {
          background: white;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 20px;
          box-shadow: 0 1px 6px rgb(0 0 0 / 0.1);
        }

        .faq-info p {
          margin: 6px 0;
          color: #444;
        }

        .faq-buttons {
          margin-top: 12px;
          display: flex;
          gap: 12px;
        }

        button {
          padding: 8px 14px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          color: white;
          transition: background-color 0.3s ease;
          font-family: inherit;
        }

        button.edit-btn {
          background-color: #007bff;
        }

        button.delete-btn {
          background-color: #dc3545;
        }

        button.save-btn {
          background-color: #28a745;
        }

        button.cancel-btn {
          background-color: #6c757d;
        }

        button:hover {
          opacity: 0.9;
        }

        .edit-inputs {
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-width: 600px;
        }

        @media (max-width: 768px) {
          .admin-dashboard-container {
            flex-direction: column;
          }

          .faq-card {
            padding: 15px;
          }

          select, input[type="text"], textarea {
            max-width: 100%;
          }

          .faq-buttons {
            flex-direction: column;
            gap: 8px;
          }
        }
      `}</style>

      <AdminHeader />
      <div className="admin-dashboard-container">
        <Sidebar />
        <main className="admin-dashboard-main">
          <nav className="admin-dashboard-nav">
            <ul className="admin-dashboard-nav-list">
              <li><Link to="#">Patient FAQs</Link></li>
              <li><Link to="#">Nurse FAQs</Link></li>
            </ul>
          </nav>

          <h1>Answer the FAQs</h1>

          <div>
            <label htmlFor="filter">Filter:</label>
            <select
              id="filter"
              value={filter}
              onChange={e => setFilter(e.target.value)}
            >
              <option value="all">All</option>
              <option value="answered">Answered</option>
              <option value="unanswered">Unanswered</option>
            </select>
          </div>

          <div>
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => (
                <div className="faq-card" key={faq._id}>
                  {editing === faq._id ? (
                    <div className="edit-inputs">
                      <input
                        type="text"
                        value={editedQuestion}
                        onChange={e => setEditedQuestion(e.target.value)}
                        placeholder="Edit question"
                      />
                      <textarea
                        value={editedAnswer}
                        onChange={e => setEditedAnswer(e.target.value)}
                        rows={4}
                        placeholder="Edit answer"
                      />
                      <label>
                        Category:
                        <select
                          value={editedCategory}
                          onChange={e => setEditedCategory(e.target.value)}
                        >
                          <option value="EventBooking">Event Booking</option>
                          <option value="Product Order">Product Order</option>
                          <option value="Account">Account</option>
                          <option value="Delivery">Delivery</option>
                        </select>
                      </label>
                      <div className="faq-buttons">
                        <button className="save-btn" onClick={handleUpdate}>Save</button>
                        <button className="cancel-btn" onClick={() => setEditing(null)}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="faq-info">
                        <p><strong>Category:</strong> {faq.faqtype}</p>
                        <p><strong>Q:</strong> {faq.question}</p>
                        <p><strong>A:</strong> {faq.answer ? faq.answer : <em>Unanswered</em>}</p>
                      </div>
                      <div className="faq-buttons">
                        <button className="edit-btn" onClick={() => handleEdit(faq)}>Edit</button>
                        <button className="delete-btn" onClick={() => handleDelete(faq._id)}>Delete</button>
                      </div>
                    </>
                  )}
                </div>
              ))
            ) : (
              <p>No FAQs available.</p>
            )}
          </div>
        </main>
      </div>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default AdminFaq;
