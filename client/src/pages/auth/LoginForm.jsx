import React, { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  KeyRound,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import { PARENT_USER } from "../../data/mocData";

export default function LoginForm({ onSuccess, onSwitchToSignup }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSuccess, setForgotSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email.trim()) {
      setErrorMsg("Please enter your registered Parent Email or Parent ID.");
      return;
    }
    if (!password) {
      setErrorMsg("Please enter your portal password.");
      return;
    }

    setIsLoading(true);

    // Simulate authentication check
    setTimeout(() => {
      setIsLoading(false);
      // If it matches demo or any valid pattern
      const loggedUser = {
        ...PARENT_USER,
        email: email.includes("@") ? email : PARENT_USER.email,
        name: email.toLowerCase().includes("john")
          ? "John Agyeman"
          : email.split("@")[0] || "Parent Guardian",
      };
      onSuccess(loggedUser);
    }, 750);
  };

  const handleQuickDemoFill = () => {
    setEmail(PARENT_USER.email);
    setPassword("123456");
    setErrorMsg("");
  };

  const handleSendReset = (e) => {
    e.preventDefault();
    if (!forgotEmail) return;
    setForgotSuccess(true);
    setTimeout(() => {
      setForgotSuccess(false);
      setIsForgotModalOpen(false);
      setForgotEmail("");
    }, 2200);
  };

  return (
    <div className="login-form-container">
      <div className="auth-form-header">
        <h2>Parent Portal Sign In</h2>
        <p>
          Access your children's real-time arrival status, carline queue, and
          emergency dismissal passes.
        </p>
      </div>

      {errorMsg && (
        <div className="auth-alert-box error">
          <AlertCircle size={18} />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Email or Parent ID */}
        <div className="auth-form-group">
          <label className="auth-label">
            <span>Parent Email or ID</span>
            <span className="required">*</span>
          </label>
          <div className="auth-input-wrapper">
            <Mail className="auth-input-icon" size={18} />
            <input
              type="text"
              className="auth-input-field"
              placeholder="e.g. parent@example.com or PAR-9042"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
          </div>
        </div>

        {/* Password */}
        <div className="auth-form-group">
          <label className="auth-label">
            <span>Portal Password</span>
            <span className="required">*</span>
          </label>
          <div className="auth-input-wrapper">
            <Lock className="auth-input-icon" size={18} />
            <input
              type={showPassword ? "text" : "password"}
              className="auth-input-field"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <button
              type="button"
              className="auth-toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              title={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Remember me & Forgot Password */}
        <div className="auth-actions-row">
          <label className="auth-checkbox-label">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <span>Remember this device</span>
          </label>
          <button
            type="button"
            className="auth-forgot-link"
            onClick={() => setIsForgotModalOpen(true)}
          >
            Forgot password?
          </button>
        </div>

        {/* Submit Button */}
        <button type="submit" className="auth-submit-btn" disabled={isLoading}>
          {isLoading ? (
            <>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              />
              <span>Verifying Credentials...</span>
            </>
          ) : (
            <>
              <span>Sign In to Parent Portal</span>
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </form>

      {/* Forgot Password Modal */}
      {isForgotModalOpen && (
        <div
          className="auth-modal-backdrop"
          onClick={() => setIsForgotModalOpen(false)}
        >
          <div
            className="auth-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "14px",
              }}
            >
              <div
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "10px",
                  background: "rgba(56, 189, 248, 0.15)",
                  color: "#38bdf8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <KeyRound size={20} />
              </div>
              <h3
                style={{
                  color: "#fff",
                  fontSize: "1.25rem",
                  fontFamily: "var(--font-display, Outfit)",
                }}
              >
                Reset Parent Password
              </h3>
            </div>

            <p
              style={{
                color: "#94a3b8",
                fontSize: "0.85rem",
                marginBottom: "20px",
                lineHeight: 1.5,
              }}
            >
              Enter your registered parent email address. We'll send a 6-digit
              verification code to reset your dismissal credentials.
            </p>

            {forgotSuccess ? (
              <div className="auth-alert-box success">
                <CheckCircle2 size={18} />
                <span>Reset instructions sent! Check your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleSendReset}>
                <div className="auth-form-group">
                  <label className="auth-label">
                    <span>Parent Email</span>
                    <span className="required">*</span>
                  </label>
                  <div className="auth-input-wrapper">
                    <Mail className="auth-input-icon" size={18} />
                    <input
                      type="email"
                      className="auth-input-field"
                      placeholder="e.g. parent@example.com"
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div
                  style={{ display: "flex", gap: "10px", marginTop: "20px" }}
                >
                  <button
                    type="button"
                    className="wizard-back-btn"
                    style={{ flex: 1 }}
                    onClick={() => setIsForgotModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="auth-submit-btn"
                    style={{ flex: 1.5 }}
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
