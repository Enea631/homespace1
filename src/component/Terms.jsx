import React from 'react';
import { Row, Col } from 'react-bootstrap';
import './Terms.scss'; 

function Terms() {
  return (
    <div className="terms-page">
      <div className="terms-container">
        <h1 className="text-center">Privacy Policy</h1>
        
        <Row>
          <Col md={12}>
            <p>
              <strong>Introduction:</strong><br />
              Welcome to Home Space! We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your personal information when you visit our website and use our services.
            </p>
            
            <p>
              <strong>Information We Collect:</strong><br />
              We collect personal information, such as your name, contact information, and browsing behavior when you interact with our website. We use this information to enhance your user experience, process transactions, and communicate with you.
            </p>

            <p>
              <strong>How We Use Your Information:</strong><br />
              We may use your information to:
              <ul>
                <li>Process orders and manage your account.</li>
                <li>Provide customer support and respond to inquiries.</li>
                <li>Send promotional emails and updates.</li>
                <li>Improve our website and services.</li>
              </ul>
            </p>

            <p>
              <strong>Data Security:</strong><br />
              We implement security measures to protect your personal data. However, no method of transmission over the internet or electronic storage is 100% secure.
            </p>

            <p>
              <strong>Changes to This Privacy Policy:</strong><br />
              We reserve the right to update this Privacy Policy at any time. Please check this page periodically for any changes.
            </p>

            <p>
              If you have any questions or concerns about our privacy practices, please contact us at <a href="mailto:homespace@gmail.com" className="interactive-link">homespace@gmail.com</a>.
            </p>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Terms;
