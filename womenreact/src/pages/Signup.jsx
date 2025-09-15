import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Shield, ArrowRight, User, Phone } from 'lucide-react';
import './Auth.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all required fields');
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      setIsLoading(false);
      return;
    }

    if (!acceptTerms) {
      setError('Please accept the Terms of Service and Privacy Policy');
      setIsLoading(false);
      return;
    }

    // Simulate signup process
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, this would be an API call
      console.log('Signup attempt:', formData);
      
      // Simulate successful signup
      alert('Account created successfully! Welcome to SafeHer.');
      
    } catch (err) {
      setError('Signup failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignup = (provider) => {
    alert(`Social signup with ${provider} - Feature coming soon!`);
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-content">
          {/* Auth Header */}
          <div className="auth-header">
            <div className="auth-logo">
              <Shield size={48} />
            </div>
            <h1>Join SafeHer</h1>
            <p>Create your account and join our community of empowered women</p>
          </div>

          {/* Signup Form */}
          <form onSubmit={handleSubmit} className="auth-form">
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <div className="input-wrapper">
                  <User size={20} />
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="First name"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <div className="input-wrapper">
                  <User size={20} />
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Last name"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <div className="input-wrapper">
                <Mail size={20} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number (Optional)</label>
              <div className="input-wrapper">
                <Phone size={20} />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password">Password *</label>
                <div className="input-wrapper">
                  <Lock size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password *</label>
                <div className="input-wrapper">
                  <Lock size={20} />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm password"
                    required
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="checkbox-label">
                <input 
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                />
                <span className="checkmark"></span>
                I agree to the{' '}
                <Link to="/terms" className="auth-link">Terms of Service</Link>
                {' '}and{' '}
                <Link to="/privacy" className="auth-link">Privacy Policy</Link>
              </label>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-lg auth-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                'Creating Account...'
              ) : (
                <>
                  Create Account
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          {/* Social Signup */}
          <div className="social-login">
            <div className="divider">
              <span>Or sign up with</span>
            </div>
            
            <div className="social-buttons">
              <button 
                type="button" 
                className="social-btn google-btn"
                onClick={() => handleSocialSignup('Google')}
              >
                <img src="/api/placeholder/20/20" alt="Google" />
                Google
              </button>
              <button 
                type="button" 
                className="social-btn facebook-btn"
                onClick={() => handleSocialSignup('Facebook')}
              >
                <img src="/api/placeholder/20/20" alt="Facebook" />
                Facebook
              </button>
            </div>
          </div>

          {/* Login Link */}
          <div className="auth-footer">
            <p>
              Already have an account?{' '}
              <Link to="/login" className="auth-link">
                Sign in
              </Link>
            </p>
          </div>

          {/* Emergency Notice */}
          <div className="emergency-notice">
            <Shield size={16} />
            <span>
              Need immediate help? Call <strong>911</strong> or use our{' '}
              <Link to="/emergency">emergency features</Link>
            </span>
          </div>
        </div>

        {/* Auth Side Panel */}
        <div className="auth-side">
          <div className="side-content">
            <h2>Join Our Community</h2>
            <ul className="feature-list">
              <li>
                <Shield size={20} />
                <span>Access safety resources and tools</span>
              </li>
              <li>
                <Shield size={20} />
                <span>Connect with supportive community</span>
              </li>
              <li>
                <Shield size={20} />
                <span>Get personalized safety tips</span>
              </li>
              <li>
                <Shield size={20} />
                <span>Emergency response features</span>
              </li>
            </ul>
            
            <div className="testimonial">
              <blockquote>
                "Joining SafeHer was the best decision I made for my personal safety. 
                The resources and community support are invaluable."
              </blockquote>
              <cite>- Maria L., SafeHer Community Member</cite>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;