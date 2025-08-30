import React, { useState } from "react";
import backgroundImage from "../assets/background image  4 ui.jpg";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../auth";

const UserIcon = () => (
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
      d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
    />
  </svg>
);

const LockIcon = () => (
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
      d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
    />
  </svg>
);

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

const PhoneIcon = () => (
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
      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
    />
  </svg>
);

const EyeIcon = ({ isVisible }: { isVisible: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="password-toggle"
  >
    {isVisible ? (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 1-4.243-4.243m4.242 4.242L9.88 9.88"
      />
    ) : (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
      />
    )}
  </svg>
);

const CheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 12.75l6 6 9-13.5"
    />
  </svg>
);

const SignUp = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    staffId: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // Validation functions
  const validateStep1 = () => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Please enter a valid email";
    if (!formData.phone.trim()) errors.phone = "Phone number is required";
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = () => {
    const errors: {[key: string]: string} = {};
    
    if (!formData.staffId.trim()) errors.staffId = "Staff ID is required";
    if (!formData.password.trim()) errors.password = "Password is required";
    else if (formData.password.length < 6) errors.password = "Password must be at least 6 characters";
    if (!formData.confirmPassword.trim()) errors.confirmPassword = "Please confirm your password";
    else if (formData.password !== formData.confirmPassword) errors.confirmPassword = "Passwords do not match";
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const nextStep = () => {
    if (currentStep === 1) {
      if (!validateStep1()) {
        return;
      }
    }
    if (currentStep === 2) {
      if (!validateStep2()) {
        return;
      }
    }
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!termsAgreed) {
      alert("Please agree to the terms and conditions before creating your account.");
      return;
    }
    
    // Final validation for step 2 fields before submit
    if (!validateStep1() || !validateStep2()) {
      return;
    }
    
    // Clear any previous errors
    setSubmitError("");
    setIsSubmitting(true);
    
    try {
      const res = await registerUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        staffId: formData.staffId,
        password: formData.password,
      });
      
      if (!res.ok) {
        setSubmitError(res.error);
        // Stay on final step; only nudge user back to step 2 if credentials-related
        if (res.error.toLowerCase().includes("staff id") || res.error.toLowerCase().includes("email")) {
          setCurrentStep(2);
        }
        return;
      }
      
      // Success! Show success message briefly then navigate
      setSubmitError(""); // Clear any errors
      alert("Account created successfully! Redirecting to login...");
      navigate("/");
      
    } catch (error) {
      setSubmitError("Network error. Please try again.");
      console.error("Signup error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepIndicator = () => (
    <div className="step-indicator">
      {[1, 2, 3].map((step) => (
        <div
          key={step}
          className={`step-dot ${currentStep >= step ? "active" : ""}`}
        >
          {currentStep > step && <CheckIcon />}
        </div>
      ))}
      <div className="step-line">
        <div 
          className="step-progress" 
          style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
        ></div>
      </div>
    </div>
  );

  const renderStep1 = () => (
    <>
      <div className="input-group">
        <div className={`input-wrapper ${validationErrors.firstName ? 'error' : ''}`}>
          <UserIcon />
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
        {validationErrors.firstName && <p className="error-message">{validationErrors.firstName}</p>}
      </div>

      <div className="input-group">
        <div className={`input-wrapper ${validationErrors.lastName ? 'error' : ''}`}>
          <UserIcon />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
        {validationErrors.lastName && <p className="error-message">{validationErrors.lastName}</p>}
      </div>

      <div className="input-group">
        <div className={`input-wrapper ${validationErrors.email ? 'error' : ''}`}>
          <EnvelopeIcon />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
        {validationErrors.email && <p className="error-message">{validationErrors.email}</p>}
      </div>

      <div className="input-group">
        <div className={`input-wrapper ${validationErrors.phone ? 'error' : ''}`}>
          <PhoneIcon />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
        {validationErrors.phone && <p className="error-message">{validationErrors.phone}</p>}
      </div>

      <button type="button" className="login-button" onClick={nextStep}>
        <span>Next Step</span>
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
    </>
  );

  const renderStep2 = () => (
    <>
      <div className="input-group">
        <div className={`input-wrapper ${validationErrors.staffId ? 'error' : ''}`}>
          <UserIcon />
          <input
            type="text"
            name="staffId"
            placeholder="Staff ID"
            value={formData.staffId}
            onChange={handleInputChange}
            className="form-input"
            required
          />
        </div>
        {validationErrors.staffId && <p className="error-message">{validationErrors.staffId}</p>}
      </div>

      <div className="input-group">
        <div className={`input-wrapper ${validationErrors.password ? 'error' : ''}`}>
          <LockIcon />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            className="form-input"
            required
          />
          <button
            type="button"
            className="password-toggle-btn"
            onClick={() => setShowPassword(!showPassword)}
          >
            <EyeIcon isVisible={showPassword} />
          </button>
        </div>
        {validationErrors.password && <p className="error-message">{validationErrors.password}</p>}
      </div>

      <div className="input-group">
        <div className={`input-wrapper ${validationErrors.confirmPassword ? 'error' : ''}`}>
          <LockIcon />
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="form-input"
            required
          />
          <button
            type="button"
            className="password-toggle-btn"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <EyeIcon isVisible={showConfirmPassword} />
          </button>
        </div>
        {validationErrors.confirmPassword && <p className="error-message">{validationErrors.confirmPassword}</p>}
      </div>

      <div className="step-buttons">
        <button type="button" className="step-button secondary" onClick={prevStep}>
          <svg className="step-arrow reverse" viewBox="0 0 24 24" fill="none">
            <path
              d="M19 12H5m7 7-7-7 7-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Previous</span>
        </button>
        <button type="button" className="login-button" onClick={nextStep}>
          <span>Next Step</span>
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
    </>
  );

  const renderStep3 = () => (
    <>
      <div className="form-options">
        <label className={`remember-me ${termsAgreed ? 'agreed' : ''}`}>
          <input 
            type="checkbox" 
            checked={termsAgreed} 
            onChange={() => setTermsAgreed(!termsAgreed)}
          />
          <span className="checkmark"></span>
          <span className="terms-text">
            I agree to the <strong>terms and conditions</strong>
            {!termsAgreed && <span className="required-hint"> * Required</span>}
          </span>
        </label>
      </div>

      <div className="step-buttons">
        <button type="button" className="step-button secondary" onClick={prevStep}>
          <svg className="step-arrow reverse" viewBox="0 0 24 24" fill="none">
            <path
              d="M19 12H5m7 7-7-7 7-7"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Previous</span>
        </button>
        <button 
          type="submit" 
          className={`login-button ${!termsAgreed || isSubmitting ? 'disabled' : ''}`}
          disabled={!termsAgreed || isSubmitting}
        >
          <span>{isSubmitting ? 'Creating Account...' : 'Create Account'}</span>
          {!isSubmitting && (
            <svg className="login-arrow" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12h14m-7-7 7 7-7 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
          {isSubmitting && <div className="loading-spinner"></div>}
        </button>
      </div>
    </>
  );

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Personal Info";
      case 2:
        return "Account Setup";
      case 3:
        return "Final Step";
      default:
        return "Create Account";
    }
  };

  const getStepSubtitle = () => {
    switch (currentStep) {
      case 1:
        return "Basic details";
      case 2:
        return "Login credentials";
      case 3:
        return "Terms & submit";
      default:
        return "Please fill in your details to register";
    }
  };

  return (
    <div className="login-container">
      {/* Left Side - Image Section */}
      <div className="login-image-section">
        <div className="image-wrapper">
          <img
            src={backgroundImage}
            alt="Sign Up Background"
            className="split-background-image"
          />
          <div className="image-content-wrapper">
            <div className="image-content">
              <h2 className="image-title">Join Our Secure Platform</h2>
              <p className="image-subtitle">
                Create your account and experience the future of secure access with our advanced biometric authentication system.
              </p>
              <div className="feature-list">
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <span>Secure Registration</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <span>Biometric Setup</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <span>Instant Access</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Sign Up Form Section */}
      <div className="login-form-section">
        <div className="form-container">
          <div className="login-header">
            <div className="logo-container">
              <div className="logo-circle">
                <UserIcon />
              </div>
            </div>
            <h1 className="login-title">{getStepTitle()}</h1>
            <p className="login-subtitle">{getStepSubtitle()}</p>
            {renderStepIndicator()}
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {submitError && (
              <p className="error-message" style={{ marginBottom: "12px" }}>{submitError}</p>
            )}
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
          </form>

          <div className="login-footer">
            <p>
              Already have an account?{" "}
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

export default SignUp;
