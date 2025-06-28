function Footer() {
  return (
    <>
      <style>{`
        .footer {
          background: linear-gradient(90deg, #004d40, #00acc1);
          color: white;
          text-align: center;
          padding: 10px 18px;
          margin-top: auto;
        }

        .footer-icons {
          margin-bottom: 20px;
        }

        .footer-icons a {
          margin: 0 15px;
          font-size: 24px;
          color: white;
          text-decoration: none;
        }

        .footer-text {
          font-size: 20px;
          opacity: 0.9;
        }

        @media (max-width: 600px) {
          .footer-icons a {
            margin: 0 8px;
            font-size: 20px;
          }

          .footer-text {
            font-size: 16px;
          }
        }
      `}</style>

      <div className="footer">
        <div className="footer-icons">
          <a href="#"><i className="fas fa-globe"></i></a>
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-twitter"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
        </div>
        <p className="footer-text"><b>&copy; 2025 VaxCare+ All rights reserved</b></p>
      </div>
    </>
  );
}

export default Footer;
