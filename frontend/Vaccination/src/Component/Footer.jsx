function Footer() {
    return (
         <div style={{
                     background: 'linear-gradient(90deg, #004d40, #00acc1)',
                    color: 'white',
                    textAlign: 'center',
                    padding: '10px 18px',
                    marginTop: 'auto'
                }}>
                    <div style={{ marginBottom: '20px' }}>
                        <a href="#"><i className="fas fa-globe" style={{ margin: '0 15px', fontSize: '24px' }}></i></a>
                        <a href="#"><i className="fab fa-facebook-f" style={{ margin: '0 15px', fontSize: '24px' }}></i></a>
                        <a href="#"><i className="fab fa-twitter" style={{ margin: '0 15px', fontSize: '24px' }}></i></a>
                        <a href="#"><i className="fab fa-instagram" style={{ margin: '0 15px', fontSize: '24px' }}></i></a>
                    </div>
                    <p style={{ fontSize: '20px', opacity: 0.9 }}><b>&copy; 2025 VaxCare+ All rights reserved</b></p>
                </div>
    );
  }
  
  export default Footer;
  