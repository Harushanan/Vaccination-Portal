import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import AdminHeader from '../../Component/AdminHeader';
import Sidebar from '../../Component/Sidebar';
import Footer from "../../Component/Footer";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddVaccin() {
  const [Name, setName] = useState('');
  const [Type, setType] = useState('');
  const [Slots, setSlots] = useState('');
  const [Age, setAge] = useState('');
  const [Doses, setDoses] = useState('');
  const [Manufacturer, setManufacturer] = useState('');
  const [Instructions, setInstructions] = useState('');
  const [imageUrl, setImageUrl] = useState()


  const navigate = useNavigate();

  const handleUpload = async (file) => {

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "project_image_upload");
    formData.append("cloud_name","duz9iteev") 
    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/duz9iteev/image/upload", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      console.log(data)
      setImageUrl(data.url);
      toast.success("Image uploaded");
    } catch (error) {
      console.error("Cloudinary upload error", error);
      toast.error("Image upload failed");
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      Name, Type, Slots, Age, Doses, Manufacturer, Instructions ,imageUrl
    };

    try {
      const result = await axios.post("http://localhost:3000/addvaccine", payload);

      if (result.data.message === "Vaccine added successfully") {
        toast.success("Vaccine added successfully!");
        setTimeout(() => navigate('/admin/ViewVaccin'), 3000);
      } else {
        toast.error("Failed to add vaccine.");
      }
    } catch (err) {
      console.error("Add vaccine error:", err);
      toast.error("Error while adding vaccine. Please try again.");
    }
  };

  return (
    <>
      <style>{`
        .admin-container {
          display: flex;
          min-height: 100vh;
          background: #f5f5f5;
        }

        .admin-main {
          flex: 1;
          padding: 20px;
        }

        .nav-links {
          background-color: #f44336;
          padding: 10px 20px;
          border-radius: 5px;
          margin-bottom: 20px;
        }

        .nav-links ul {
          list-style: none;
          display: flex;
          gap: 20px;
          margin: 0;
          padding: 0;
        }

        .nav-links li a {
          color: white;
          text-decoration: none;
          font-weight: bold;
        }

        form {
          background: #fff;
          padding: 20px;
          border-radius: 10px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          max-width: 700px;
          margin: auto;
        }

        label {
          display: block;
          margin-bottom: 15px;
          font-weight: 600;
        }

        input, select, textarea {
          width: 100%;
          padding: 10px;
          margin-top: 5px;
          border-radius: 5px;
          border: 1px solid #ccc;
          box-sizing: border-box;
        }

        button[type="submit"] {
          background-color: #4CAF50;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
          margin-top: 10px;
        }

        button:hover {
          background-color: #45a049;
        }

        @media (max-width: 768px) {
          .nav-links ul {
            flex-direction: column;
          }

          form {
            padding: 15px;
          }
        }
      `}</style>

      <AdminHeader />

      <div className="admin-container">
        <Sidebar />

        <main className="admin-main">
          <div className="nav-links">
            <ul>
              <li><Link to="/admin/AddVaccin">Add Vaccine</Link></li>
              <li><Link to="/admin/ViewVaccin">View Vaccine</Link></li>
            </ul>
          </div>

          <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Add New Vaccine</h1>

          <form onSubmit={handleSubmit}>
            <label>
              Vaccine Name:
              <input
                type="text"
                value={Name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>

            <label>
              Add Vaccine Image:
              <input type="file" accept="image/*" onChange={(e) => handleUpload(e.target.files[0])} />
            </label>

            <label>
              Type:
              <input
                type="text"
                value={Type}
                onChange={(e) => setType(e.target.value)}
                placeholder="e.g., mRNA, Viral Vector"
                required
              />
            </label>

            <label>
              Slots Available:
              <input
                type="number"
                value={Slots}
                onChange={(e) => setSlots(e.target.value)}
                min="1"
                required
              />
            </label>

            <label>
              Age Group:
              <select
                value={Age}
                onChange={(e) => setAge(e.target.value)}
                required
              >
                <option value="">Select age group</option>
                <option value="12-17">12-17</option>
                <option value="18-44">18-44</option>
                <option value="45+">45+</option>
              </select>
            </label>

            <label>
              Number of Doses:
              <input
                type="number"
                value={Doses}
                onChange={(e) => setDoses(e.target.value)}
                min="1"
                required
              />
            </label>

            <label>
              Manufacturer:
              <input
                type="text"
                value={Manufacturer}
                onChange={(e) => setManufacturer(e.target.value)}
                required
              />
            </label>

            <label>
              Description / Instructions:
              <textarea
                value={Instructions}
                onChange={(e) => setInstructions(e.target.value)}
                placeholder="Any important info or usage instructions..."
                rows="4"
              />
            </label>

            <button type="submit">Add Vaccine</button>
          </form>
        </main>
      </div>

      <ToastContainer position="top-right" autoClose={2500} />
      <Footer />
    </>
  );
}

export default AddVaccin;
