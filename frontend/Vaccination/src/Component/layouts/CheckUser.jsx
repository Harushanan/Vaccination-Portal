import React from 'react';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import NormalHeader from '../NormalHeader';
import Footer from "../Footer"

import patientImg from '../../assets/images/patient.png';
import nurseImg from '../../assets/images/nurse.png';
import adminImg from '../../assets/images/admin.png';

const CheckUser = () => {
    const navigate = useNavigate();

    const handleNavigate = (role) => {
        navigate(`/${role.toLowerCase()}/login`);
    };

    const roles = [
        { name: "Patient", image: patientImg },
        { name: "Nurse", image: nurseImg },
        { name: "Admin", image: adminImg },
    ];

    return (
        <>
            <div style={{
                minHeight: '100vh',
                background: 'linear-gradient(120deg, #e0f7fa, #f1f8e9)',
                paddingBottom: '40px'
            }}>
                <NormalHeader />
                <h2 style={{
                    textAlign: 'center',
                    fontSize: '2.2rem',
                    fontWeight: '600',
                    marginTop: '30px',
                    color: '#004d40'
                }}>
                    Choose Your Access Type
                </h2>

                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '40px',
                    padding: '50px 20px',
                }}>
                    {roles.map((role, index) => (
                        <div
                            key={index}
                            onClick={() => handleNavigate(role.name)}
                            style={{
                                backgroundColor: '#ffffff',
                                borderRadius: '20px',
                                width: '250px',
                                height: '300px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                                cursor: 'pointer',
                                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'scale(1.05)';
                                e.currentTarget.style.boxShadow = '0 12px 20px rgba(0, 0, 0, 0.2)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.1)';
                            }}
                        >
                            <img src={role.image} alt={role.name} style={{
                                width: '90px',
                                height: '90px',
                                borderRadius: '50%',
                                objectFit: 'cover',
                                marginBottom: '15px',
                                border: '3px solid #c8e6c9'
                            }} />
                            <h3 style={{
                                fontSize: '1.4rem',
                                color: '#00695c',
                                marginBottom: '10px'
                            }}>
                                {role.name}
                            </h3>
                            <button style={{
                                padding: '10px 20px',
                                backgroundColor: '#00796b',
                                color: 'white',
                                border: 'none',
                                borderRadius: '25px',
                                cursor: 'pointer',
                                fontWeight: '500',
                                transition: 'background 0.3s ease'
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#004d40'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#00796b'}
                            >
                                Login as {role.name}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <Footer/>
        </>
    );
};

export default CheckUser;
