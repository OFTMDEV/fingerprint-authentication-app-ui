import React, { useState } from "react";
import backgroundImage from "../assets/background image  4 ui.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../authContext";

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

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    staffId: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = await signIn(formData.staffId, formData.password);
    if (res.ok) {
      navigate("/Home");
    } else {
      setError(res.error);
    }
  };

  return (
    <div className="login-container">
      {/* Left Side - Image Section */}
      <div className="login-image-section">
        <div className="image-wrapper">
          <img
            src={backgroundImage}
            alt="Login Background"
            className="split-background-image"
          />
          <div className="image-content-wrapper">
            <div className="image-content">
              <h2 className="image-title">Secure Biometric Authentication</h2>
              <p className="image-subtitle">
                Experience the future of secure access with our advanced
                biometric authentication system.
              </p>
              <div className="feature-list">
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <span>Advanced Security</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <span>Fast Authentication</span>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">✓</div>
                  <span>User-Friendly Interface</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form Section */}
      <div className="login-form-section">
        <div className="form-container">
          <div className="login-header">
            <div className="logo-container">
              <div className="logo-circle">
                <UserIcon />
              </div>
            </div>
            <h1 className="login-title">Welcome Back</h1>
            <p className="login-subtitle">Please sign in to your account</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {error && <p className="error-message" style={{ marginBottom: "12px" }}>{error}</p>}
            <div className="input-group">
              <div className="input-wrapper">
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
            </div>

            <div className="input-group">
              <div className="input-wrapper">
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
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input type="checkbox" />
                <span className="checkmark"></span>
                Remember me
              </label>
              <Link to={"/ForgotPassword"}>
                <a href="#" className="forgot-password">
                  Forgot Password?
                </a>
              </Link>
            </div>

            <button type="submit" className="login-button">
              <span>Sign In</span>
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
          </form>

          <div className="login-footer">
            <p>
              Don't have an account?{" "}
              <Link to="/SignUp" className="signup-link">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
