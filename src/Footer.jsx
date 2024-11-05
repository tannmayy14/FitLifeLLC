import React from 'react';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn,faYoutube } from '@fortawesome/free-brands-svg-icons';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="footer-col">
            <h4>company</h4>
            <ul>
              <li><Link to="/about-us">About Us</Link></li> {/* Link to About Us page */}
              <li><Link to="/our-services">Our Services</Link></li> {/* Link to Our Services page */}
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/affiliate-program">Affiliate Program</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>get help</h4>
            <ul>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/shipping">Shipping</Link></li>
              <li><Link to="/returns">Returns</Link></li>
              <li><Link to="/order-status">Order Status</Link></li>
              <li><Link to="/payment-options">Payment Options</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>follow us</h4>
            <div className="social-links">
              <a href="#"><FontAwesomeIcon icon={faFacebookF} /></a>
              <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
              <a href="https://www.instagram.com/mazin_bangi/"><FontAwesomeIcon icon={faInstagram} /></a>
              <a href="#"><FontAwesomeIcon icon={faLinkedinIn} /></a>
              <a href="https://www.youtube.com/@sam_sulek"><FontAwesomeIcon icon={faYoutube} /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
