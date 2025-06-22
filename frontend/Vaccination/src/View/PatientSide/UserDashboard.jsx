import React from 'react';
import PatientHeader from '../../Component/PatientHeader'
import Cookies from 'js-cookie';

function UserDashboard() {
  const userSession = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
  const customername = userSession ? userSession.user.username : "Guest";

  return (
    <>
      <div style={{ minHeight: '90vh', display: 'flex', flexDirection: 'column', backgroundColor: '#e6f7ff' }}>
        <PatientHeader />

        {/* Main Welcome Content */}
        <div style={{ padding: "40px", textAlign: "center" }}>
          <h1>Welcome Customer! {customername}</h1>
        </div>
      </div>
    </>
  );
}

export default UserDashboard;
