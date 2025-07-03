import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie'; 
import AdminHeader from '../../Component/AdminHeader';
import Sidebar from '../../Component/Sidebar';
import Footer from "../../Component/Footer";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function StaffDahboard() {
  const [user, setUser] = useState([]);
  const [reasonByEmail, setReasonByEmail] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/nursedeatiles")
      .then((result) => { 
        setUser(result.data);
        setSearchResults(result.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults(user);
    } else {
      const query = searchQuery.toLowerCase();
      const filteredUsers = user.filter(u => 
        u.username.toLowerCase().includes(query) || 
        u.email.toLowerCase().includes(query) || 
        u.address.toLowerCase().includes(query) ||
        u.phone.toLowerCase().includes(query)
      );
      setSearchResults(filteredUsers);
    }
  }, [user, searchQuery]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const deleteUser = (email, e) => {
    e.preventDefault();

    const reason = reasonByEmail[email];
    if (!reason || reason.trim() === "") {
      toast.error("Please enter a reason to delete the user.");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      axios.post("http://localhost:3000/deletenurse", { email, reason })
        .then(() => {
          setUser(prevUsers => prevUsers.filter(u => u.email !== email));
          setReasonByEmail(prev => {
            const copy = {...prev};
            delete copy[email];
            return copy;
          });
          toast.success("User deleted successfully.");
        })
        .catch((err) => {
          console.error("Delete Error:", err);
          toast.error("Failed to delete user.");
        });
    }
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

        .admin-dashboard-nav {
          background: #f44336;
          padding: 10px 20px;
          border-radius: 5px;
          margin-bottom: 20px;
        }

        .admin-dashboard-nav-list {
          list-style: none;
          display: flex;
          gap: 20px;
          margin: 0;
          padding: 0;
        }

        .admin-dashboard-nav-list li a {
          color: #fff;
          text-decoration: none;
          font-weight: bold;
        }

        input[type="text"] {
          width: 100%;
          max-width: 400px;
          padding: 10px;
          margin-bottom: 20px;
          border-radius: 5px;
          border: 1px solid #ccc;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          background: white;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          overflow: hidden;
        }

        th, td {
          padding: 12px;
          text-align: center;
          border: 1px solid #ddd;
        }

        th {
          background: #333;
          color: #fff;
        }

        button {
          padding: 6px 12px;
          border: none;
          border-radius: 5px;
          color: white;
          cursor: pointer;
        }

        button[type="submit"] {
          background-color: #dc3545;
        }

        button.view-btn {
          background-color: #007bff;
        }

        @media screen and (max-width: 768px) {
          .admin-dashboard-container {
            flex-direction: column;
          }

          table, thead, tbody, th, td, tr {
            display: block;
          }

          thead {
            display: none;
          }

          td {
            padding-left: 50%;
            position: relative;
            text-align: left;
          }

          td::before {
            position: absolute;
            top: 10px;
            left: 10px;
            font-weight: bold;
            white-space: nowrap;
          }

          td:nth-child(1)::before { content: "Name"; }
          td:nth-child(2)::before { content: "Nurse ID"; }
          td:nth-child(3)::before { content: "Email"; }
          td:nth-child(4)::before { content: "Phone Number"; }
          td:nth-child(5)::before { content: "View"; }
          td:nth-child(6)::before { content: "Reason"; }
        }
      `}</style>

      <AdminHeader />

      <div className="admin-dashboard-container">
        <Sidebar />

        <main className="admin-dashboard-main">
          <nav className="admin-dashboard-nav">
            <ul className="admin-dashboard-nav-list">
              <li><Link to="/admin/StaffDahboard">Current Staff</Link></li>
              <li><Link to="/admin/DeleteStaff">Delete Staff</Link></li>
            </ul>
          </nav>

          <h1>Current Staff</h1>

          <input
            type="text"
            placeholder="Search by name, email, address, or phone..."
            value={searchQuery}
            onChange={handleSearch}
          />

          <h2>Total number of Staff: {searchResults.length}</h2>

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Nurse ID</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>View Details</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((ob) => (
                <tr key={ob.email}>
                  <td>{ob.username}</td>
                  <td>{ob.nursingId}</td>
                  <td>{ob.email}</td>
                  <td>{ob.phone}</td>
                  <td>
                    <button
                      className="view-btn"
                      onClick={() => alert(`Viewing details for ${ob.username}`)}
                    >
                      View
                    </button>
                  </td>
                  <td>
                    <form onSubmit={(e) => deleteUser(ob.email, e)}>
                      <input
                        type="text"
                        name="reason"
                        value={reasonByEmail[ob.email] || ''}
                        onChange={(e) => setReasonByEmail(prev => ({ ...prev, [ob.email]: e.target.value }))}
                        placeholder="Reason"
                      />
                      <button type="submit">Delete</button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
      <Footer />
    </>
  );
}

export default StaffDahboard;
