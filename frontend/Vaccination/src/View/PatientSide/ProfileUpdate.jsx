import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NormalHeader from '../../Component/NormalHeader';
import Footer from "../../Component/Footer";

const ProfileUpdate = () => {
  const userSession = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;

  const originalData = {
    username: userSession?.user?.username || "",
    address: userSession?.user?.address || "",
    phone: userSession?.user?.phone || ""
  };

  const [username, setUsername] = useState(originalData.username);
  const [email] = useState(userSession?.user?.email || "");
  const [address, setAddress] = useState(originalData.address);
  const [phone, setPhone] = useState(originalData.phone);

  const navigate = useNavigate();

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!username || username.length < 3) {
      toast.error("Username must be at least 3 characters");
      return;
    }

    const realPhone = /^(?:\+94|0)(7[01245678]\d{7})$/;
    if (!realPhone.test(phone)) {
      toast.error("Invalid phone number");
      return;
    }

    axios.post("http://localhost:3000/updateprofile", { username, phone, address, email })
      .then((result) => {
        const { message, newprofile } = result.data;
        if (message === "Updated successfully") {
          Cookies.remove("user");
          const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000;
          Cookies.set("user", JSON.stringify({ user: newprofile, expirationTime }), { expires: 1 });
          toast.success("Profile updated successfully");
          setTimeout(() => navigate('/patient/ProfilePage'), 3000);
        }
      })
      .catch((err) => {
        console.error("Update Error:", err);
        toast.error("Update failed. Try again.");
      });
  };

  return (
    <>
      <NormalHeader />
      <style>{`
        .update-container {
          background: linear-gradient(to right, #e0f7fa, #e1f5fe);
          min-height: 100vh;
          padding: 40px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .update-card {
          background: #ffffff;
          padding: 30px;
          border-radius: 15px;
          max-width: 500px;
          width: 100%;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .form-group {
          margin-bottom: 20px;
        }

        label {
          display: block;
          font-weight: 600;
          margin-bottom: 8px;
        }

        input[type="text"],
        input[type="file"] {
          width: 100%;
          padding: 10px;
          border-radius: 8px;
          border: 1px solid #ccc;
        }

        .readonly-field {
          padding: 10px;
          background: #f5f5f5;
          border-radius: 8px;
        }

        .alert-text {
          color: #e65100;
          font-size: 13px;
        }

        .update-button {
          background-color: #2196f3;
          color: white;
          padding: 12px;
          border: none;
          width: 100%;
          font-size: 16px;
          font-weight: bold;
          border-radius: 8px;
          cursor: pointer;
          margin-top: 10px;
        }

        .update-button:hover {
          background-color: #1976d2;
        }

        .update-button:disabled {
          background-color: #90caf9;
          cursor: not-allowed;
          opacity: 0.8;
        }

        @media (max-width: 600px) {
          .update-card {
            padding: 20px;
          }

          input, .readonly-field {
            font-size: 15px;
          }

          label {
            font-size: 15px;
          }

          .update-button {
            font-size: 15px;
          }
        }
      `}</style>

      <div className="update-container">
        <div className="update-card">
          <h2 style={{ textAlign: 'center', marginBottom: '25px' }}>Update Profile</h2>
          <form onSubmit={handleUpdate}>
            <div className="form-group">
              <label>Name:</label>
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            </div>

            <div className="form-group">
              <label>Email:</label>
              <div className="readonly-field">{email}</div>
            </div>

            <div className="form-group">
              <label>Address:</label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
            </div>

            <div className="form-group">
              <label>Phone:</label>
              <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>

            <div className="form-group">
              <label>Add Your Profile Image:</label>
              <input type="file" name="file" />
            </div>

            <button
              type="submit"
              className="update-button"
              disabled={
                username === originalData.username &&
                address === originalData.address &&
                phone === originalData.phone
              }
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
      <Footer />
    </>
  );
};

export default ProfileUpdate;
