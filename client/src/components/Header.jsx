import React from "react";
import {
  ShieldCheck,
  Clock,
  Bell,
  Sparkles,
  ChevronDown,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

export default function Header({
  currentScenario,
  onSelectScenario,
  currentTime,
  activeTab,
  setActiveTab,
  unreadNotifications,
  onOpenNotifications,
  parentUser,
}) {
  return (
    <header className="top-header">
      {/* Brand Section */}
      <div className="brand-section">
        <div className="brand-logo-crest">
          <ShieldCheck size={26} strokeWidth={2.4} />
        </div>
        <div className="brand-titles">
          <h1>
            Moon School
            <span className="school-badge">SAFE APP</span>
          </h1>
          <p>Safe Students, Bright Futures</p>
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
          title="Moon School Simulated System Clock"
        >
          <Clock size={16} color="#38bdf8" />
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

        {/* User Profile */}
        <div className="user-profile-pill">
          <div className="user-avatar-circle">
            {parentUser.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div className="user-name-role">
            <span>{parentUser.name}</span>
            <span>{parentUser.relation}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
