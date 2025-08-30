import React, { useState, useEffect } from "react";
import "../home.css";
import { Link } from "react-router-dom";
import { useAuth } from "../authContext";
import { resendVerification, verifyEmail } from "../auth";

const BackArrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </svg>
);

const EmailVerificationWarning = ({ onDismiss, onResend }: { onDismiss: () => void; onResend: () => void }) => {
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const { user } = useAuth();

  const handleVerifyEmail = async () => {
    if (!verificationCode.trim() || !user?.email) return;
    
    setIsVerifying(true);
    try {
      const result = await verifyEmail(user.email, verificationCode);
      if (result.ok) {
        alert("Email verified successfully!");
        setShowVerificationModal(false);
        onDismiss(); // Hide the warning
      } else {
        alert(`Verification failed: ${result.error}`);
      }
    } catch (error) {
      alert("An error occurred during verification.");
      console.error("Verification error:", error);
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <>
      <div className="email-verification-warning">
        <div className="warning-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>
        <div className="warning-content">
          <span className="warning-text">Please verify your email address</span>
          <button className="resend-verification-btn" onClick={() => setShowVerificationModal(true)}>Verify Email</button>
        </div>
        <button className="dismiss-warning-btn" onClick={onDismiss} aria-label="Dismiss warning">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      {/* Verification Modal */}
      {showVerificationModal && (
        <div className="verification-modal-overlay">
          <div className="verification-modal">
            <h3>Enter Verification Code</h3>
            <p>We've sent a 6-digit code to <strong>{user?.email}</strong></p>
            
            <input
              type="text"
              placeholder="Enter 6-digit code"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
              className="verification-code-input"
              maxLength={6}
              autoFocus
            />
            
            <div className="verification-modal-buttons">
              <button 
                onClick={handleVerifyEmail}
                disabled={verificationCode.length !== 6 || isVerifying}
                className="verify-btn"
              >
                {isVerifying ? 'Verifying...' : 'Verify Email'}
              </button>
              <button 
                onClick={() => setShowVerificationModal(false)}
                className="cancel-btn"
                disabled={isVerifying}
              >
                Cancel
              </button>
            </div>
            
            <button 
              onClick={onResend}
              className="resend-link"
              disabled={isVerifying}
            >
              Didn't receive the code? Resend
            </button>
          </div>
        </div>
      )}
    </>
  );
};
  

const FingerprintScanner = () => {
  const [scanningState, setScanningState] = useState<
    "idle" | "scanning" | "success" | "error"
  >("idle");
  const [scanProgress, setScanProgress] = useState(0);
  const [scanAttempts, setScanAttempts] = useState(0);

  const handleScannerClick = () => {
    if (scanningState !== "idle") return;

    setScanningState("scanning");
    setScanProgress(0);

    // Simulate scanning process with progress
    const progressInterval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    // Simulate scanning completion
    setTimeout(() => {
      clearInterval(progressInterval);
      setScanProgress(100);

      // Randomly succeed or fail for demo purposes
      const success = Math.random() > 0.3;
      setScanningState(success ? "success" : "error");

      if (!success) {
        setScanAttempts((prev) => prev + 1);
      }

      setTimeout(() => {
        setScanningState("idle");
        setScanProgress(0);
      }, 2000);
    }, 3000);
  };

  const getStatusText = () => {
    switch (scanningState) {
      case "idle":
        return scanAttempts > 0
          ? `Try again (${scanAttempts} attempts)`
          : "Place your finger here";
      case "scanning":
        return `Scanning... ${scanProgress}%`;
      case "success":
        return "Authentication successful!";
      case "error":
        return "Authentication failed. Try again";
      default:
        return "Place your finger here";
    }
  };

  const getStatusIcon = () => {
    switch (scanningState) {
      case "success":
        return "✓";
      case "error":
        return "✗";
      default:
        return "👍"; // Changed from 👆 (index finger) to 👍 (thumb)
    }
  };

  return (
    <div className="scanner-container">
      {/* Status text moved above scanner */}
      <div className="scanner-status-above" aria-live="polite">
        {getStatusText()}
      </div>

      <div
        className={`fingerprint-scanner ${scanningState}`}
        onClick={handleScannerClick}
        role="button"
        tabIndex={0}
        aria-label="Fingerprint scanner"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleScannerClick();
          }
        }}
      >
        {/* Progress Ring */}
        <div className="progress-ring">
          <svg width="220" height="220" viewBox="0 0 220 220">
            <circle
              cx="110"
              cy="110"
              r="100"
              fill="none"
              stroke="rgba(76, 175, 80, 0.2)"
              strokeWidth="4"
              className="progress-background"
            />
            <circle
              cx="110"
              cy="110"
              r="100"
              fill="none"
              stroke="#4CAF50"
              strokeWidth="4"
              strokeDasharray={`${2 * Math.PI * 100}`}
              strokeDashoffset={`${
                2 * Math.PI * 100 * (1 - scanProgress / 100)
              }`}
              className="progress-fill"
              transform="rotate(-90 110 110)"
            />
          </svg>
        </div>

        <svg
          width="200"
          height="200"
          viewBox="0 0 200 200"
          className="fingerprint-svg"
          aria-hidden="true"
        >
          {/* Outer circle */}
          <circle
            cx="100"
            cy="100"
            r="95"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="scanner-border"
          />

          {/* Fingerprint patterns */}
          <g className="fingerprint-patterns">
            {/* Center oval */}
            <ellipse
              cx="100"
              cy="100"
              rx="15"
              ry="25"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            />

            {/* Concentric fingerprint ridges */}
            <ellipse
              cx="100"
              cy="100"
              rx="25"
              ry="35"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <ellipse
              cx="100"
              cy="100"
              rx="35"
              ry="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <ellipse
              cx="100"
              cy="100"
              rx="45"
              ry="55"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <ellipse
              cx="100"
              cy="100"
              rx="55"
              ry="65"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <ellipse
              cx="100"
              cy="100"
              rx="65"
              ry="75"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            />

            {/* Side curves for realistic fingerprint pattern */}
            <path
              d="M 60 80 Q 80 70 100 80 Q 120 70 140 80"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <path
              d="M 65 90 Q 82 82 100 90 Q 118 82 135 90"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <path
              d="M 70 100 Q 85 95 100 100 Q 115 95 130 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <path
              d="M 65 110 Q 82 118 100 110 Q 118 118 135 110"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            />
            <path
              d="M 60 120 Q 80 130 100 120 Q 120 130 140 120"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            />

            {/* Additional detail lines */}
            <path
              d="M 75 60 Q 90 55 100 65 Q 110 55 125 60"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
            <path
              d="M 75 140 Q 90 145 100 135 Q 110 145 125 140"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </g>

          {/* Scanning animation overlay */}
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="rgba(76, 175, 80, 0.4)"
            strokeWidth="4"
            className="scan-pulse"
          />
        </svg>

        {/* Status Icon Overlay */}
        {scanningState !== "idle" && (
          <div className="status-icon-overlay">
            <span className="status-icon">{getStatusIcon()}</span>
          </div>
        )}
      </div>
    </div>
  );
};

