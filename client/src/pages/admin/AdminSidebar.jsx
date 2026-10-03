import React from "react";
import {
  LayoutDashboard,
  Users,
  UserCheck,
  Clock,
  Bus,
  AlertTriangle,
  FileText,
  Settings,
  ArrowLeftRight,
  Shield,
  Sunrise,
  Sunset,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import lncLogo from "../../assets/LNC.png";

export default function AdminSidebar({
  activeNav = "dashboard",
  onShowNotice,
}) {
  const navigate = useNavigate();

  const navItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      badge: "Live",
      isLive: true,
      category: "operations",
    },
    {
      id: "morning-drop-off",
      label: "Morning Drop-Off",
      icon: Sunrise,
      category: "operations",
    },
    {
      id: "afternoon-pick-up",
      label: "Afternoon Pick-Up",
      icon: Sunset,
      category: "operations",
    },
    {
      id: "students",
      label: "Students",
      icon: Users,
      category: "operations",
    },
    {
      id: "parents",
      label: "Parents / Guardians",
      icon: UserCheck,
      category: "operations",
    },
    {
      id: "queue",
      label: "Live Queue",
      icon: Clock,
      category: "operations",
    },

    {
      id: "buses",
      label: "Bus Management",
      icon: Bus,
      category: "fleet",
    },
    {
      id: "late",
      label: "Late Arrivals & Fees",
      icon: AlertTriangle,
      category: "fleet",
    },

    {
      id: "reports",
      label: "Reports & Audit",
      icon: FileText,
      category: "system",
    },
    { id: "users", label: "Users & Roles", icon: Shield, category: "system" },
    { id: "settings", label: "Settings", icon: Settings, category: "system" },
  ];

  const handleNavClick = (item) => {
    if (item.id === "dashboard") {
      navigate("/admin");
    } else {
      navigate(`/admin/${item.id}`);
    }
  };

  const isItemActive = (itemId) => {
    if (itemId === "dashboard") {
      return !activeNav || activeNav === "dashboard";
    }
    return activeNav === itemId;
  };

  return (
    <aside className="admin-sidebar">
      {/* Brand Header */}
      <div
        className="admin-sidebar-header"
        onClick={() => navigate("/admin")}
        style={{ cursor: "pointer" }}
      >
        <div className="admin-logo-crest">
          <img src={lncLogo} alt="Lake Norman Charter crest" />
        </div>
        <div className="admin-brand-info">
          <h2>Lake Norman Charter</h2>
          <p>Together we learn, lead and serve</p>
        </div>
      </div>

      {/* Nav List */}
      <div className="admin-sidebar-nav">
        <div className="admin-nav-category">Main Operations</div>
        {navItems
          .filter((i) => i.category === "operations")
          .map((item) => {
            const Icon = item.icon;
            const active = isItemActive(item.id);
            return (
              <button
                key={item.id}
                className={`admin-nav-item ${active ? "active" : ""}`}
                onClick={() => handleNavClick(item)}
              >
                <Icon size={17} />
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`admin-nav-badge ${item.isLive ? "live" : ""}`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

        <div className="admin-nav-category">Fleet & Controls</div>
        {navItems
          .filter((i) => i.category === "fleet")
          .map((item) => {
            const Icon = item.icon;
            const active = isItemActive(item.id);
            return (
              <button
                key={item.id}
                className={`admin-nav-item ${active ? "active" : ""}`}
                onClick={() => handleNavClick(item)}
              >
                <Icon size={17} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="admin-nav-badge">{item.badge}</span>
                )}
              </button>
            );
          })}

        <div className="admin-nav-category">System & Audit</div>
        {navItems
          .filter((i) => i.category === "system")
          .map((item) => {
            const Icon = item.icon;
            const active = isItemActive(item.id);
            return (
              <button
                key={item.id}
                className={`admin-nav-item ${active ? "active" : ""}`}
                onClick={() => handleNavClick(item)}
              >
                <Icon size={17} />
                <span>{item.label}</span>
              </button>
            );
          })}
      </div>
    </aside>
  );
}
