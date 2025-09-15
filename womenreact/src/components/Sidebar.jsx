import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, Home, AlertTriangle, BookOpen, FileText, Shield, GraduatedCap, Phone, LogIn, UserPlus, Download, Mail } from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ isOpen, onClose, onDownload }) => {
  const location = useLocation();

  const navigationItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/emergency', label: 'Emergency', icon: AlertTriangle },
    { path: '/resources', label: 'Resources', icon: BookOpen },
    { path: '/articles', label: 'Articles', icon: FileText },
    { path: '/self-defense', label: 'Self Defense', icon: Shield },
    { path: '/workshop', label: 'Workshops', icon: GraduatedCap },
    { path: '/contact', label: 'Contact', icon: Phone },
  ];

  const quickAccessItems = [
    { path: '/login', label: 'Login', icon: LogIn },
    { path: '/signup', label: 'Sign Up', icon: UserPlus },
    { path: '/downloads', label: 'Downloads', icon: Download },
    { path: '/newsletter', label: 'Newsletter', icon: Mail },
  ];

  const safetyResources = [
    { action: 'downloadSafetyKit', label: 'Download Safety Kit', icon: Download },
    { action: 'downloadEmergencyGuide', label: 'Emergency Guide', icon: AlertTriangle },
    { action: 'downloadSelfDefenseGuide', label: 'Self Defense Guide', icon: Shield },
  ];

  const isActive = (path) => location.pathname === path;

  const handleResourceClick = (action) => {
    if (onDownload) {
      onDownload(action);
    }
  };

  return (
    <>
      {isOpen && <div className="sidebar-backdrop" onClick={onClose} />}
      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h3>SafeHer Menu</h3>
          <button className="close-btn" onClick={onClose} aria-label="Close menu">
            <X size={24} />
          </button>
        </div>
        
        <div className="sidebar-content">
          <div className="sidebar-section">
            <h4>Navigation</h4>
            {navigationItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`sidebar-link ${isActive(item.path) ? 'active' : ''}`}
                  onClick={onClose}
                >
                  <IconComponent size={18} />
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="sidebar-section">
            <h4>Quick Access</h4>
            {quickAccessItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`sidebar-link ${isActive(item.path) ? 'active' : ''}`}
                  onClick={onClose}
                >
                  <IconComponent size={18} />
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="sidebar-section">
            <h4>Safety Resources</h4>
            {safetyResources.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.action}
                  className="sidebar-link resource-link"
                  onClick={() => handleResourceClick(item.action)}
                >
                  <IconComponent size={18} />
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;