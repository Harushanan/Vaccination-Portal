import React, { useRef, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import userprofile from '../../assets/images/userimge.png';
import hospitalLogo from '../../assets/images/report.png';
import NormalHeader from '../../Component/NormalHeader';
import Footer from "../../Component/Footer";

const ReportPage = () => {
  const reportRef = useRef();
  const userSession = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : {};
  const [vaccines, setVaccines] = useState([]);

  useEffect(() => {
    if (userSession.user?.email) {
      axios.get(`http://localhost:3000/vaccinepersonlist/${userSession.user.email}`)
        .then(res => {
          if (res.data.message === "Booking fetched successfully") {
            setVaccines(res.data.getbooking);
          }
        })
        .catch(console.error);
    }
  }, []);

  const handleDownloadPdf = () => {
    html2canvas(reportRef.current, { scale: 2, useCORS: true }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${userSession.user?.email}.pdf`);
    });
  };

  const todayDate = new Date().toLocaleDateString();

  return (
    <>
      <style>{`
        .page-container {
          background-color: #f5f5f5;
          min-height: 100vh;
          padding: 30px 20px;
        }
        .report-wrapper {
          background: #fff;
          padding: 30px;
          border-radius: 10px;
          max-width: 1200px;
          margin: auto;
          box-shadow: 0 0 15px rgba(0,0,0,0.1);
          font-family: Arial, sans-serif;
        }
        .header-section {
          display: flex;
          align-items: center;
          border-bottom: 2px solid #1976d2;
          padding-bottom: 10px;
          margin-bottom: 20px;
        }
        .header-section img {
          height: 60px;
          margin-right: 15px;
        }
        .header-section h1 {
          font-size: 24px;
          color: #1976d2;
        }
        .title {
          text-align: center;
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 20px;
        }
        .info-section {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }
        .info-left, .info-right {
          flex: 1;
          min-width: 250px;
          margin-bottom: 10px;
        }
        .info-right {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          flex-wrap: wrap;
          gap: 15px;
        }
        .info-right .text-block {
          text-align: right;
        }
        .info-right img {
          width: 110px;
          height: 110px;
          border-radius: 50%;
          border: 3px solid #1976d2;
          object-fit: cover;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
          font-size: 14px;
        }
        table, th, td {
          border: 1px solid #ccc;
        }
        th {
          background-color: #1976d2;
          color: white;
          padding: 10px;
        }
        td {
          padding: 8px;
          text-align: center;
        }
        .status-tag {
          padding: 4px 8px;
          border-radius: 5px;
          font-weight: 600;
          display: inline-block;
          font-size: 12px;
        }
        .pending { background: #fff9c4; color: #fbc02d; }
        .approve { background: #c8e6c9; color: #388e3c; }
        .reject { background: #ffcdd2; color: #c62828; }
        .inject { background: #bbdefb; color: #1976d2; }
        .default { background: #eeeeee; color: #616161; }
        .signature-section {
          display: flex;
          justify-content: space-between;
          margin-top: 30px;
        }
        .signature-box {
          width: 30%;
          text-align: center;
        }
        .signature-line {
          border-top: 1px solid #000;
          margin-top: 50px;
          padding-top: 5px;
        }
        .download-btn {
          display: inline-block;
          background-color: #388e3c;
          color: white;
          padding: 12px 24px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: bold;
          border: none;
          cursor: pointer;
          margin-top: 20px;
          transition: background 0.3s ease;
        }
        .download-btn:hover {
          background-color: #2e7d32;
        }
        @media (max-width: 768px) {
          .info-section {
            flex-direction: column;
            text-align: center;
            align-items: center;
          }
          .info-right {
            flex-direction: column-reverse;
            align-items: center;
            justify-content: center;
            text-align: center;
          }
          .info-right .text-block {
            text-align: center;
          }
          .signature-section {
            flex-direction: column;
            align-items: center;
            gap: 20px;
          }
          .signature-box {
            width: 100%;
          }
        }
      `}</style>

      <NormalHeader />
      <div className="page-container">
        <div ref={reportRef} className="report-wrapper">
          <div className="header-section">
            <img src={hospitalLogo} alt="Hospital" />
            <h1>💉 <span>VaxCareHp</span> <span>+</span> ❤️</h1>
          </div>

          <div className="title">Vaccination Report</div>

          <div className="info-section">
            <div className="info-left">
              <p><strong>Patient Name:</strong> {userSession.user?.username}</p>
              <p><strong>Email:</strong> {userSession.user?.email}</p>
              <p><strong>Phone:</strong> {userSession.user?.phone}</p>
              <p><strong>Address:</strong> {userSession.user?.address}</p>
            </div>
            <div className="info-right">
              <div className="text-block">
                <p><strong>Report Date:</strong> {todayDate}</p>
                <p><strong>Patient ID:</strong> {userSession.user?.id}</p>
              </div>
              <img src={userprofile} alt="Profile" />
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Vaccine</th>
                <th>Dose</th>
                <th>Date</th>
                <th>Center</th>
                <th>Status</th>
                <th>Reason</th>
                <th>Injected By</th>
              </tr>
            </thead>
            <tbody>
              {vaccines.length ? vaccines.map((vaccine, i) => (
                <tr key={i}>
                  <td>{vaccine.vaccine}</td>
                  <td>{vaccine.dose}</td>
                  <td>{vaccine.date}</td>
                  <td>{vaccine.center}</td>
                  <td>
                    <span className={`status-tag ${vaccine.status}`}>
                      {vaccine.status}
                    </span>
                  </td>
                  <td>{vaccine.removereason === 'no reason provided' ? '-' : vaccine.removereason}</td>
                  <td>{vaccine.status === 'inject' ? `${vaccine.injectBy} (${vaccine.injectById})` : '-'}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="7">No vaccination history found.</td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="signature-section">
            <div className="signature-box">
              <div>Nurse Signature</div>
              <div className="signature-line">________________________</div>
            </div>
            <div className="signature-box">
              <div>Doctor Signature</div>
              <div className="signature-line">________________________</div>
            </div>
            <div className="signature-box">
              <div>Admin Signature</div>
              <div className="signature-line">________________________</div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center' }}>
          <button onClick={handleDownloadPdf} className="download-btn">
            📥 Download PDF Report
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ReportPage;
