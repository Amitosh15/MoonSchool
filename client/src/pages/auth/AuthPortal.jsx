import { useEffect } from "react";
import { ShieldCheck, LogIn, UserPlus } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context";
import lncLogo from '../../assets/LNC.png'
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import "./auth.css";

export default function AuthPortal({ initialTab }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, login, signup } = useAuth();

  // If already authenticated, redirect immediately to dashboard home
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard/home", { replace: true });
    }
  }, [isAuthenticated, navigate]);

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
            <img
              src={lncLogo}
              alt="Lake Norman Charter crest"
              className="brand-logo-img"
            />
          </div>
          <div className="auth-brand-text">
            <h1>
              Lake Norman Charter
            </h1>
            <p>Together we learn, lead and serve</p>
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
            onSuccess={(user, token, students) => {
              login(user, token, students);
              navigate("/dashboard/home", { replace: true });
            }}
          />
        ) : (
          <SignupForm
            onSuccess={(newUser, newStudents, token) => {
              signup(newUser, newStudents, token);
              navigate("/dashboard/home", { replace: true });
            }}
            onSwitchToLogin={() => navigate("/login")}
          />
        )}
      </div>
    </div>
  );
}
