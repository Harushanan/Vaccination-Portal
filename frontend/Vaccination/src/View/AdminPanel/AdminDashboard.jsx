import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie'; 
import AdminHeader from '../../Component/AdminHeader';
import Sidebar from '../../Component/Sidebar';

function AdminDashboard() {
  const [user, setUser] = useState([]);
  const [reasonByEmail, setReasonByEmail] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const navigate = useNavigate();

  const userSession = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
  const customername = userSession ? userSession.user.username : "Guest";

  useEffect(() => {
    axios.get("http://localhost:3000/studentdeatiles")
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
      alert("Please enter a reason to delete the user.");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      axios.post("http://localhost:3000/deleteuser", { email, reason })
        .then(() => {
          setUser(prevUsers => prevUsers.filter(u => u.email !== email));
          setReasonByEmail(prev => {
            const copy = {...prev};
            delete copy[email];
            return copy;
          });
        })
        .catch((err) => {
          console.error("Delete Error:", err);
        });
    }
  };

  const addAdmin = (email) => {
    const confirmAddAdmin = window.confirm("Are you sure you want to add this account as an admin?");
    if (confirmAddAdmin) {
      axios.post("http://localhost:3000/addAdmin", { email })
        .then(() => {
          alert(`${email} has been added as an admin.`);
        })
        .catch((err) => {
          console.error("Error:", err);
        });
    }
  };

  const logout = () => {
    const logoutConfirm = window.confirm("Are you sure you want to logout this account?");
    if (logoutConfirm) {
      Cookies.remove("user");
      navigate('/');
    }
  };

  // Inline style helper for sidebar links with hover effect using React state
  const [hoveredLink, setHoveredLink] = useState(null);
  const sidebarLinkStyle = (isHovered) => ({
    color: isHovered ? '#00e5ff' : 'white',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '17px',
    padding: '10px 15px',
    borderRadius: '5px',
    transition: 'background-color 0.3s, color 0.3s',
    display: 'block',
    userSelect: 'none',
    backgroundColor: isHovered ? '#00796b' : 'transparent',
    cursor: 'pointer'
  });

  const navLinkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '17px',
    padding: '10px 15px',
    borderRadius: '5px',
    userSelect: 'none',
  };

  return (
    <>
      {/* Header */}
      <AdminHeader/>

      {/* Main container */}
      <div style={{
        display: 'flex',
        minHeight: '90vh',
        backgroundColor: '#e6f7ff',
      }}>
        {/* Sidebar */}
        <Sidebar/>

        {/* Main content */}
        <main
          style={{
            flex: 1,
            overflowX: 'auto',
            padding: '20px 40px',
            fontFamily: 'Segoe UI, sans-serif',
          }}
        >
          {/* Inner Nav */}
          <nav style={{
            background: 'linear-gradient(90deg,rgb(0, 77, 64),rgba(0, 68, 193, 0.95))',
            padding: '10px 60px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '12px',
            margin: '20px auto',
            maxWidth: '90%',
            boxShadow: '0 6px 16px rgba(0, 0, 0, 0.4)',
            fontFamily: 'Segoe UI, sans-serif'
          }}>
            <ul style={{
              display: 'flex',
              listStyle: 'none',
              gap: '40px',
              padding: 0,
              margin: 0
            }}>
              <li><Link to="" style={navLinkStyle}>Admin</Link></li>
              <li><Link to="/adminDashboard" style={navLinkStyle}>Current Customers</Link></li>
              <li><Link to="/delete-user" style={navLinkStyle}>Past Customers</Link></li>
            </ul>
          </nav>

          <h1 style={{ marginBottom: '10px' }}>Current Customers</h1>

          <div style={{ marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="Search by name, email, address, or phone..."
              value={searchQuery}
              onChange={handleSearch}
              style={{
                width: '300px',
                padding: '10px',
                fontSize: '16px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
              }}
            />
          </div>

          <h2 style={{ marginBottom: '20px' }}>
            Total number of customers: {searchResults.length}
          </h2>

          <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <thead style={{ backgroundColor: '#f4f4f4', color: '#333' }}>
              <tr>
                <th style={tableHeaderStyle}>Name</th>
                <th style={tableHeaderStyle}>Email</th>
                <th style={tableHeaderStyle}>Address</th>
                <th style={tableHeaderStyle}>Phone Number</th>
                <th style={{ ...tableHeaderStyle, textAlign: 'center' }}>View Details</th>
                <th style={tableHeaderStyle}>Reason</th>
              </tr>
            </thead>
            <tbody>
              {searchResults.map((ob, index) => (
                <tr key={ob.email} style={{ backgroundColor: index % 2 === 0 ? '#fafafa' : '#fff' }}>
                  <td style={tableCellStyle}>{ob.username}</td>
                  <td style={tableCellStyle}>{ob.email}</td>
                  <td style={tableCellStyle}>{ob.address}</td>
                  <td style={tableCellStyle}>{ob.phone}</td>
                  <td style={{ ...tableCellStyle, textAlign: 'center' }}>
                    <button
                      style={{
                        padding: '10px 20px',
                        backgroundColor: '#4CAF50',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s'
                      }}
                      onClick={() => alert(`Viewing details for ${ob.username}`)}
                    >
                      View
                    </button>
                  </td>
                  <td style={tableCellStyle}>
                    <form style={{ display: 'flex', alignItems: 'center' }} onSubmit={(e) => deleteUser(ob.email, e)}>
                      <input
                        type="text"
                        name="reason"
                        value={reasonByEmail[ob.email] || ''}
                        onChange={(e) => setReasonByEmail(prev => ({ ...prev, [ob.email]: e.target.value }))}
                        placeholder="Reason"
                        style={{ padding: '8px', width: '70%', borderRadius: '4px', border: '1px solid #ccc', marginRight: '10px' }}
                      />
                      <button
                        type="submit"
                        style={{ padding: '8px 15px', backgroundColor: '#f44336', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s' }}
                      >
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </>
  );
}

const tableHeaderStyle = {
  padding: '15px',
  border: '1px solid #ddd',
  textAlign: 'left',
  userSelect: 'none',
};

const tableCellStyle = {
  padding: '12px',
  border: '1px solid #ddd',
};

export default AdminDashboard;
