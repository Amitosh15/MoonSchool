import React, { useState } from "react";
import api from "../../services/api";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  AlertCircle,
  Sparkles,
} from "lucide-react";

export default function SignupForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errorMsg) setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!formData.name.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMsg("Please enter your mobile number.");
      return;
    }
    if (!formData.password || formData.password.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await api.post("/auth/register", {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        password: formData.password,
      });

      if (response.data && response.data.success) {
        if (onSuccess) {
          onSuccess(
            response.data.user,
            response.data.students || [],
            response.data.token,
          );
        }
      }
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Registration failed. Please try again.";
      setErrorMsg(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-form-container">
      {errorMsg && (
        <div className="auth-alert-box error">
          <AlertCircle size={18} />
          <span>{errorMsg}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Name */}
        <div className="auth-form-group">
          <label className="auth-label">
            <span>Name</span>
            <span className="required">*</span>
          </label>
          <div className="auth-input-wrapper">
            <User className="auth-input-icon" size={18} />
            <input
              type="text"
              className="auth-input-field"
              placeholder="e.g. John Agyeman"
              value={formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              autoComplete="name"
            />
          </div>
        </div>

        {/* Email */}
        <div className="auth-form-group">
          <label className="auth-label">
            <span>Email</span>
            <span className="required">*</span>
          </label>
          <div className="auth-input-wrapper">
            <Mail className="auth-input-icon" size={18} />
            <input
              type="email"
              className="auth-input-field"
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              autoComplete="email"
            />
          </div>
        </div>

        {/* Mobile Number */}
        <div className="auth-form-group">
          <label className="auth-label">
            <span>Mobile No.</span>
            <span className="required">*</span>
          </label>
          <div className="auth-input-wrapper">
            <Phone className="auth-input-icon" size={18} />
            <input
              type="tel"
              className="auth-input-field"
              placeholder="e.g. 704-555-0192"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              autoComplete="tel"
            />
          </div>
        </div>

        {/* Password & Confirm Password */}
        <div className="auth-grid-2">
          {/* Password */}
          <div className="auth-form-group">
            <label className="auth-label">
              <span>Password</span>
              <span className="required">*</span>
            </label>
            <div className="auth-input-wrapper">
              <Lock className="auth-input-icon" size={18} />
              <input
                type={showPassword ? "text" : "password"}
                className="auth-input-field"
                placeholder="Min 6 characters"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                autoComplete="new-password"
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

          {/* Confirm Password */}
          <div className="auth-form-group">
            <label className="auth-label">
              <span>Confirm Password</span>
              <span className="required">*</span>
            </label>
            <div className="auth-input-wrapper">
              <Lock className="auth-input-icon" size={18} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="auth-input-field"
                placeholder="Re-enter password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleChange("confirmPassword", e.target.value)
                }
                autoComplete="new-password"
              />
              <button
                type="button"
                className="auth-toggle-password"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                title={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="auth-submit-btn"
          disabled={isSubmitting}
          style={{ marginTop: "10px" }}
        >
          {isSubmitting ? (
            <>
              <Sparkles size={18} className="animate-spin" />
              <span>Creating Account...</span>
            </>
          ) : (
            <>
              <ShieldCheck size={18} />
              <span>Register Account</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
