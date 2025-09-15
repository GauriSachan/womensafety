import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Shield, ArrowRight } from 'lucide-react';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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

    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    // Simulate login process
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real app, this would be an API call
      console.log('Login attempt:', formData);
      
      // Simulate successful login
      alert('Login successful! Welcome to SafeHer.');
      
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    alert(`Social login with ${provider} - Feature coming soon!`);
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
            <h1>Welcome Back</h1>
            <p>Sign in to your SafeHer account to access all safety features</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="auth-form">
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
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
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <Lock size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
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

            <div className="form-options">
              <label className="checkbox-label">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Remember me
              </label>
              <Link to="/forgot-password" className="forgot-link">
                Forgot Password?
              </Link>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-lg auth-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                'Signing In...'
              ) : (
                <>
                  Sign In
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          {/* Social Login */}
          <div className="social-login">
            <div className="divider">
              <span>Or continue with</span>
            </div>
            
            <div className="social-buttons">
              <button 
                type="button" 
                className="social-btn google-btn"
                onClick={() => handleSocialLogin('Google')}
              >
                <img src="/api/placeholder/20/20" alt="Google" />
                Google
              </button>
              <button 
                type="button" 
                className="social-btn facebook-btn"
                onClick={() => handleSocialLogin('Facebook')}
              >
                <img src="/api/placeholder/20/20" alt="Facebook" />
                Facebook
              </button>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="auth-footer">
            <p>
              Don't have an account?{' '}
              <Link to="/signup" className="auth-link">
                Sign up for free
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
            <h2>Your Safety, Our Priority</h2>
            <ul className="feature-list">
              <li>
                <Shield size={20} />
                <span>24/7 Emergency Support</span>
              </li>
              <li>
                <Shield size={20} />
                <span>Personal Safety Resources</span>
              </li>
              <li>
                <Shield size={20} />
                <span>Community Support Network</span>
              </li>
              <li>
                <Shield size={20} />
                <span>Expert Safety Guidance</span>
              </li>
            </ul>
            
            <div className="testimonial">
              <blockquote>
                "SafeHer has given me the confidence and tools I need to feel safe every day. 
                The community support is incredible."
              </blockquote>
              <cite>- Sarah M., SafeHer User</cite>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;