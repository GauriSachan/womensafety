import React, { useState } from 'react';
import { Shield, BookOpen, Download, Phone, Users, AlertTriangle } from 'lucide-react';
import './Resources.css';

const Resources = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const resourceCategories = [
    { id: 'all', label: 'All Resources', icon: BookOpen },
    { id: 'safety', label: 'Personal Safety', icon: Shield },
    { id: 'emergency', label: 'Emergency', icon: AlertTriangle },
    { id: 'support', label: 'Support Groups', icon: Users },
    { id: 'downloads', label: 'Downloads', icon: Download },
    { id: 'contacts', label: 'Contacts', icon: Phone },
  ];

  const resources = [
    {
      id: 1,
      title: 'Personal Safety Guide',
      description: 'Comprehensive guide covering personal safety strategies and techniques.',
      category: 'safety',
      type: 'Guide',
      link: '/downloads'
    },
    {
      id: 2,
      title: 'Emergency Hotlines',
      description: 'List of essential emergency contacts and crisis support numbers.',
      category: 'emergency',
      type: 'Contact List',
      link: '/emergency'
    },
    {
      id: 3,
      title: 'Self-Defense Basics',
      description: 'Learn fundamental self-defense techniques and situational awareness.',
      category: 'safety',
      type: 'Training',
      link: '/self-defense'
    },
    {
      id: 4,
      title: 'Digital Safety Resources',
      description: 'Protect yourself online with cybersecurity tips and tools.',
      category: 'safety',
      type: 'Guide',
      link: '/articles'
    },
    {
      id: 5,
      title: 'Support Groups Near You',
      description: 'Find local and online support communities for women.',
      category: 'support',
      type: 'Community',
      link: '/workshop'
    },
    {
      id: 6,
      title: 'Safety Planning Toolkit',
      description: 'Tools and templates for creating your personal safety plan.',
      category: 'downloads',
      type: 'Toolkit',
      link: '/downloads'
    }
  ];

  const filteredResources = selectedCategory === 'all' 
    ? resources 
    : resources.filter(resource => resource.category === selectedCategory);

  return (
    <div className="resources-page">
      <div className="container">
        {/* Header */}
        <div className="page-header">
          <h1>Safety Resources</h1>
          <p>Explore our comprehensive collection of women's safety resources, guides, and tools designed to keep you informed and protected.</p>
        </div>

        {/* Category Filter */}
        <div className="category-filter">
          {resourceCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <button
                key={category.id}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <IconComponent size={20} />
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Resources Grid */}
        <div className="resources-grid">
          {filteredResources.map((resource) => (
            <div key={resource.id} className="resource-card">
              <div className="resource-header">
                <span className="resource-type">{resource.type}</span>
              </div>
              <h3>{resource.title}</h3>
              <p>{resource.description}</p>
              <a href={resource.link} className="btn btn-primary">
                Access Resource
              </a>
            </div>
          ))}
        </div>

        {/* Quick Action Section */}
        <div className="quick-actions">
          <h2>Quick Actions</h2>
          <div className="actions-grid">
            <a href="/emergency" className="action-card emergency">
              <AlertTriangle size={32} />
              <h3>Emergency Help</h3>
              <p>Get immediate assistance</p>
            </a>
            <a href="/downloads" className="action-card downloads">
              <Download size={32} />
              <h3>Download Resources</h3>
              <p>Get safety guides and tools</p>
            </a>
            <a href="/contact" className="action-card contact">
              <Phone size={32} />
              <h3>Get Support</h3>
              <p>Contact our team</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resources;