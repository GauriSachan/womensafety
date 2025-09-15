import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Shield, AlertTriangle, BookOpen, Users, Download, Phone } from 'lucide-react';
import './Home.css';

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: Shield,
      title: 'Personal Safety',
      description: 'Learn essential safety techniques and strategies to protect yourself in various situations.',
      link: '/self-defense'
    },
    {
      icon: AlertTriangle,
      title: 'Emergency Resources',
      description: 'Quick access to emergency contacts, hotlines, and immediate help resources.',
      link: '/emergency'
    },
    {
      icon: BookOpen,
      title: 'Educational Content',
      description: 'Access articles, guides, and resources about women\'s safety and empowerment.',
      link: '/resources'
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Connect with a supportive community and access workshops and training sessions.',
      link: '/workshop'
    },
    {
      icon: Download,
      title: 'Safety Tools',
      description: 'Download safety guides, emergency contact cards, and protection resources.',
      link: '/downloads'
    },
    {
      icon: Phone,
      title: '24/7 Support',
      description: 'Access to round-the-clock support and assistance when you need it most.',
      link: '/contact'
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className={`hero ${isVisible ? 'fade-in' : ''}`}>
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Empowering Women's Safety</h1>
            <p className="hero-subtitle">
              Your comprehensive platform for safety resources, emergency tools, and community support. 
              Because every woman deserves to feel safe and empowered.
            </p>
            <div className="hero-cta">
              <Link to="/safety-dashboard" className="btn btn-primary btn-lg">
                Safety Dashboard
              </Link>
              <Link to="/emergency" className="btn btn-secondary btn-lg">
                Emergency Help
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Your Safety, Our Priority</h2>
            <p>Explore our comprehensive suite of tools and resources designed to keep you safe and informed.</p>
          </div>
          
          <div className="feature-grid">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Link to={feature.link} key={index} className="feature-card">
                  <div className="feature-icon">
                    <IconComponent size={48} />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <h3>10,000+</h3>
              <p>Women Empowered</p>
            </div>
            <div className="stat-card">
              <h3>50+</h3>
              <p>Safety Resources</p>
            </div>
            <div className="stat-card">
              <h3>24/7</h3>
              <p>Support Available</p>
            </div>
            <div className="stat-card">
              <h3>100+</h3>
              <p>Community Partners</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Join Our Community</h2>
            <p>Connect with thousands of women committed to safety and empowerment.</p>
            <div className="cta-buttons">
              <Link to="/signup" className="btn btn-primary">
                Get Started
              </Link>
              <Link to="/resources" className="btn btn-secondary">
                Explore Resources
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;