import React, { useEffect, useState } from 'react';
import { Link, useLocation ,useNavigate } from 'react-router-dom';
import NurseHeader from '../../Component/NurseHeader';
import Cookies from 'js-cookie';
import axios from 'axios';
import Footer from '../../Component/Footer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ApprovedBooking() {
  const userSession = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
  const nurseId = userSession ? userSession.user.nursingId : "Guest";
  const nursename = userSession.user.username

  const [book, setBook] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/bookingData/${nurseId}`)
      .then((result) => {
        setBook(Array.isArray(result.data) ? result.data : [result.data]);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleApprove = (bookingId) => {

  axios.put(`http://localhost:3000/updatebooking/${bookingId}`, {status: "approve"})
  .then((res) => {
    if (res.data.message === "Status updated successfully") {
      toast.success("Status updated successfully");
      setTimeout(() => navigate('/nurse/ViewBooking'), 3000);
    } else {
      setError("Update failed.");
    }
  }).catch((err) => {
     toast.error("Error while updating status.");
    console.error(err);
  });
};


  const handleInject = (bookingId) => {
    axios.put(`http://localhost:3000/updatebooking/${bookingId}`, {status: "inject" , nursename , nurseId})
  .then((res) => {
    if (res.data.message === "Status updated successfully") {
      toast.success("Status updated successfully");
      setTimeout(() => navigate('/nurse/ViewBooking'), 3000);
    } else {
      setError("Update failed.");
    }
  }).catch((err) => {
     toast.error("Error while updating status.");
    console.error(err);
  });
    setRejectIndex(null);
    setRejectReason('');
  };

  const location = useLocation();
  const getLinkStyle = (path) => {
    const isActive = location.pathname === path;
    return {
      ...navLinkStyle,
      color: isActive ? 'lightcoral' : 'white'
    };
  };

  return (
    <>
      <style>{`
        .dashboard-container {
          min-height: 100vh;
          background-color: #f0f8ff;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          padding-bottom: 40px;
        }

        nav {
          background: linear-gradient(90deg,rgb(0, 77, 64),rgba(0, 68, 193, 0.95));
          padding: 10px 60px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 12px;
          margin: 20px auto;
          max-width: 90%;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
        }

        nav ul {
          display: flex;
          list-style: none;
          gap: 40px;
          padding: 0;
          margin: 0;
          flex-wrap: wrap;
        }

        .booking-table-container {
          margin: 30px auto;
          max-width: 95%;
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          text-align: center;
          min-width: 1000px;
        }

        th, td {
          padding: 12px 15px;
          border: 1px solid #ddd;
        }

        th {
          background-color: #008080;
          color: white;
        }

        tr:nth-child(even) {
          background-color: #f2f2f2;
        }

        .no-booking {
          text-align: center;
          padding: 30px;
          font-size: 18px;
          color: #666;
        }

        .btn {
          padding: 6px 12px;
          margin: 2px;
          border: none;
          border-radius: 5px;
          font-size: 14px;
          cursor: pointer;
          color: white;
        }

        .approve-btn {
          background-color: #2e7d32;
        }

        .reject-btn {
          background-color: #c62828;
        }

        .view-btn {
          background-color: rgba(28, 118, 169, 0.69);
        }

        .reject-form {
          margin-top: 5px;
        }

        .reject-form input {
          padding: 5px;
          margin-right: 5px;
          border-radius: 4px;
          border: 1px solid #ccc;
        }

        .reject-form button {
          background-color: #c62828;
          color: white;
          border: none;
          padding: 5px 10px;
          border-radius: 4px;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          nav ul {
            flex-direction: column;
            gap: 15px;
            text-align: center;
          }

          nav {
            padding: 10px 20px;
          }

          nav ul li a {
            font-size: 15px !important;
          }

          table {
            min-width: unset;
          }
        }

        @media (max-width: 480px) {
          .btn {
            font-size: 12px;
            padding: 5px 10px;
          }

          nav ul li a {
            font-size: 14px !important;
          }

          .reject-form input {
            width: 100%;
            margin-bottom: 5px;
          }
        }
      `}</style>

      <div className="dashboard-container">
        <NurseHeader />

        {/* Navigation Bar */}
        <nav>
          <ul>
            <li><Link to="/nurse/viewSchedul" style={getLinkStyle("/nurse/viewSchedul")}>Schedule Center</Link></li>
                        <li><Link to="/nurse/ViewBooking" style={getLinkStyle("/nurse/ViewBooking")}>Schedule Appointment</Link></li>
                        <li><Link to="/nurse/ApprovedBooking" style={getLinkStyle("/nurse/ApprovedBooking")}>Approved Appointments</Link></li>
                        <li><Link to="/nurse/RejectedBooking" style={getLinkStyle("/nurse/RejectedBooking")}>Rejected Appointments</Link></li>
          </ul>
         
        </nav>

        {/* Booking Table */}
        <div className="booking-table-container">
          {book.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Age</th>
                  <th>Phone</th>
                  <th>Vaccine</th>
                  <th>Dose</th>
                  <th>Health Conditions</th>
                  <th>Allergies</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
             <tbody>
  {book
    .filter((booking) => booking.status === "approve") // only approved
    .map((booking, index) => (
      <tr key={index}>
        <td>{booking.fullname}</td>
        <td>{booking.age}</td>
        <td>{booking.contact}</td>
        <td>{booking.vaccine}</td>
        <td>{booking.dose}</td>
        <td>{booking.healthConditions}</td>
        <td>{booking.allergies}</td>
        <td>{booking.date || "N/A"}</td>
        <td>
          <span style={{
            padding: '10px',
            borderRadius: '20px',
            fontWeight: '600',
            fontSize: '13px',
            color: "#2e7d32",
            backgroundColor: "#d0f0c0",
            textAlign: 'center',
            display: 'inline-block',
            minWidth: '80px'
          }}>
            {booking.status}
          </span>
        </td>
        <td>
          <button className="btn view-btn" onClick={() => handleInject(booking._id)}>Inject 💉</button>
        </td>
      </tr>
  ))}
</tbody>

            </table>
          ) : (
            <div className="no-booking">No bookings found.</div>
          )}
        </div>
      </div>
       <ToastContainer position="top-right" autoClose={3000} />
       <Footer/>
    </>
  );
}

const navLinkStyle = {
  textDecoration: 'none',
  fontWeight: '600',
  fontSize: '17px',
  padding: '10px 15px',
  borderRadius: '5px',
  userSelect: 'none',
  transition: 'color 0.3s ease'
};

export default ApprovedBooking;
