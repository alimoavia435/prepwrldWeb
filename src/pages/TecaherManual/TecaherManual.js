import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Book, Gear, People, FileText, QuestionCircle, Link45deg } from 'react-bootstrap-icons';
import './TecaherManual.css';

const TecaherManual = () => {
  const manualSections = [
    {
      title: "Getting Started",
      icon: <Book className="section-icon" />,
      description: "Learn the basics of using PrepWorld's teaching platform",
      topics: [
        "Platform Overview",
        "Account Setup",
        "Dashboard Navigation",
        "Basic Features"
      ]
    },
    {
      title: "Exam Management",
      icon: <FileText className="section-icon" />,
      description: "Create and manage exams, questions, and assessments",
      topics: [
        "Creating Exams",
        "Question Bank Management",
        "Exam Scheduling",
        "Results Analysis"
      ]
    },
    {
      title: "Student Management",
      icon: <People className="section-icon" />,
      description: "Manage your students and track their progress",
      topics: [
        "Student Registration",
        "Class Management",
        "Progress Tracking",
        "Performance Reports"
      ]
    },
    {
      title: "Advanced Features",
      icon: <Gear className="section-icon" />,
      description: "Explore advanced features and customization options",
      topics: [
        "Custom Templates",
        "Advanced Analytics",
        "Integration Options",
        "API Usage"
      ]
    },
    {
      title: "Troubleshooting",
      icon: <QuestionCircle className="section-icon" />,
      description: "Common issues and their solutions",
      topics: [
        "Technical Issues",
        "Account Problems",
        "Data Management",
        "Support Resources"
      ]
    }
  ];

  return (
    <div className="manual-container">
      <div className="manual-header">
        <h1>Teacher Manual</h1>
        <p>Comprehensive guide for teachers using PrepWorld platform</p>
        <Button 
          href="#" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="manual-link-button"
        >
          <Link45deg className="link-icon" />
          Open Complete Teacher Manual
        </Button>
      </div>

      <Container className="manual-content">
        <Row>
          {manualSections.map((section, index) => (
            <Col key={index} lg={6} md={12} className="mb-4">
              <Card className="manual-card">
                <Card.Body>
                  <div className="section-header">
                    {section.icon}
                    <h2>{section.title}</h2>
                  </div>
                  <p className="section-description">{section.description}</p>
                  <ul className="topic-list">
                    {section.topics.map((topic, topicIndex) => (
                      <li key={topicIndex}>{topic}</li>
                    ))}
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default TecaherManual;