const Home = () => {
  const [showStudentIdInput, setShowStudentIdInput] = useState(false);
  const [studentId, setStudentId] = useState("");
  const [lastLoginTime, setLastLoginTime] = useState<string>("");

  useEffect(() => {
    // Simulate last login time
    const now = new Date();
    setLastLoginTime(now.toLocaleString());
  }, []);

  const handleStudentIdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentId.trim()) {
      // Handle student ID submission
      console.log("Student ID entered:", studentId);
      // You can add navigation or authentication logic here
      alert(`Student ID submitted: ${studentId}`);
    }
  };

  const handleToggleStudentId = () => {
    setShowStudentIdInput(true);
  };

  const handleCancelStudentId = () => {
    setShowStudentIdInput(false);
    setStudentId("");
  };

  const { user } = useAuth();
  const [showEmailWarning, setShowEmailWarning] = useState(true);

  const handleDismissWarning = () => {
    setShowEmailWarning(false);
  };

  const handleResendVerification = async () => {
    if (!user?.email) {
      alert("No email address found for this user.");
      return;
    }
    
    try {
      const result = await resendVerification(user.email);
      if (result.ok) {
        alert("Verification email sent! Please check your inbox.");
      } else {
        alert(`Failed to send verification email: ${result.error}`);
      }
    } catch (error) {
      alert("An error occurred while sending the verification email.");
      console.error("Verification error:", error);
    }
  };

  return (
    <div className="home-container">
      {/* Email Verification Warning */}
      {showEmailWarning && user && (
        <EmailVerificationWarning 
          onDismiss={handleDismissWarning}
          onResend={handleResendVerification}
        />
      )}
      
      {/* Back Button */}
      <Link to="/" className="back-button" aria-label="Go back">
        <BackArrow />
      </Link>

      {/* Header Section */}
      <div className="header-section">
        <h1>Secure Biometric Authentication</h1>
        <p className="subtitle">
          Place your thumb on the scanner below for instant verification.
        </p>
        {lastLoginTime && (
          <p className="last-login">Last login: {lastLoginTime}</p>
        )}
      </div>

      {/* Main Content */}
      <div className="main-content">
        {/* Scanner Section */}
        <div className="scanner-section">
          <FingerprintScanner />
        </div>

        {/* Student ID Alternative - Made More Visible */}
        <div className="student-id-section-main">
          {!showStudentIdInput ? (
            <div className="student-id-toggle-container">
              <h2
                className="student-id-toggle"
                onClick={handleToggleStudentId}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleToggleStudentId();
                  }
                }}
              >
                Or enter your student ID manually
              </h2>
              <p className="student-id-hint">
                Click here to use alternative authentication method
              </p>
            </div>
          ) : (
            <div className="student-id-section">
              <form
                onSubmit={handleStudentIdSubmit}
                className="student-id-form"
              >
                <input
                  type="text"
                  placeholder="Enter your student ID"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                  className="student-id-input"
                  autoFocus
                  required
                  aria-label="Student ID input"
                />
                <div className="form-buttons">
                  <button
                    type="submit"
                    className="submit-btn"
                    disabled={!studentId.trim()}
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="cancel-btn"
                    onClick={handleCancelStudentId}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Security Info */}
      <div className="security-info">
        <div className="security-item">
          <span className="security-icon">🔒</span>
          <span>256-bit encryption</span>
        </div>
        <div className="security-item">
          <span className="security-icon">🛡️</span>
          <span>ISO 27001 compliant</span>
        </div>
        <div className="security-item">
          <span className="security-icon">⚡</span>
          <span>Real-time verification</span>
        </div>
      </div>
    </div>
  );
};

export default Home;
