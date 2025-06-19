import React from "react";
import { Link, useNavigate } from "react-router-dom";
import userprofile from '../../assets/images/userimge.png';
import logo from '../../assets/images/Logo.png';
import Cookies from 'js-cookie';
import axios from 'axios';

const Profile = () => {
  const navigate = useNavigate();
  const userSession = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : {};

  const myemail = userSession.user.email;
  console.log("MyEmail : ", myemail);

  function deleteaccount(myemail) {
    const confirmDelete = window.confirm("Are you sure you want to delete Your Account ?");
    if (confirmDelete) {
      axios.post("http://localhost:3000/deleteaccount", { myemail })
        .then((result) => {
          console.log("Response from server:", result);
          if (result.data.message === "UserDeleted") {
            Cookies.remove("user");
            navigate('/');
          }
        })
        .catch((err) => {
          console.error("Delete Error:", err);
        });
    }
  }
 
  return (
    <>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'black', padding: '10px 30px'}}>
        <img src={logo} alt="Logo" style={{ width: '260px', height: '100px' }} />
        <Link 
  to={userSession.user.role === "admin" ? "/adminDashboard" : "/userDashboard"} 
  style={{ 
    display: 'inline-block', 
    padding: '10px 20px', 
    fontSize: '18px', 
    backgroundColor: 'rgb(20, 190, 190)', 
    color: 'white', 
    textDecoration: 'none', 
    borderRadius: '25px', 
    textAlign: 'center' 
  }}
>
  <b>Back</b>
</Link>

      </header>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100vh', backgroundColor: '#f4f4f4', padding: '20px'}}>
         <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', textAlign: 'center', width: '350px'}}>
           <img src={userprofile} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%', border: '2px solid #ddd', marginBottom: '15px'}} />
          <h2>{userSession.user.username}</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', margin: '10px 0', border: '1px solid black'}}>
            <tbody>
              <tr><td><strong>Email:</strong> {userSession.user.email}</td></tr>
              <tr><td><strong>Phone:</strong> {userSession.user.phone}</td></tr>
              <tr><td><strong>Address:</strong> {userSession.user.address}</td></tr>
              <tr><td><strong>Role:</strong> {userSession.user.role}</td></tr>
              <tr><td></td></tr>
            </tbody>
           </table>

          <button style={{ padding: '10px 20px', margin: '10px 0', backgroundColor: 'rgb(57, 137, 202)', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer',width:"100%" }} onClick={() => navigate('/updateprofile')}><b>Edit Profile</b></button><br/>
          <button style={{ padding: '10px 20px', margin: '10px 0', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', width:"100%"}} onClick={() => deleteaccount(myemail)}><b>Delete Account</b></button>
          <button style={{ padding: '10px 20px', margin: '10px 0', backgroundColor: '#20C997', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', width:"100%"}}><b>Change Password</b></button>
        </div>

        <div style={{ marginLeft: '20px', flex: 1 }}>
          <h1>Customer Orders & Photography Bookings</h1>
          <div style={{ background: '#fff', padding: '15px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', height: '70vh', overflowY: 'auto'}}>

            <h2>Orders</h2>
            <table style={{width: '100%', borderCollapse: 'collapse', textAlign: 'left', marginBottom: '20px', border: '1px solid black'}}>
              <thead>
                <tr style={{ backgroundColor: '#ddd' }}>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Order ID</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Product</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Price</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                  <tr>
                    <td style={{ border: '1px solid black', padding: '8px' }}>OD1001</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>Custom Mug</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>$15.99</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>Shipped</td>
                  </tr>

                  <tr>
                    <td style={{ border: '1px solid black', padding: '8px' }}>OD1001</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>Custom Mug</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>$15.99</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>Shipped</td>
                  </tr>
              </tbody>
            </table>

            <h2>Event Photography</h2>
            <table style={{width: '100%', borderCollapse: 'collapse', textAlign: 'left', marginBottom: '20px', border: '1px solid black'}}>
              <thead>
                <tr style={{ backgroundColor: '#ddd' }}>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Photography ID</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Event</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Price</th>
                  <th style={{ border: '1px solid black', padding: '8px' }}>Date</th>
                </tr>
              </thead>
              <tbody>
                  <tr>
                    <td style={{ border: '1px solid black', padding: '8px' }}>EB1001</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>Birthday</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>$15.99</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>2025/12/25</td>
                  </tr>

                  <tr>
                    <td style={{ border: '1px solid black', padding: '8px' }}>EB1001</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>Birthday</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>$15.99</td>
                    <td style={{ border: '1px solid black', padding: '8px' }}>2025/12/25</td>
                  </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
