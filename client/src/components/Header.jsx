import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import lncLogo from "../assets/LNC.png";
import {
  Clock,
  Calendar,
  Bell,
  Sparkles,
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
  LogOut,
  KeyRound,
} from "lucide-react";

export default function Header({
  currentScenario,
  onSelectScenario,
  currentTime,
  currentDate,
  activeTab,
  setActiveTab,
  unreadNotifications,
  onOpenNotifications,
  parentUser,
  onLogout,
  onOpenAuth,
}) {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  return (
    <header className="top-header">
      {/* Brand Section */}
      <div className="brand-section">
        <div className="brand-logo-crest">
          <img
            src={lncLogo}
            alt="Lake Norman Charter crest"
            className="brand-logo-img"
          />
        </div>
        <div className="brand-titles">
          <h1>
            Lake Norman Charter
            {/* <span className="school-badge">SAFE APP</span> */}
          </h1>
          <p>Together we learn, lead and serve</p>
        </div>
      </div>

      {/* Center Nav / Scenario Test Switcher */}
      {/* <div className="header-center-nav">
        <div className="simulation-banner-pill">
          <Sparkles size={14} className="text-amber-400" />
          <span>Demo Scenario:</span>
          <select
            className="sim-select"
            value={currentScenario}
            onChange={(e) => onSelectScenario(e.target.value)}
          >
            <option value="morning_regular">
              Morning Drop-Off (8:02 AM - Normal)
            </option>
            <option value="morning_late">
              Morning Late Arrival (8:35 AM - Lobby Check-In)
            </option>
            <option value="afternoon_queue">
              Afternoon Pick-Up Queue (3:15 PM - Queueing)
            </option>
            <option value="afternoon_open">
              Afternoon Gate Open (3:35 PM - Pole 7 Staged)
            </option>
            <option value="afternoon_late">
              Afternoon Late Pick-Up (4:08 PM - $1/min Fee)
            </option>
          </select>
        </div>
      </div> */}

      {/* User & Time Controls */}
      <div className="header-user-section">
        <div
          className="time-display"
          title="Moon School Live Date and System Clock"
        >
          {currentDate && (
            <>
              <Calendar size={15} color="#38bdf8" />
              <span>{currentDate}</span>
              <span
                style={{ color: "rgba(255, 255, 255, 0.35)", margin: "0 2px" }}
              >
                •
              </span>
            </>
          )}
          <Clock size={15} color="#38bdf8" />
          <span>{currentTime}</span>
        </div>

        {/* Notifications */}
        <button
          className="icon-btn-badge"
          onClick={onOpenNotifications}
          title="System Notifications"
        >
          <Bell size={18} />
          {unreadNotifications > 0 && <span className="badge-dot" />}
        </button>

        {/* User Profile Pill with Dropdown / Logout */}
        <div style={{ position: "relative" }}>
          <div
            className="user-profile-pill"
            style={{ cursor: "pointer", transition: "background 0.2s ease" }}
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            title="Click to view parent account menu"
          >
            <div className="user-avatar-circle">
              {parentUser?.name
                ? parentUser.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")
                : "P"}
            </div>
            <div className="user-name-role">
              <span>{parentUser?.name || "Parent Guardian"}</span>
              <span>{parentUser?.relation || "Guardian"}</span>
            </div>
            <ChevronDown
              size={14}
              style={{ color: "#94a3b8", marginLeft: "4px" }}
            />
          </div>

          {/* Profile Dropdown Menu */}
          {showProfileMenu && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 8px)",
                right: 0,
                width: "240px",
                background: "#091e32",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                borderRadius: "14px",
                padding: "12px",
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
                zIndex: 100,
                backdropFilter: "blur(16px)",
              }}
            >
              <div
                style={{
                  padding: "4px 8px 10px",
                  borderBottom: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div
                  style={{
                    fontSize: "0.86rem",
                    fontWeight: 700,
                    color: "#ffffff",
                  }}
                >
                  {parentUser?.name}
                </div>
                <div
                  style={{
                    fontSize: "0.74rem",
                    color: "#94a3b8",
                    wordBreak: "break-all",
                  }}
                >
                  {parentUser?.email || "parent@example.com"}
                </div>
                <div
                  style={{
                    fontSize: "0.72rem",
                    color: "#00a896",
                    marginTop: "2px",
                    fontWeight: 600,
                  }}
                >
                  Vehicle: {parentUser?.vehicle || "Registered"}
                </div>
              </div>

              <div
                style={{
                  marginTop: "8px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                }}
              >
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    if (onOpenAuth) onOpenAuth();
                    navigate("/login");
                  }}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 10px",
                    fontSize: "0.82rem",
                    color: "#cbd5e1",
                    borderRadius: "8px",
                    textAlign: "left",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.background = "rgba(255,255,255,0.08)")
                  }
                  onMouseLeave={(e) => (e.target.style.background = "none")}
                >
                  <KeyRound size={16} color="#38bdf8" />
                  <span>View Auth / Sign In Page</span>
                </button>

                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    if (onLogout) onLogout();
                    navigate("/login");
                  }}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "8px 10px",
                    fontSize: "0.82rem",
                    color: "#f43f5e",
                    borderRadius: "8px",
                    textAlign: "left",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.background = "rgba(244,63,94,0.12)")
                  }
                  onMouseLeave={(e) => (e.target.style.background = "none")}
                >
                  <LogOut size={16} />
                  <span>Sign Out of Portal</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
