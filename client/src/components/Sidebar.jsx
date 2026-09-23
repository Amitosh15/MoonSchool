import React from "react";
import {
  Home,
  Users,
  ArrowDownToLine,
  ArrowUpFromLine,
  Bus,
  History,
  CreditCard,
  UserCheck,
  HelpCircle,
  QrCode,
  ExternalLink,
  ShieldAlert,
} from "lucide-react";

export default function Sidebar({
  activeTab,
  setActiveTab,
  onOpenCarTag,
  onOpenTeacherScan,
  lateFeeTotal,
  student,
}) {
  const navItems = [
    { id: "home", label: "Home Overview", icon: Home },
    {
      id: "dropoff",
      label: "Morning Drop-Off",
      icon: ArrowDownToLine,
      badge: "8:05–8:30 AM",
    },
    {
      id: "pickup",
      label: "Afternoon Pick-Up",
      icon: ArrowUpFromLine,
      badge: "3:30–4:00 PM",
    },
    { id: "bus", label: "Bus GPS Tracking", icon: Bus, badge: "Live" },
    { id: "history", label: "Activity History", icon: History },
    {
      id: "payments",
      label: "Late Fees & Payments",
      icon: CreditCard,
      alert: lateFeeTotal > 0 ? `$${lateFeeTotal}` : null,
    },
    { id: "children", label: "My Children", icon: Users, count: "2" },
    { id: "help", label: "Help & Safety Policy", icon: HelpCircle },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-heading">Navigation</div>
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            className={`sidebar-item ${isActive ? "active" : ""}`}
            onClick={() => setActiveTab(item.id)}
          >
            <Icon size={18} />
            <span>{item.label}</span>
            {item.alert && (
              <span className="sidebar-item-badge active-alert">
                {item.alert}
              </span>
            )}
            {item.badge && !item.alert && (
              <span className="sidebar-item-badge">{item.badge}</span>
            )}
            {item.count && !item.alert && (
              <span className="sidebar-item-badge">{item.count}</span>
            )}
          </button>
        );
      })}

      {/* Car Tag Concept Page 3 Card */}
      {/* <div className="sidebar-tag-card">
        <div className="sidebar-tag-header">
          <span>Parent Vehicle Sticker</span>
          <QrCode size={16} />
        </div>
        <div className="sidebar-tag-body">
          <div className="tag-qr-preview">
            <svg
              viewBox="0 0 100 100"
              style={{ width: "100%", height: "100%" }}
            >
              <rect width="100" height="100" fill="white" />
              Simplified QR matrix
              <rect x="5" y="5" width="30" height="30" fill="#091e32" />
              <rect x="10" y="10" width="20" height="20" fill="white" />
              <rect x="14" y="14" width="12" height="12" fill="#091e32" />

              <rect x="65" y="5" width="30" height="30" fill="#091e32" />
              <rect x="70" y="10" width="20" height="20" fill="white" />
              <rect x="74" y="14" width="12" height="12" fill="#091e32" />

              <rect x="5" y="65" width="30" height="30" fill="#091e32" />
              <rect x="10" y="70" width="20" height="20" fill="white" />
              <rect x="14" y="74" width="12" height="12" fill="#091e32" />

              <rect x="42" y="12" width="16" height="8" fill="#091e32" />
              <rect x="42" y="28" width="8" height="16" fill="#091e32" />
              <rect x="58" y="24" width="16" height="8" fill="#091e32" />
              <rect x="42" y="52" width="14" height="14" fill="#f4a261" />
              <rect x="64" y="64" width="24" height="24" fill="#091e32" />
              <rect x="72" y="72" width="8" height="8" fill="white" />
            </svg>
          </div>
          <div>
            <div className="tag-code-text">{student.carTag}</div>
            <div style={{ fontSize: "0.72rem", color: "#cbd5e1" }}>
              Windshield Tag
            </div>
          </div>
        </div>
        <button className="btn-tag-view" onClick={onOpenCarTag}>
          <QrCode size={14} />
          <span>Display Car Tag</span>
        </button>
        <button
          style={{
            fontSize: "0.7rem",
            color: "#94a3b8",
            marginTop: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "4px",
          }}
          onClick={onOpenTeacherScan}
          title="Simulate teacher scanning this car tag"
        >
          <UserCheck size={12} />
          <span>Teacher Scan Test</span>
        </button>
      </div> */}
    </aside>
  );
}
