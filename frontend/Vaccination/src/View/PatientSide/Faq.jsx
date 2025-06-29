import React, { useEffect, useState } from 'react';
import PatientHeader from '../../Component/PatientHeader';
import Cookies from 'js-cookie';
import axios from 'axios';
import Footer from "../../Component/Footer"

function Faq() {
  const userSession = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
  const customername = userSession ? userSession.user.username : "Guest";

  const [faqs, setFaqs] = useState([]);
  const [question, setQuestion] = useState("");
  const [category, setCategory] = useState("EventBooking");
  const [searchCategory, setSearchCategory] = useState("All");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [expandedFaq, setExpandedFaq] = useState(null);

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      const response = await axios.get("http://localhost:3000/displayfaq");
      setFaqs(response.data || []);
    } catch (error) {
      setError("Failed to load FAQs.");
    } finally {
      setLoading(false);
    }
  };

  const submitQuestion = async () => {
    try {
      const result = await axios.post("http://localhost:3000/submitfaq", { question, category });
      if (result.data.message === "faqsubmit") {
        setError("FAQ submitted successfully!");
        setTimeout(() => setError(""), 3000);
        setQuestion("");
        setCategory("EventBooking");
        fetchFaqs();
      }
    } catch (err) {
      setError("Failed to submit FAQ. Please try again.");
    }
  };

  return (
    <>
    <div style={{
      minHeight: '100vh',
      fontFamily: 'Segoe UI, sans-serif',
      background: 'linear-gradient(to right, #e6f7ff, #ffffff)',
      paddingBottom: '50px'
    }}>
      <PatientHeader />
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '30px 20px' }}>
        <h1 style={{
          textAlign: 'center',
          color: '#007bff',
          fontWeight: '700',
          marginBottom: '40px'
        }}>
          Frequently Asked Questions
        </h1>

        {/* Submit Section */}
        <div style={{
          background: '#fff',
          padding: '25px',
          borderRadius: '12px',
          boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
          marginBottom: '40px'
        }}>
          <h3 style={{ marginBottom: '20px', color: '#333' }}>Ask a Question</h3>

          <input
            type="text"
            placeholder="Type your question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            style={{
              width: '100%',
              padding: '14px',
              marginBottom: '20px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '15px'
            }}
          />

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '15px',
            marginBottom: '20px'
          }}>
            <label style={{ fontWeight: 'bold' }}>Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                minWidth: '200px',
                fontSize: '15px'
              }}
            >
              <option value="EventBooking">Event Booking</option>
              <option value="Product Order">Product Order</option>
              <option value="Account">Account</option>
              <option value="Delivery">Delivery</option>
            </select>
          </div>

          <button
            onClick={submitQuestion}
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '8px',
              border: 'none',
              backgroundColor: question.trim() ? '#007bff' : '#ccc',
              color: '#fff',
              fontSize: '16px',
              fontWeight: '600',
              cursor: question.trim() ? 'pointer' : 'not-allowed',
              transition: '0.3s ease-in-out'
            }}
            disabled={!question.trim()}
          >
            Submit Question
          </button>
        </div>

        {/* Filter Section */}
        <div style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '15px' }}>
          <label><strong>Filter by Category:</strong></label>
          <select
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              minWidth: '220px',
              fontSize: '15px'
            }}
          >
            <option value="All">All</option>
            <option value="EventBooking">Event Booking</option>
            <option value="Product Order">Product Order</option>
            <option value="Account">Account</option>
            <option value="Delivery">Delivery</option>
          </select>
        </div>

        {/* Error or Success Message */}
        {error && (
          <p style={{
            color: "green",
            textAlign: "center",
            marginBottom: "20px",
            fontWeight: 'bold'
          }}>{error}</p>
        )}

        {/* FAQ List */}
        {loading ? (
          <p style={{ textAlign: "center" }}>Loading FAQs...</p>
        ) : (
          <div>
            <h2 style={{ marginBottom: '20px', color: '#007bff' }}>Past Customer Questions</h2>
            {faqs.filter(faq => (searchCategory === "All" || faq.faqtype === searchCategory) && faq.answer).length === 0 ? (
              <p style={{ textAlign: "center" }}>No FAQs available for this category.</p>
            ) : (
              faqs
                .filter(faq => searchCategory === "All" || faq.faqtype === searchCategory)
                .filter(faq => faq.answer)
                .map(faq => (
                  <div
                    key={faq._id}
                    style={{
                      border: "1px solid #ddd",
                      padding: "18px",
                      marginBottom: "15px",
                      borderRadius: "10px",
                      backgroundColor: "#f9f9f9",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                      cursor: "pointer",
                      transition: "all 0.3s ease-in-out"
                    }}
                    onClick={() => setExpandedFaq(expandedFaq === faq._id ? null : faq._id)}
                  >
                    <p style={{ margin: '0 0 5px 0', fontWeight: '600', color: '#333' }}>
                      📂 {faq.faqtype}
                    </p>
                    <p style={{ margin: '5px 0' }}><strong>Q:</strong> {faq.question}</p>
                    {expandedFaq === faq._id && (
                      <p style={{
                        marginTop: '10px',
                        color: "#444",
                        backgroundColor: "#fff",
                        padding: "12px",
                        borderRadius: "6px",
                        border: "1px dashed #ccc"
                      }}>
                        <strong>Answer:</strong> {faq.answer}
                      </p>
                    )}
                  </div>
                ))
            )}
          </div>
        )}
      </div>
    </div>
     <Footer/>
     </>
  );
}

export default Faq;
