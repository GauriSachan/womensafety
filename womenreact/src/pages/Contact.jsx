import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, HeadphonesIcon, Globe } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'general'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone Support',
      details: '+1 (555) 123-4567',
      description: 'Available 24/7 for emergencies',
      color: 'blue'
    },
    {
      icon: Mail,
      title: 'Email Support',
      details: 'support@safeher.com',
      description: 'Response within 24 hours',
      color: 'green'
    },
    {
      icon: MessageSquare,
      title: 'Live Chat',
      details: 'Available on website',
      description: 'Monday - Friday, 9 AM - 6 PM',
      color: 'purple'
    },
    {
      icon: HeadphonesIcon,
      title: 'Crisis Support',
      details: '1-800-SAFE-HER',
      description: 'Immediate help available',
      color: 'red'
    }
  ];

  const officeLocations = [
    {
      city: 'New York',
      address: '123 Safety Street, NYC, NY 10001',
      phone: '+1 (555) 123-4567',
      hours: 'Mon-Fri: 9 AM - 6 PM'
    },
    {
      city: 'Los Angeles',
      address: '456 Protection Ave, LA, CA 90210',
      phone: '+1 (555) 987-6543',
      hours: 'Mon-Fri: 9 AM - 6 PM'
    },
    {
      city: 'Chicago',
      address: '789 Security Blvd, Chicago, IL 60601',
      phone: '+1 (555) 456-7890',
      hours: 'Mon-Fri: 9 AM - 6 PM'
    }
  ];

  const faqItems = [
    {
      question: 'How can I report an emergency?',
      answer: 'For immediate emergencies, call 911 or your local emergency number. For non-emergency support, use our 24/7 hotline or the emergency features in our app.'
    },
    {
      question: 'Is my information kept confidential?',
      answer: 'Yes, we take privacy seriously. All personal information is encrypted and protected. We only share information when legally required or with your explicit consent.'
    },
    {
      question: 'How do I access safety resources?',
      answer: 'Safety resources are available through our app, website, and by contacting our support team. Many resources are available for immediate download.'
    },
    {
      question: 'Can I get help if I\'m in an abusive relationship?',
      answer: 'Absolutely. We provide confidential support and can connect you with local resources, shelters, and legal assistance. Contact our crisis support line for immediate help.'
    }
  ];

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        category: 'general'
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <div className="contact-page">
      {/* Contact Header */}
      <section className="contact-header">
        <div className="container">
          <div className="header-content">
            <h1>Get in Touch</h1>
            <p>
              We're here to help and support you. Reach out to us anytime for assistance, 
              questions, or to share your story.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="contact-methods">
        <div className="container">
          <div className="methods-grid">
            {contactInfo.map((method, index) => {
              const IconComponent = method.icon;
              return (
                <div key={index} className={`method-card ${method.color}`}>
                  <div className="method-icon">
                    <IconComponent size={32} />
                  </div>
                  <h3>{method.title}</h3>
                  <div className="method-details">{method.details}</div>
                  <p>{method.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="contact-form-section">
        <div className="container">
          <div className="contact-content">
            {/* Contact Form */}
            <div className="form-container">
              <h2>Send us a Message</h2>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="category">Category</label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                    >
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="safety">Safety Concern</option>
                      <option value="feedback">Feedback</option>
                      <option value="partnership">Partnership</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">Subject *</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="6"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary btn-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>Sending...</>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>

                {submitStatus === 'success' && (
                  <div className="form-status success">
                    Thank you! Your message has been sent successfully.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="form-status error">
                    There was an error sending your message. Please try again.
                  </div>
                )}
              </form>
            </div>

            {/* Office Locations */}
            <div className="locations-container">
              <h2>Our Locations</h2>
              <div className="locations-list">
                {officeLocations.map((location, index) => (
                  <div key={index} className="location-card">
                    <div className="location-header">
                      <MapPin size={20} />
                      <h3>{location.city}</h3>
                    </div>
                    <div className="location-details">
                      <p className="address">{location.address}</p>
                      <div className="location-info">
                        <div className="info-item">
                          <Phone size={16} />
                          <span>{location.phone}</span>
                        </div>
                        <div className="info-item">
                          <Clock size={16} />
                          <span>{location.hours}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
            <p>Find quick answers to common questions</p>
          </div>
          
          <div className="faq-grid">
            {faqItems.map((item, index) => (
              <div key={index} className="faq-item">
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Notice */}
      <section className="emergency-notice">
        <div className="container">
          <div className="notice-content">
            <div className="notice-icon">
              <Phone size={32} />
            </div>
            <div className="notice-text">
              <h3>Need Immediate Help?</h3>
              <p>
                If you're in immediate danger, call 911 or your local emergency services. 
                For crisis support, call our 24/7 helpline: <strong>1-800-SAFE-HER</strong>
              </p>
            </div>
            <div className="notice-actions">
              <button className="btn btn-white btn-lg">
                Call Emergency
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;