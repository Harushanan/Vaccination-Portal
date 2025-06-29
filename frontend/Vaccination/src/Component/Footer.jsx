function Footer() {
  return (
    <>
      <style>{`
        .footer {
          background: linear-gradient(90deg, #004d40, #00acc1);
          color: white;
          text-align: center;
          padding: 20px 10px;
          margin-top: auto;
          box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.2);
        }

        .footer-text {
          font-size: 18px;
          opacity: 0.9;
          font-weight: 500;
          margin: 0;
        }

        @media (max-width: 768px) {
          .footer-text {
            font-size: 16px;
          }
        }

        @media (max-width: 480px) {
          .footer-text {
            font-size: 14px;
          }
        }
      `}</style>

      <div className="footer">
        <p className="footer-text">
          &copy; 2025 <strong>VaxCareHP+</strong> — All rights reserved
        </p>
      </div>
    </>
  );
}

export default Footer;
