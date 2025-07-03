import React, { useEffect, useState } from "react";
import axios from "axios";
import NormalHeader from "../NormalHeader";
import Footer from "../Footer";
import { FaSyringe, FaCalendarCheck, FaInfoCircle, FaExclamationTriangle, FaQuestionCircle } from "react-icons/fa";

function ViewAllFaq() {
  const [faqs, setFaqs] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchCategory, setSearchCategory] = useState("All");
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

  // Icon mapping for Vaccination portal categories
  const categoryIcons = {
    "All": <FaQuestionCircle style={{ color: "#555" }} />,
    "Vaccine Info": <FaSyringe style={{ color: "#2a9d8f" }} />,
    "Appointment": <FaCalendarCheck style={{ color: "#e76f51" }} />,
    "Side Effects": <FaExclamationTriangle style={{ color: "#f4a261" }} />,
    "General": <FaInfoCircle style={{ color: "#264653" }} />,
  };

  const categories = ["All", "Vaccine Info", "Appointment", "Side Effects", "General"];

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }
        body, html, #root {
          height: 100%;
          margin: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f0f4f8;
          color: #333;
        }
        .container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        main {
          flex: 1;
          padding: 20px;
          max-width: 900px;
          margin: 0 auto;
          width: 95%;
        }
        .filter-wrapper {
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        label {
          font-weight: 600;
          font-size: 1.1rem;
          color: #264653;
        }
        select {
          padding: 8px 12px;
          border-radius: 6px;
          border: 1px solid #ccc;
          font-size: 1rem;
          cursor: pointer;
          background-color: white;
          transition: border-color 0.3s ease;
        }
        select:hover, select:focus {
          border-color: #2a9d8f;
          outline: none;
        }
        h2 {
          color: #2a9d8f;
          margin-bottom: 15px;
          text-align: center;
          font-weight: 700;
        }
        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .faq-item {
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgb(0 0 0 / 0.1);
          padding: 15px 20px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          border-left: 5px solid transparent;
        }
        .faq-item:hover {
          background-color: #e6f2f1;
          border-left-color: #2a9d8f;
        }
        .faq-header {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 600;
          color: #264653;
          user-select: none;
        }
        .faq-question {
          margin: 5px 0 10px 30px;
          font-size: 1rem;
          color: #264653;
        }
        .faq-answer {
          margin-left: 30px;
          color: #555;
          font-size: 0.95rem;
          line-height: 1.4;
          animation: fadeIn 0.4s ease forwards;
        }
        @keyframes fadeIn {
          from {opacity: 0;}
          to {opacity: 1;}
        }
        .error-msg {
          color: #e63946;
          font-weight: 600;
          text-align: center;
          margin-top: 20px;
        }
        .loading-msg {
          color: #555;
          font-style: italic;
          text-align: center;
          margin-top: 20px;
        }
        /* Footer style */
        footer {
          background-color: #264653;
          color: white;
          text-align: center;
          padding: 15px 10px;
          font-size: 0.9rem;
          flex-shrink: 0;
        }

        /* Responsive */
        @media (max-width: 600px) {
          .faq-question, .faq-answer {
            margin-left: 20px;
          }
          .faq-header {
            font-size: 0.9rem;
            gap: 8px;
          }
          main {
            padding: 15px 10px;
          }
        }
      `}</style>

      <div className="container">
        <NormalHeader />

        <main>
          <div className="filter-wrapper" aria-label="Filter FAQs by category">
            <label htmlFor="category-select">Filter by Category:</label>
            <select
              id="category-select"
              value={searchCategory}
              onChange={(e) => setSearchCategory(e.target.value)}
              aria-controls="faq-list"
              aria-haspopup="listbox"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <span aria-hidden="true" style={{ marginLeft: "auto", fontSize: "1.2rem" }}>
              {categoryIcons[searchCategory]}
            </span>
          </div>

          {error && <p className="error-msg" role="alert">{error}</p>}

          {loading ? (
            <p className="loading-msg" aria-live="polite">Loading FAQs...</p>
          ) : (
            <>
              <h2>Past Customer Questions</h2>

              <div className="faq-list" id="faq-list" role="list">
                {faqs.filter(faq => (searchCategory === "All" || faq.faqtype === searchCategory) && faq.answer).length === 0 ? (
                  <p>No FAQs available for this category.</p>
                ) : (
                  faqs
                    .filter(faq => searchCategory === "All" || faq.faqtype === searchCategory)
                    .filter(faq => faq.answer)
                    .map(faq => (
                      <div
                        key={faq._id}
                        className="faq-item"
                        role="listitem"
                        tabIndex={0}
                        aria-expanded={expandedFaq === faq._id}
                        aria-controls={`faq-answer-${faq._id}`}
                        onClick={() => setExpandedFaq(expandedFaq === faq._id ? null : faq._id)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            setExpandedFaq(expandedFaq === faq._id ? null : faq._id);
                          }
                        }}
                      >
                        <div className="faq-header">
                          <span style={{ fontWeight: "bold", color: "#2a9d8f" }}>
                            {categoryIcons[faq.faqtype] || <FaQuestionCircle />}
                          </span>
                          <span>{faq.faqtype}</span>
                        </div>
                        <p className="faq-question"><strong>Q:</strong> {faq.question}</p>
                        {expandedFaq === faq._id && (
                          <p className="faq-answer" id={`faq-answer-${faq._id}`}>
                            <strong>Answer:</strong> {faq.answer}
                          </p>
                        )}
                      </div>
                    ))
                )}
              </div>
            </>
          )}
        </main>

        <Footer />
      </div>
    </>
  );
}

export default ViewAllFaq;
