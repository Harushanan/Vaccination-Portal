import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaUserNurse, FaUserShield } from "react-icons/fa";
import NormalHeader from "../NormalHeader";
import Footer from "../Footer";

const roleIcons = {
  Patient: <FaUser size={48} color="#0288d1" aria-label="Patient Icon" />,
  Nurse: <FaUserNurse size={48} color="#0288d1" aria-label="Nurse Icon" />,
  Admin: <FaUserShield size={48} color="#0288d1" aria-label="Admin Icon" />,
};

const CheckUser = () => {
  const navigate = useNavigate();

  const handleNavigate = (role) => {
    navigate(`/${role.toLowerCase()}/login`);
  };

  const roles = [
    { name: "Patient" },
    { name: "Nurse" },
    { name: "Admin" },
  ];

  return (
    <>
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <NormalHeader />

        <main
          style={{
            flex: 1,
            padding: "40px 20px",
            maxWidth: "960px",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <h2 style={{ marginBottom: "30px", color: "#004d40" }}>
            Choose Your Access Type
          </h2>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "30px",
            }}
          >
            {roles.map((role) => (
              <div
                key={role.name}
                onClick={() => handleNavigate(role.name)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") handleNavigate(role.name);
                }}
                style={{
                  cursor: "pointer",
                  border: "2px solid #0288d1",
                  borderRadius: "12px",
                  width: "220px",
                  padding: "25px 20px",
                  boxShadow: "0 6px 12px rgba(0,0,0,0.1)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  backgroundColor: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.1)";
                }}
              >
                <div style={{ marginBottom: "15px" }}>{roleIcons[role.name]}</div>
                <h3 style={{ margin: "0 0 15px 0", color: "#004d40" }}>{role.name}</h3>
                <button
                  type="button"
                  style={{
                    padding: "10px 18px",
                    backgroundColor: "#0288d1",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    fontSize: "16px",
                    cursor: "pointer",
                    width: "100%",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigate(role.name);
                  }}
                >
                  Login as {role.name}
                </button>
              </div>
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default CheckUser;
