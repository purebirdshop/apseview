import React from "react";
import logo from "../assets/apse-color-logo.png";
import { Link } from "react-router-dom";
import "../App.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
		<div className="footer-spacer"></div>
      <div className="footer-container">
        <div className="footer-links">
          {/* <Link to="/about" className="footer-link">About</Link> */}
          {/* <Link to="/contact" className="footer-link">Contact</Link> */}
          <Link to="/privacy-policy" className="footer-link">Privacy Policy</Link>
          <Link to="/terms-of-service" className="footer-link">Terms of Service</Link>
        </div>

        <div className="footer-copy">
          © {year} Apse. All rights reserved.
        </div>
      </div>
	  <div className="footer-logo">
		<img style={{marginLeft:"0 0 0 -72px",width:"72px",height:"72px"}} alt="View the Apse" src={logo} />
	  </div>
    </footer>
  );
}

export default Footer;