import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import Cookies from 'js-cookie'; 
import userprofile from '../../assets/images/userimge.png';

function AdminDashboard() {
  const [user, setUser] = useState([]);
  const [reasonByEmail, setReasonByEmail] = useState({}); // store reason per user email
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const navigate = useNavigate();

  const userSession = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
  const customername = userSession ? userSession.user.username : "Guest";

  useEffect(() => {
    // Fetch users on component mount only
    axios.get("http://localhost:3000/studentdeatiles")
      .then((result) => { 
        setUser(result.data);
        setSearchResults(result.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Update searchResults when user list changes and search query exists
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
    e.preventDefault();  // Prevent form submission reload

    const reason = reasonByEmail[email];
    if (!reason || reason.trim() === "") {
      alert("Please enter a reason to delete the user.");
      return;
    }

    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (confirmDelete) {
      axios.post("http://localhost:3000/deleteuser", { email, reason })
        .then((result) => {
          console.log("Response from server:", result);
          // Optionally refresh user list after deletion
          setUser(prevUsers => prevUsers.filter(u => u.email !== email));
          // Clear reason for that email
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
        .then((result) => {
          console.log("Response from server:", result);
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

  return (
    <>
      <div style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', backgroundColor: '#e6f7ff' }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(90deg, #004d40, #00acc1)',
          padding: '20px 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          boxShadow: '0 6px 15px rgba(0, 0, 0, 0.4)',
          borderBottom: '3px solid #fff'
        }}>
          {/* Brand */}
          <a href="#" style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: 'white',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            transition: 'transform 0.3s ease',
          }}
            onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
            onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}>
            💉 <span style={{ margin: '0 8px' }}>VaxCare</span> <span style={{ color: '#f44336' }}>+</span> ❤️
          </a>

          {/* Navigation Links */}
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link to="/booking" style={{ color: 'white', fontSize: '18px', textDecoration: 'none' }}>Booking</Link>
            <Link to="/faq" style={{ color: 'white', fontSize: '18px', textDecoration: 'none' }}>FAQ</Link>
            <Link to="/about" style={{ color: 'white', fontSize: '18px', textDecoration: 'none' }}>About Us</Link>
          </div>

          {/* Profile and Dropdown */}
          <div style={{ display: "flex", alignItems: "center", cursor: "pointer", position: "relative" }} onClick={() => setDropdownVisible(!dropdownVisible)}>
            <img src={userprofile} alt="User" style={{ width: "60px", height: "60px", borderRadius: "50%", border: "3px solid aqua", marginRight: "10px" }} />
            <h2 style={{ color: 'white' }}><b>Admin</b></h2>
            <span style={{ fontSize: "24px", marginLeft: "10px", color: "black" }}>☰</span>

            {dropdownVisible && (
              <div style={{
                position: "absolute",
                top: "70px",
                right: 0,
                backgroundColor: "white",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
                width: "150px",
                borderRadius: "5px",
                textAlign: "left",
                zIndex: 10
              }}>
                <Link to='/profile' style={{ display: "block", padding: "10px", textDecoration: "none", color: "black" }}>View Profile</Link>
                <a onClick={logout} style={{ display: "block", padding: "10px", textDecoration: "none", color: "black", cursor: "pointer" }}>Logout</a>
              </div>
            )}
          </div>
        </div>

        <h1 style={{ textAlign: 'center', marginTop: '20px' }}>Current customers</h1>

        <nav style={{ backgroundColor: 'rgb(0, 0, 0)', padding: '10px', display: 'inline-block', margin: '10px auto' }}>
          <ul style={{ listStyleType: 'none', padding: '0', margin: '0', textAlign: 'center' }}>
            <li style={{ display: 'inline', marginRight: '20px' }}><Link to="" style={{ textDecoration: 'none', color: 'rgb(0, 255, 255)' }}>Admin</Link></li>
            <li style={{ display: 'inline', marginRight: '20px' }}><Link to="/adminDashboard" style={{ textDecoration: 'none', color: 'rgb(0, 255, 255)' }}>Current customers</Link></li>
            <li style={{ display: 'inline' }}><Link to="/delet-user" style={{ textDecoration: 'none', color: 'rgb(0, 255, 255)' }}>Past customers</Link></li>
          </ul>
        </nav>

        <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
          <input
            type="text"
            placeholder="Search....."
            value={searchQuery}
            onChange={handleSearch}
            style={{ width: '300px', padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc', marginRight: '10px' }}
          />
        </div>

        <h2 style={{ textAlign: 'center' }}>Total number of customers: {searchResults.length}</h2>

        <table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginTop: '20px' }}>
          <thead style={{ backgroundColor: '#f4f4f4', color: '#333' }}>
            <tr>
              <th style={{ padding: '15px', border: '1px solid #ddd', textAlign: 'left' }}>Name</th>
              <th style={{ padding: '15px', border: '1px solid #ddd', textAlign: 'left' }}>Email</th>
              <th style={{ padding: '15px', border: '1px solid #ddd', textAlign: 'left' }}>Address</th>
              <th style={{ padding: '15px', border: '1px solid #ddd', textAlign: 'left' }}>Phone Number</th>
              <th style={{ padding: '15px', border: '1px solid #ddd', textAlign: 'left' }}>Number of Photoshoots</th>
              <th style={{ padding: '15px', border: '1px solid #ddd', textAlign: 'left' }}>Number of Orders</th>
              <th style={{ padding: '15px', border: '1px solid #ddd', textAlign: 'center' }}>View Details</th>
              <th style={{ padding: '15px', border: '1px solid #ddd', textAlign: 'left' }}>Reason</th>
              <th style={{ padding: '15px', border: '1px solid #ddd', textAlign: 'left' }}>Add Admin</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((ob, index) => (
              <tr key={ob.email} style={{ backgroundColor: index % 2 === 0 ? '#fafafa' : '#fff' }}>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{ob.username}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{ob.email}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{ob.address}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>{ob.phone}</td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>10</td>
                <td style={{ padding: '12px', border: '1px solid #ddd' }}>12</td>
                <td style={{ textAlign: 'center' }}>
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
                  >
                    View
                  </button>
                </td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  <form style={{ display: 'flex', alignItems: 'center' }} onSubmit={(e) => deleteUser(ob.email, e)}>
                    <input
                      type="text"
                      name="reason"
                      value={reasonByEmail[ob.email] || ''}
                      onChange={(e) => setReasonByEmail(prev => ({ ...prev, [ob.email]: e.target.value }))}
                      required
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
                <td style={{ textAlign: 'center' }}>
                  <button
                    onClick={() => addAdmin(ob.email)}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#4CAF50',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s'
                    }}
                  >
                    Add Admin
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AdminDashboard;
