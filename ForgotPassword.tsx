import React, { useState } from "react";
import backgroundImage from "../assets/background image  4 ui.jpg";
import { Link } from "react-router-dom";

const EnvelopeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="input-icon"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 0-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
    />
  </svg>
);

const CheckCircleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="success-icon"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };

  const handleBackToLogin = () => {
    setIsSubmitted(false);
    setEmail("");
  };

  if (isSubmitted) {
    return (
      <div className="login-container">
        {/* Left Side - Image Section */}
        <div className="login-image-section">
          <div className="image-wrapper">
            <img
              src={backgroundImage}
              alt="Password Reset Background"
              className="split-background-image"
            />
            <div className="image-content-wrapper">
              <div className="image-content">
                <h2 className="image-title">Password Reset Sent</h2>
                <p className="image-subtitle">
                  We've sent you a secure link to reset your password. Check your email and follow the instructions.
                </p>
                <div className="feature-list">
                  <div className="feature-item">
                    <div className="feature-icon">✓</div>
                    <span>Secure Reset Link</span>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">✓</div>
                    <span>Email Verification</span>
                  </div>
                  <div className="feature-item">
                    <div className="feature-icon">✓</div>
                    <span>Quick Recovery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Success Section */}
        <div className="login-form-section">
          <div className="form-container">
            <div className="login-header">
              <div className="logo-container">
                <div className="logo-circle success">
                  <CheckCircleIcon />
                </div>
              </div>
              <h1 className="login-title">Check Your Email</h1>
              <p className="login-subtitle">
                We've sent a password reset link to <strong>{email}</strong>
              </p>
            </div>

            <div className="success-message">
              <p>
                If you don't see the email, check your spam folder. The link will expire in 1 hour for security.
              </p>
            </div>

            <div className="action-buttons">
              <button 
                type="button" 
                className="login-button secondary" 
                onClick={handleBackToLogin}
              >
                <span>Back to Login</span>
                <svg className="login-arrow reverse" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M19 12H5m7 7-7-7 7-7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              
              <button 
                type="button" 
                className="login-button" 
                onClick={handleSubmit}
              >
                <span>Resend Email</span>
                <svg className="login-arrow" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12h14m-7-7 7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <div className="login-footer">
              <p>
                Remember your password?{" "}
                <Link to="/" className="signup-link">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      {/* Left Side - Image Section */}
      <div className="login-image-section">
        <div className="image-wrapper">
          <img
            src={backgroundImage}
            alt="Forgot Password Background"
            className="split-background-image"
          />
          <div className="image-content-wrapper">
            <div className="image-content">
              <h2 className="image-title">Reset Your Password</h2>
              <p className="image-subtitle">
                Don't worry! Enter your email address and we'll send you a secure link to reset your password.
              </p>
              <div className="feature-list">
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <span>Secure Process</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <span>Email Verification</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <span>Quick Recovery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="login-form-section">
        <div className="form-container">
          <div className="login-header">
            <div className="logo-container">
              <div className="logo-circle">
                <EnvelopeIcon />
              </div>
            </div>
            <h1 className="login-title">Forgot Password?</h1>
            <p className="login-subtitle">
              Enter your email address and we'll send you a reset link
            </p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <div className="input-wrapper">
                <EnvelopeIcon />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input"
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              className="login-button" 
              disabled={isLoading || !email}
            >
              {isLoading ? (
                <>
                  <span>Sending...</span>
                  <div className="loading-spinner"></div>
                </>
              ) : (
                <>
                  <span>Send Reset Link</span>
                  <svg className="login-arrow" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12h14m-7-7 7 7-7 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </>
              )}
            </button>
          </form>

          <div className="login-footer">
            <p>
              Remember your password?{" "}
              <Link to="/" className="signup-link">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
