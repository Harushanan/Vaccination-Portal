import React from 'react';
import { useEffect , useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie'; 
import userprofile from '../../assets/images/userimge.png'

import logo from '../../assets/images/Logo.png'

import axios from 'axios';

function DeleteUser() {
  const [user, setuser] = useState([]);
  const [usercount, setusercount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const [dropdownVisible, setDropdownVisible] = useState(false);
  
    const navigate = useNavigate()
  
    const userSession = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
    const customername = userSession ? userSession.user.username : "Guest";
  

  useEffect(() => {
       axios.get("http://localhost:3000/deletuserdeatiles").then(
        (result) => {
           setuser(result.data);
           setSearchResults(result.data); 
        console.log(user)
     })
      .catch((error) => console.error("Error fetching data:", error));
    }, [usercount]);

  useEffect(() => {
    if (user) {
      setusercount(user.length);  
      console.log(user.length); 
    }
  }, [user]);  //

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const query = e.target.value.toLowerCase();
  
    const filteredUsers = user.filter(user => 
      user.username.toLowerCase().includes(query) || 
      user.email.toLowerCase().includes(query) || 
      user.address.toLowerCase().includes(query) ||
      user.phone.toLowerCase().includes(query)
    );
    setSearchResults(filteredUsers);
  };

  function logout(){
      const logoutconform = window.confirm("Are you sure you want to logout this account ?");
      if (logoutconform) {
        Cookies.remove("user");
        navigate('/'); 
    }
  }

  
return (<>
        <header style={{ backgroundColor: "black", color: "white", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 20px" }}>
           <img src={logo} alt="Logo" style={{ width: '260px', height: '100px' }} />
               <nav>
                    <Link to="/customer" style={{ padding: '10px 20px', fontSize: '18px', color: 'white', textDecoration: 'none', textAlign: 'center' }}><b>Home</b></Link>
                    <Link to="/feedback" style={{ padding: '10px 20px', fontSize: '18px', color: 'white', textDecoration: 'none', textAlign: 'center' }}><b>AboutUs</b></Link>
                    <Link to="/inventory" style={{ padding: '10px 20px', fontSize: '18px', color: 'white', textDecoration: 'none', textAlign: 'center' }}><b>Photography</b></Link>
                    <Link to="/order" style={{ padding: '10px 20px', fontSize: '18px', color: 'white', textDecoration: 'none', textAlign: 'center' }}><b>Order</b></Link>
                    <Link to="/feedback" style={{ padding: '10px 20px', fontSize: '18px', color: 'white', textDecoration: 'none', textAlign: 'center' }}><b>Contactus</b></Link>
              </nav>
     
                    <div style={{ display: "flex", alignItems: "center", cursor: "pointer", position: "relative" }} onClick={() => setDropdownVisible(!dropdownVisible)}>
                        <img src={userprofile} alt="User" style={{ width: "60px", height: "60px", borderRadius: "50%", border: "3px solid aqua", marginRight: "10px" }} />
                            <h2><b>{customername}</b></h2>
                            <span style={{ fontSize: "24px", marginLeft: "10px", color:"aqua" }}>☰</span>
                             {dropdownVisible && (
                                 <div style={{ position: "absolute", top: "50px", right: 0, backgroundColor: "white", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)", width: "150px", borderRadius: "5px", textAlign: "left" }}>
                                     <Link to='/profile' style={{ display: "block", padding: "10px", textDecoration: "none", color: "black" }}>View Profile</Link>
                                     <a onClick={logout} style={{ display: "block", padding: "10px", textDecoration: "none", color: "black" }}>Logout</a>
                                 </div>
                             )}
                    </div>
          </header>
     
      <h1>Delete customers</h1>

       <nav style={{ backgroundColor: 'rgb(0, 0, 0)', padding: '10px', display: 'inline-block' }}>
          <ul style={{ listStyleType: 'none', padding: '0', margin: '0' }}>
              <li style={{ display: 'inline', marginRight: '20px' }}><Link to ="" style={{ textDecoration: 'none', color: 'rgb(0, 255, 255)' }}>Admin</Link></li>
              <li style={{ display: 'inline', marginRight: '20px' }}><Link  to="/AdminDashboard" style={{ textDecoration: 'none', color: 'rgb(0, 255, 255)' }}>Current customers</Link></li>
              <li style={{ display: 'inline' }}><Link to ="/delet-user" style={{ textDecoration: 'none', color: 'rgb(0, 255, 255)' }}>Past customers</Link></li>
          </ul>
       </nav>



      <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>

      <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
        <input
          type="text"
          placeholder="Search....."
          value={searchQuery}
          onChange={handleSearch} 
          style={{ width: '300px', padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc', marginRight: '10px' }}
        />
      </div>

    </div>

  <h2>Total Customers Removed: {searchResults.length}</h2>

<table style={{ width: '100%', borderCollapse: 'collapse', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', marginTop: '20px' }}>
  <thead style={{ backgroundColor: '#f4f4f4', color: '#333' }}>
    <tr>
      <th style={{ padding: '15px', border: '1px solid #ddd', textAlign: 'left' }}>Name</th>
      <th style={{ padding: '15px', border: '1px solid #ddd', textAlign: 'left' }}>Email</th>
      <th style={{ padding: '15px', border: '1px solid #ddd', textAlign: 'left' }}>Address</th>
      <th style={{ padding: '15px', border: '1px solid #ddd', textAlign: 'left' }}>Phone Number</th>
      <th style={{ padding: '15px', border: '1px solid #ddd', textAlign: 'left' }}>Number of Photoshoots</th>
      <th style={{ padding: '15px', border: '1px solid #ddd', textAlign: 'left' }}>Number of Orders</th>
      <th style={{ padding: '15px', border: '1px solid #ddd', textAlign: 'left' }}>Delete Reason</th>
      <th style={{ padding: '15px', border: '1px solid #ddd', textAlign: 'left' }}>Remove By</th>
      <th style={{ padding: '15px', border: '1px solid #ddd', textAlign: 'left' }}>Remove Date</th>
    </tr>
  </thead>
  <tbody>
    {searchResults.map((ob) => (
      <tr key={ob.email} style={{ backgroundColor: ob % 2 === 0 ? '#fafafa' : '#fff' }}>
        <td style={{ padding: '12px', border: '1px solid #ddd' }}>{ob.username}</td>
        <td style={{ padding: '12px', border: '1px solid #ddd' }}>{ob.email}</td>
        <td style={{ padding: '12px', border: '1px solid #ddd' }}>{ob.address}</td>
        <td style={{ padding: '12px', border: '1px solid #ddd' }}>{ob.phone}</td>
        <td style={{ padding: '12px', border: '1px solid #ddd' }}>10</td>
        <td style={{ padding: '12px', border: '1px solid #ddd' }}>12</td>
        <td style={{ padding: '12px', border: '1px solid #ddd' }}>{ob.reason}</td>
        <td style={{ padding: '12px', border: '1px solid #ddd' }}>{ob.removeby}</td>
        <td style={{ padding: '12px', border: '1px solid #ddd' }}>{ob.date}</td>
      </tr>
    ))}
  </tbody>
</table>


    </>
  );
}

export default DeleteUser;
