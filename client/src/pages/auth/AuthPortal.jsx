import React from "react";
import { ShieldCheck, LogIn, UserPlus } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import "./auth.css";

export default function AuthPortal({
  onLoginSuccess,
  onSignupSuccess,
  initialTab,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  // If path is /signup or /register, default to signup, otherwise login
  const isSignup =
    location.pathname.includes("/signup") ||
    location.pathname.includes("/register");
  const activeTab = initialTab || (isSignup ? "signup" : "login");

  return (
    <div className="auth-page-wrapper">
      <div
        className={`auth-card-container ${activeTab === "signup" ? "signup-mode" : ""}`}
      >
        {/* School Name & Crest at Top of Card */}
        <div className="auth-card-brand">
          <div className="auth-logo-crest">
            <ShieldCheck size={26} strokeWidth={2.4} />
          </div>
          <div className="auth-brand-text">
            <h1>
              Lake Norman Charter
              <span className="auth-brand-badge-tag">PARENT ACCESS</span>
            </h1>
            <p>Arrival, Dismissal & Transportation System</p>
          </div>
        </div>

        {/* Switcher Navigation */}
        <div className="auth-nav-tabs">
          <button
            type="button"
            className={`auth-tab-btn ${activeTab === "login" ? "active" : ""}`}
            onClick={() => navigate("/login")}
          >
            <LogIn size={17} />
            <span>Parent Sign In</span>
          </button>
          <button
            type="button"
            className={`auth-tab-btn ${activeTab === "signup" ? "active" : ""}`}
            onClick={() => navigate("/signup")}
          >
            <UserPlus size={17} />
            <span>Register Account</span>
          </button>
        </div>

        {/* Render Active View */}
        {activeTab === "login" ? (
          <LoginForm
            onSuccess={(user) => {
              onLoginSuccess(user);
              navigate("/dashboard");
            }}
            onSwitchToSignup={() => navigate("/signup")}
          />
        ) : (
          <SignupForm
            onSuccess={(newUser, newStudents) => {
              onSignupSuccess(newUser, newStudents);
              navigate("/dashboard");
            }}
            onSwitchToLogin={() => navigate("/login")}
          />
        )}
      </div>
    </div>
  );
}
