import React, { useEffect, useState } from 'react';
import PatientHeader from '../../Component/PatientHeader';
import Cookies from 'js-cookie';
import axios from 'axios';

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
    <div style={{
      minHeight: '100vh',
      fontFamily: 'Segoe UI, sans-serif',
      backgroundColor: '#e6f7ff',
      paddingBottom: '50px'
    }}>
      <PatientHeader />
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
        <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>
          Frequently Asked Questions
        </h1>

        <div style={{
          background: '#fff',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          marginBottom: '30px'
        }}>
          <input
            type="text"
            placeholder="Type your question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            style={{
              width: '100%',
              padding: '12px',
              marginBottom: '15px',
              borderRadius: '6px',
              border: '1px solid #ccc'
            }}
          />
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <label style={{ fontWeight: 'bold' }}>Select FAQ Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                flexGrow: 1,
                minWidth: '180px'
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
              padding: '12px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: question.trim() ? '#007bff' : '#ccc',
              color: '#fff',
              fontWeight: 'bold',
              cursor: question.trim() ? 'pointer' : 'not-allowed',
              transition: '0.3s'
            }}
            disabled={!question.trim()}
          >
            Submit Question
          </button>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label><strong>Filter by Category:</strong></label>
          <select
            value={searchCategory}
            onChange={(e) => setSearchCategory(e.target.value)}
            style={{
              padding: '10px',
              marginLeft: '10px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              minWidth: '200px'
            }}
          >
            <option value="All">All</option>
            <option value="EventBooking">Event Booking</option>
            <option value="Product Order">Product Order</option>
            <option value="Account">Account</option>
            <option value="Delivery">Delivery</option>
          </select>
        </div>

        {error && <p style={{ color: "green", textAlign: "center", marginBottom: "20px" }}>{error}</p>}
        {loading ? (
          <p style={{ textAlign: "center" }}>Loading FAQs...</p>
        ) : (
          <div>
            <h2 style={{ marginBottom: '20px' }}>Customers' Past FAQs</h2>
            {faqs.filter(faq => (searchCategory === "All" || faq.faqtype === searchCategory) && faq.answer).length === 0 ? (
              <p>No FAQs available.</p>
            ) : (
              faqs
                .filter(faq => searchCategory === "All" || faq.faqtype === searchCategory)
                .filter(faq => faq.answer)
                .map(faq => (
                  <div
                    key={faq._id}
                    style={{
                      border: "1px solid #ddd",
                      padding: "15px",
                      marginBottom: "12px",
                      borderRadius: "8px",
                      backgroundColor: "#ffffff",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                      transition: "0.3s ease-in-out",
                      cursor: "pointer"
                    }}
                    onClick={() => setExpandedFaq(expandedFaq === faq._id ? null : faq._id)}
                  >
                    <p style={{ margin: '0', fontWeight: 'bold' }}>📂 {faq.faqtype}</p>
                    <p style={{ margin: '5px 0' }}><strong>Q:</strong> {faq.question}</p>
                    {expandedFaq === faq._id && (
                      <p style={{ marginTop: '10px', color: "#333" }}><strong>Answer:</strong> {faq.answer}</p>
                    )}
                  </div>
                ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Faq;
