import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import './contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [status, setStatus] = useState({ message: '', variant: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus({ message: '', variant: '' });

    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ message: 'Please fill out all fields.', variant: 'warning' });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ message: 'Message sent successfully!', variant: 'success' });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus({ message: data.error || 'Something went wrong.', variant: 'danger' });
      }
    } catch (error) {
      setStatus({ message: 'Server error. Please try again later.', variant: 'danger' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="contact-page">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div className="contact-card shadow-lg p-4 rounded">
            <h2 className="contact-title mb-4 text-center">Contact Us</h2>
            <h5>We're here to help you with anything!</h5>


            {status.message && (
              <Alert
                variant={status.variant}
                onClose={() => setStatus({ message: '', variant: '' })}
                dismissible
                className="contact-alert"
              >
                {status.message}
              </Alert>
            )}

            <Form onSubmit={handleSubmit} className="contact-form">
              <Form.Group className="form-group" controlId="contactName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="contact-input"
                />
              </Form.Group>

              <Form.Group className="form-group" controlId="contactEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="contact-input"
                />
              </Form.Group>

              <Form.Group className="form-group" controlId="contactMessage">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  placeholder="Message..."
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="contact-textarea"
                />
              </Form.Group>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
                className="contact-submit-btn"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </Form>


          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
