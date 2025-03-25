import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Envelope, Telephone, GeoAlt, Clock } from 'react-bootstrap-icons';
import './Support.css';
import { complaint } from '../../services/redux/middleware/complaint';  
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
const Support = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    dispatch(complaint(formData)).then((res) => {
      console.log(res, "rehddjdsjhgds");
      if (res.payload.status === 200) {
        toast.success(res?.payload?.data?.message);
      } else {
        toast.error(res?.payload?.data?.message);
      }
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="support-container" style={{overflowY:"scroll",height:"100vh"}}>
      <div className="support-header">
        <h1>How can we help you?</h1>
        <p>We're here to help and answer any questions you might have</p>
      </div>

      <Container className="support-content">
        <Row>
          <Col lg={8}>
            <div className="contact-form-container">
              <h2>Send us a message</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Your Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Enter subject"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Message</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Enter your message"
                    required
                  />
                </Form.Group>

                <Button type="submit" className="submit-button">
                  Send Message
                </Button>
              </Form>
            </div>
          </Col>

          <Col lg={4}>
            <div className="contact-info-container">
              <h2>Contact Information</h2>
              <div className="contact-info-item">
                <Envelope className="contact-icon" />
                <div className="contact-details">
                  <h3>Email</h3>
                  <p>support@prepworld.com</p>
                </div>
              </div>

              <div className="contact-info-item">
                <Telephone className="contact-icon" />
                <div className="contact-details">
                  <h3>Phone</h3>
                  <p>+1 (555) 123-4567</p>
                </div>
              </div>

              <div className="contact-info-item">
                <GeoAlt className="contact-icon" />
                <div className="contact-details">
                  <h3>Address</h3>
                  <p>123 Education Street, Learning City, 12345</p>
                </div>
              </div>

              <div className="contact-info-item">
                <Clock className="contact-icon" />
                <div className="contact-details">
                  <h3>Working Hours</h3>
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                </div>
              </div>
{/* 
              <div className="faq-section">
                <h2>Frequently Asked Questions</h2>
                <div className="faq-item">
                  <h3>How do I reset my password?</h3>
                  <p>Click on the "Forgot Password" link on the login page and follow the instructions sent to your email.</p>
                </div>
                <div className="faq-item">
                  <h3>How can I update my profile?</h3>
                  <p>Go to your profile settings and click on the edit icon to update your information.</p>
                </div>
                <div className="faq-item">
                  <h3>What payment methods do you accept?</h3>
                  <p>We accept all major credit cards, PayPal, and bank transfers.</p>
                </div>
              </div> */}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Support;
