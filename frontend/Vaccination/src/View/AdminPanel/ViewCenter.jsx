import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import AdminHeader from '../../Component/AdminHeader';
import Sidebar from '../../Component/Sidebar';
import Footer from "../../Component/Footer";
import axios from 'axios';
import hospital from "../../assets/images/hospital.png";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ViewCenter() {
  const [centers, setCenters] = useState([]);
  const [reasonByEmail, setReasonByEmail] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:3000/displaycenter")
      .then((result) => {
        setCenters(result.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const deleteUser = async (email, e) => {
    e.preventDefault();
    const reason = reasonByEmail[email];
    if (!reason || reason.trim() === "") {
      toast.error("Please provide a reason to delete the center.");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this center?")) return;

    try {
      await axios.post("http://localhost:3000/deletecenter", { email, reason });
      toast.success("Center deleted successfully");
      setCenters(prev => prev.filter(center => center.email !== email));
      setReasonByEmail(prev => {
        const copy = {...prev};
        delete copy[email];
        return copy;
      });
    } catch (err) {
      console.error("Delete failed:", err);
      toast.error("Error deleting center");
    }
  };

  const handleEdit = (center) => {
    const id = center._id;
    navigate(`/admin/ViewCenter/${id}`);
  };

  return (
    <>
      <style>{`
        .admin-container {
          display: flex;
          min-height: 100vh;
          background: #f4f7f9;
        }
        main {
          flex: 1;
          padding: 20px 30px;
          overflow-y: auto;
        }
        nav ul {
          list-style: none;
          display: flex;
          gap: 20px;
          margin-bottom: 25px;
          padding: 0;
          background: #d32f2f;
          border-radius: 8px;
          max-width: 400px;
        }
        nav ul li a {
          color: white;
          text-decoration: none;
          font-weight: 600;
          padding: 10px 15px;
          display: block;
        }
        nav ul li a:hover {
          background: #b71c1c;
          border-radius: 8px;
        }
        h1 {
          text-align: center;
          margin-bottom: 30px;
          color: #333;
        }
        .center-card {
          background: white;
          box-shadow: 0 2px 8px rgb(0 0 0 / 0.1);
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 25px;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 20px;
        }
        .center-card img {
          width: 120px;
          height: 120px;
          object-fit: contain;
          border-radius: 10px;
          background: #eee;
          flex-shrink: 0;
        }
        .center-details {
          flex: 1 1 300px;
          min-width: 250px;
        }
        .center-details h2 {
          margin: 0 0 8px 0;
          color: #222;
        }
        .center-details p {
          margin: 4px 0;
          color: #555;
          font-size: 0.95rem;
        }
        .nurse-status {
          font-weight: 700;
          margin-top: 10px;
          display: inline-block;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.9rem;
        }
        .nurse-assigned {
          background-color: #4caf50;
          color: white;
        }
        .nurse-not-assigned {
          background-color: #e53935;
          color: white;
        }
        .actions {
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
          min-width: 160px;
        }
        .actions button,
        .actions input[type="text"] {
          width: 100%;
          font-size: 1rem;
          padding: 8px 10px;
          border-radius: 8px;
          border: 1px solid #ccc;
          box-sizing: border-box;
        }
        .actions input[type="text"] {
          border-color: #ddd;
          transition: border-color 0.3s ease;
        }
        .actions input[type="text"]:focus {
          border-color: #d32f2f;
          outline: none;
        }
        .actions button {
          background-color: #d32f2f;
          color: white;
          border: none;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }
        .actions button:hover {
          background-color: #b71c1c;
        }
        @media (max-width: 768px) {
          .center-card {
            flex-direction: column;
            align-items: flex-start;
          }
          .center-card img {
            width: 100%;
            height: auto;
          }
          .actions {
            width: 100%;
            flex-direction: row;
            gap: 10px;
          }
          .actions button,
          .actions input[type="text"] {
            width: auto;
            flex: 1;
          }
        }
      `}</style>

      <AdminHeader />

      <div className="admin-container">
        <Sidebar />

        <main>
          <nav>
            <ul>
              <li><Link to="/admin/AddCenter">Add Center</Link></li>
              <li><Link to="/admin/ViewCenter">View Center</Link></li>
            </ul>
          </nav>

          <h1>Vaccination Centers</h1>

          {centers.length === 0 && (
            <p style={{ textAlign: 'center', color: '#666' }}>No centers found.</p>
          )}

          {centers.map(center => (
            <div className="center-card" key={center._id}>
              <img src={hospital} alt={center.center} />

              <div className="center-details">
                <h2>{center.center}</h2>
                <p><strong>Email:</strong> {center.email}</p>
                <p><strong>Phone:</strong> {center.phone}</p>
                <p><strong>Address:</strong> {center.address}</p>
                {center.nurse === "Not Assign" ? (
                  <span className="nurse-status nurse-not-assigned">Nurse Not Assigned</span>
                ) : (
                  <span className="nurse-status nurse-assigned">Nurse Assigned: {center.nurse}</span>
                )}
              </div>

              <div className="actions">
                <button onClick={() => handleEdit(center)}>Edit</button>
                <form onSubmit={(e) => deleteUser(center.email, e)}>
                  <input
                    type="text"
                    placeholder="Reason"
                    value={reasonByEmail[center.email] || ''}
                    onChange={(e) =>
                      setReasonByEmail(prev => ({ ...prev, [center.email]: e.target.value }))
                    }
                  />
                  <button type="submit">Delete</button>
                </form>
              </div>
            </div>
          ))}
        </main>
      </div>

      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default ViewCenter;
