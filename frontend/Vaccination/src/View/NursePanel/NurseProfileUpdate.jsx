import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NormalHeader from '../../Component/NormalHeader';
import Footer from "../../Component/Footer";

const NurseProfileUpdate = () => {
  const userSession = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;

  console.log("Current User : ", userSession?.user);

  const originalData = {
    username: userSession?.user?.username || "",
    nursingId: userSession?.user?.nursingId || "",
    phone: userSession?.user?.phone || "",
    imageUrl: userSession?.user?.Image || ""
  };

  const [username] = useState(originalData.username);
  const [email] = useState(userSession?.user?.email || "");
  const [nursingId] = useState(originalData.nursingId);
  const [phone, setPhone] = useState(originalData.phone);
  const [imageUrl, setImageUrl] = useState(originalData.imageUrl);
  const [hasChanges, setHasChanges] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Check if either phone or image has changed
    if (phone !== originalData.phone || imageUrl !== originalData.imageUrl) {
      setHasChanges(true);
    } else {
      setHasChanges(false);
    }
  }, [phone, imageUrl]);

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "project_image_upload");
    formData.append("cloud_name", "duz9iteev");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/duz9iteev/image/upload", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      setImageUrl(data.url);
      toast.success("Image uploaded");
    } catch (error) {
      console.error("Cloudinary upload error", error);
      toast.error("Image upload failed");
    }
  };

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

    if (!imageUrl) {
      toast.error("Please upload a profile image");
      return;
    }

    axios.put("http://localhost:3000/nurseupdateprofile", {
      nursingId,
      phone,
      Image: imageUrl
    })
      .then((result) => {
        const { message, newprofile } = result.data;
        if (message === "Updated successfully") {
          Cookies.remove("user");
          const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000;
          Cookies.set("user", JSON.stringify({ user: newprofile, expirationTime }), { expires: 1 });
          toast.success("Profile updated successfully");
          setTimeout(() => navigate('/nurse/NurseProfile'), 3000);
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
      `}</style>

      <div className="update-container">
        <div className="update-card">
          <h2 style={{ textAlign: 'center', marginBottom: '25px' }}>Update Profile</h2>
          <form onSubmit={handleUpdate}>
            <div className="form-group">
              <label>Name:</label>
              <div className="readonly-field">{username}</div>
            </div>

            <div className="form-group">
              <label>Email:</label>
              <div className="readonly-field">{email}</div>
            </div>

            <div className="form-group">
              <label>Nurse ID:</label>
              <div className="readonly-field">{nursingId}</div>
            </div>

            <div className="form-group">
              <label>Phone:</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Upload Profile Image:</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleUpload(e.target.files[0])}
              />
            </div>

            <button
              type="submit"
              className="update-button"
              disabled={!hasChanges}
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

export default NurseProfileUpdate;
