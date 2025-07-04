import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import AdminHeader from '../../Component/AdminHeader';
import Sidebar from '../../Component/Sidebar';
import Footer from "../../Component/Footer";

function ViewVaccine() {
  const [vaccine, setvaccine] = useState([]);
  const [count, setCount] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/vaccinelist")
      .then((result) => {
        setvaccine(result.data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this vaccine?")) {
      axios.delete(`http://localhost:3000/vaccinelist/${id}`)
        .then(() => {
          setvaccine(vaccine.filter(v => v._id !== id));
        })
        .catch((error) => console.error("Error deleting vaccine:", error));
    }
  };

  const handleEdit = (id) => {
    window.location.href = `/editvaccine/${id}`;
  };

  const increaseCount = (e, ob) => {
    e.preventDefault();
    const newcount = Number(ob.Slots) + Number(count);
    const id = ob._id;

    axios.put("http://localhost:3000/updatecount", { newcount, id })
      .then((result) => {
        if (result.data.message === "Count updated successfully") {
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
      })
      .catch((err) => {
        console.error("Vaccine count added Error: ", err);
      });
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
          overflow-x: auto;
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

        .nav-links a {
          color: #fff;
          text-decoration: none;
          font-weight: bold;
        }

        h1 {
          text-align: center;
          margin-bottom: 25px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          background: #fff;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          border-radius: 10px;
          overflow: hidden;
        }

        th, td {
          padding: 14px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }

        th {
          background: #333;
          color: white;
          position: sticky;
          top: 0;
        }

        tr:hover {
          background-color: #f1f1f1;
        }

        input[type="number"] {
          padding: 5px;
          border-radius: 4px;
          border: 1px solid #ccc;
          width: 80px;
        }

        form button, .action-btn {
          padding: 6px 12px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
        }

        form button {
          background-color: #4caf50;
          color: white;
          margin-left: 5px;
        }

        .edit-btn {
          background-color: #1976d2;
          color: white;
          margin-right: 8px;
        }

        .delete-btn {
          background-color: #e53935;
          color: white;
        }

        @media (max-width: 768px) {
          .nav-links ul {
            flex-direction: column;
          }

          table {
            font-size: 14px;
          }

          input[type="number"] {
            width: 100%;
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

          <h1>All Vaccines</h1>

          <table>
            <thead>
              <tr>
                <th>Vaccine Name</th>
                <th>Type</th>
                <th>Age</th>
                <th>Doses</th>
                <th>Manufacturer</th>
                <th>Instructions</th>
                <th>Stock Level</th>
                <th>Add Stock</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {vaccine.map((ob) => (
                <tr key={ob._id}>
                  <td>{ob.Name}</td>
                  <td>{ob.Type}</td>
                  <td>{ob.Age}</td>
                  <td>{ob.Doses}</td>
                  <td>{ob.Manufacturer}</td>
                  <td>{ob.Instructions}</td>
                  <td>{ob.Slots}</td>
                  <td>
                    <form onSubmit={(e) => increaseCount(e, ob)}>
                      <input
                        type="number"
                        name="addcount"
                        placeholder="Add"
                        onChange={(e) => setCount(e.target.value)}
                        required
                      />
                      <button type="submit">+</button>
                    </form>
                  </td>
                  <td style={{ color: ob.Slots < 20 ? 'red' : 'green' }}>
                    {ob.Slots < 20 ? 'Low' : 'Sufficient'}
                  </td>
                  <td>
                    <button className="action-btn edit-btn" onClick={() => handleEdit(ob._id)}>Edit</button>
                    <button className="action-btn delete-btn" onClick={() => handleDelete(ob._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>

      <Footer />
    </>
  );
}

export default ViewVaccine;
