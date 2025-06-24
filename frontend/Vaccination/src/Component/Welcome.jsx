import React from 'react';
import background from '../assets/images/Welcome2.png';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const WelcomePage = () => {
    const userSession = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
    console.log("User session:", userSession);

    const navigate = useNavigate();

    function checksession() {
        if (userSession != null) {
            if (userSession.user.role === "customer") {
                navigate('/userDashboard');
            } else {
                navigate('/adminDashboard');
            }
        } else {
            navigate('/CheckUser');
        }
    }

    return (
        <>
            <div style={{
                minHeight: '90vh',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#e6f7ff'
            }}>

                {/* Header */}
                <div style={{
                    background: 'linear-gradient(90deg, #004d40, #00acc1)',
                 padding: '20px 40px',
                 display: 'flex',
                 justifyContent: 'space-between',
                 alignItems: 'center',
                 flexWrap: 'wrap',
                 position: 'sticky',
                 top: 0,
                 zIndex: 1000,
                 boxShadow: '0 6px 15px rgba(0, 0, 0, 0.4)',
                borderBottom: '3px solid #fff'
                }}>
                 <a
        href="#"
        style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: 'white',
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            transition: 'all 0.3s ease',
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
    >
        💉 <span style={{ margin: '0 8px' }}>VaxCare</span> <span style={{ color: '#f44336' }}>+</span> ❤️
    </a>

                </div>

                {/* Main Section */}
                <main style={{
                    flex: 1,
                    padding: '60px 20px',
                    textAlign:"left",
                    backgroundColor: '#cceeff',
                    backgroundImage: `url(${background})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    color: '#003333'
                }}>
                    <h1 style={{
                    fontSize: '40px',
                    marginBottom: '20px',
                    background: 'linear-gradient(90deg, #00c6ff,rgba(0, 115, 255, 0.79))',
                    color: 'white',
                    display: 'inline-block',
                    padding: '15px 30px',
                    borderRadius: '16px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
                    fontFamily: "'Segoe UI', sans-serif",
                    textShadow: '1px 1px 4px rgba(0,0,0,0.4)'
                }}>
                    Your Health, Our Priority</h1>

                <p style={{
                    fontSize: '20px',
                    fontWeight: '500',
                    color: '#2c3e50',
                    marginTop: '10px',
                    fontFamily: "'Segoe UI', sans-serif",
                    lineHeight: '1.6'
                }}>
   
                ✔ Protect your health with timely vaccinations. <br />
                ✔ Shield your loved ones from preventable diseases. <br />
                ✔ Access safe, verified vaccination services online. <br />
                ✔ Book your slot anytime, anywhere. <br />
                ✔ Stay updated. Stay protected. Stay strong.
</p>



               <button onClick={checksession}
               style={{
                   padding: '14px 28px',
                   fontSize: '1.2em',
                   background: 'linear-gradient(135deg,rgb(174, 0, 255),rgba(25, 0, 255, 0.51))',
                   color: '#ffffff',
                   border: 'none',
                   borderRadius: '10px',
                   fontWeight: 'bold',
                   marginTop: '25px',
                   cursor: 'pointer',
                   transition: 'all 0.3s ease',
                   boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                }}
                  onMouseOver={e => e.target.style.transform = 'scale(1.05)'}
                  onMouseOut={e => e.target.style.transform = 'scale(1)'}>
                 <b>Get Vaccinated Now</b>
                </button>

                </main>

               
               
            </div>
        </>
    );
};

export default WelcomePage;
