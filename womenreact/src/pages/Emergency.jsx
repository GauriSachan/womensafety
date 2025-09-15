import React, { useState } from 'react';
import { Phone, Shield, AlertTriangle, MapPin, Clock, User } from 'lucide-react';
import './Emergency.css';

const Emergency = () => {
  const [location, setLocation] = useState('');
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const emergencyContacts = [
    {
      name: 'Police',
      number: '100',
      description: 'For immediate police assistance',
      icon: Shield,
      color: 'blue'
    },
    {
      name: 'Women Helpline',
      number: '1091',
      description: 'National helpline for women in distress',
      icon: Phone,
      color: 'pink'
    },
    {
      name: 'National Emergency',
      number: '112',
      description: 'Single emergency number for all services',
      icon: AlertTriangle,
      color: 'red'
    },
    {
      name: 'Domestic Violence',
      number: '181',
      description: 'Helpline for domestic violence victims',
      icon: Phone,
      color: 'purple'
    }
  ];

  const safetyTips = [
    {
      title: 'Share Your Location',
      description: 'Always inform trusted contacts about your whereabouts',
      icon: MapPin
    },
    {
      title: 'Stay Alert',
      description: 'Be aware of your surroundings at all times',
      icon: AlertTriangle
    },
    {
      title: 'Trust Your Instincts',
      description: 'If something feels wrong, remove yourself from the situation',
      icon: Shield
    },
    {
      title: 'Have Emergency Contacts',
      description: 'Keep important numbers easily accessible',
      icon: Phone
    }
  ];

  const getCurrentLocation = () => {
    setIsGettingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`);
          setIsGettingLocation(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setLocation('Unable to get location');
          setIsGettingLocation(false);
        }
      );
    } else {
      setLocation('Geolocation not supported');
      setIsGettingLocation(false);
    }
  };

  const callEmergency = (number) => {
    window.location.href = `tel:${number}`;
  };

  const sendSOSMessage = () => {
    const message = `EMERGENCY: I need help! My location: ${location || 'Unable to determine location'}. This is an automated SOS message from SafeHer app.`;
    
    // In a real app, this would send SMS or notification
    // For demo, we'll show alert
    alert(`SOS Alert Sent!\n\nMessage: ${message}`);
    
    // Simulate sending to emergency contacts
    console.log('SOS message sent:', message);
  };

  return (
    <div className="emergency-page">
      {/* Emergency Header */}
      <section className="emergency-header">
        <div className="container">
          <div className="emergency-hero">
            <div className="emergency-icon">
              <AlertTriangle size={64} />
            </div>
            <h1>Emergency Assistance</h1>
            <p>Quick access to emergency services and safety resources</p>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="quick-actions">
        <div className="container">
          <div className="actions-grid">
            <button 
              className="action-card sos-button" 
              onClick={sendSOSMessage}
              disabled={!location}
            >
              <AlertTriangle size={32} />
              <h3>Send SOS</h3>
              <p>Alert emergency contacts</p>
            </button>
            
            <button 
              className="action-card location-button" 
              onClick={getCurrentLocation}
              disabled={isGettingLocation}
            >
              <MapPin size={32} />
              <h3>Get Location</h3>
              <p>{isGettingLocation ? 'Getting...' : 'Share your location'}</p>
            </button>
            
            <button 
              className="action-card call-button" 
              onClick={() => callEmergency('112')}
            >
              <Phone size={32} />
              <h3>Call 112</h3>
              <p>Emergency services</p>
            </button>
          </div>
          
          {location && (
            <div className="location-display">
              <MapPin size={20} />
              <span>Current Location: {location}</span>
            </div>
          )}
        </div>
      </section>

      {/* Emergency Contacts */}
      <section className="emergency-contacts">
        <div className="container">
          <div className="section-header">
            <h2>Emergency Contacts</h2>
            <p>Important numbers for immediate assistance</p>
          </div>
          
          <div className="contacts-grid">
            {emergencyContacts.map((contact, index) => {
              const IconComponent = contact.icon;
              return (
                <div key={index} className={`contact-card ${contact.color}`}>
                  <div className="contact-icon">
                    <IconComponent size={32} />
                  </div>
                  <div className="contact-info">
                    <h3>{contact.name}</h3>
                    <div className="contact-number">{contact.number}</div>
                    <p>{contact.description}</p>
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => callEmergency(contact.number)}
                    >
                      Call Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Safety Tips */}
      <section className="safety-tips">
        <div className="container">
          <div className="section-header">
            <h2>Emergency Safety Tips</h2>
            <p>Essential guidelines for personal safety</p>
          </div>
          
          <div className="tips-grid">
            {safetyTips.map((tip, index) => {
              const IconComponent = tip.icon;
              return (
                <div key={index} className="tip-card">
                  <div className="tip-icon">
                    <IconComponent size={24} />
                  </div>
                  <h3>{tip.title}</h3>
                  <p>{tip.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Emergency Checklist */}
      <section className="emergency-checklist">
        <div className="container">
          <div className="checklist-content">
            <h2>Emergency Preparedness Checklist</h2>
            <div className="checklist-items">
              <div className="checklist-item">
                <input type="checkbox" id="contacts" />
                <label htmlFor="contacts">
                  <User size={20} />
                  Emergency contacts saved in phone
                </label>
              </div>
              <div className="checklist-item">
                <input type="checkbox" id="location" />
                <label htmlFor="location">
                  <MapPin size={20} />
                  Location sharing enabled
                </label>
              </div>
              <div className="checklist-item">
                <input type="checkbox" id="app" />
                <label htmlFor="app">
                  <Phone size={20} />
                  Safety app installed and configured
                </label>
              </div>
              <div className="checklist-item">
                <input type="checkbox" id="plan" />
                <label htmlFor="plan">
                  <Shield size={20} />
                  Personal safety plan created
                </label>
              </div>
              <div className="checklist-item">
                <input type="checkbox" id="routes" />
                <label htmlFor="routes">
                  <Clock size={20} />
                  Safe routes identified and shared
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Emergency;